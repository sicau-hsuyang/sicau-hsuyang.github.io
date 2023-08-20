## 并发状态下的 Promise 控制

这是我最近在实际项目开发中遇到的问题，它是一个活动中台管理系统，业务逻辑很复杂，有一个这样的场景，有一个行组件，当用户在编辑数据的时候，需要到后端拉取用户可编辑的字段信息，可能会有很多这样的行，在每个行组件渲染的时候它都需要拉这个可编辑字段信息，这个字段信息的接口可以做到全局仅拉取一次，拉取到之后将其缓存起来，后续再调用直接吞吐缓存数据给调用者即可。

咋一看，有了缓存的控制，好像多行编辑的时候就没有问题了？但是真的是这样的吗，不是的，有个比较极端的情况，假设我们把这个拉取全局字段配置信息的方法叫做 A（后文提到的 A 都代指它），每个行组件在渲染的时候都尝试拉取 A，因为时间比较接近，就存在一个问题，比如 A 第一次调用的时候，服务器的吞吐效率比较慢，后续调用 A 的行组件发现还没有缓存数据，于是又再一次的请求的了服务器的数据，于是就浪费了很多流量。

于是我就在思考一个问题，有没有办法做到如果 A 方法正在请求的过程中，让后续的调用等待，等待 A 这次的请求完成，一并返回？

答案是可以的，这要求你对 Promise 有足够清醒的认知。

Promise 的构造函数中给你提供的两个回调，**Promise 的状态改变以及 Promise 的值都取决于你在什么时刻调用它们以及调用它们的时候传递的值。**请牢记这句话，如果你真的理解到了这句话的话，在实际的开发场景中可以解决很多棘手的异步问题。

以下是根据我的需求，所做出的设计：

```js
const event = new Vue();
// 获取数据的中的标记
let hasSendFieldControlRequest = false;

async function getConfig() {
  if (hasSendFieldControlRequest) {
    return;
  }
  hasSendFieldControlRequest = true;
  let data = null;
  try {
    const resp = await post("/common/prize/types");
    if (resp.errorcode === 0) {
      const map = Object.create(null);
      resp.data.list.forEach((item) => {
        map[item.type] = item.editableFields.map((x) => x.toLowerCase());
      });
      data = map;
      // 通知别的Promise
      event.$emit("success", data);
      setRewardFieldsEditable(data);
    } else {
      Vue.prototype.$notify("获取字段配置信息失败");
    }
  } catch (exp) {
    event.$emit("error", exp);
  }
  hasSendFieldControlRequest = false;
  // 通知当前的Promise
  return data;
}

/**
 * 请求服务端的数据，谁第一次请求，谁才会发送真正的请求，否则走缓存或者走内存
 * @returns
 */
export async function requestFieldsEditableConfig() {
  const cache = getRewardFieldsEditable();
  return new Promise((resolve, reject) => {
    // 有缓存走缓存
    if (cache) {
      resolve(cache);
    }
    // 如果别人已经在执行中了，等待
    if (hasSendFieldControlRequest) {
      event.$once("success", resolve);
      event.$once("error", reject);
    } else {
      resolve(getConfig());
    }
  });
}
```

上述代码中，使用`new Vue()`仅仅是为了获得一个事件管道，如果你有现成的事件管道，可以做相应的修改即可。

当我们在调用`requestFieldsEditableConfig`方法的时候，new 出来的 Promise，每次都会有全新的 resolve 和 reject 两个触发器，所以，在第一次调用的时候（假设没有缓存），我们直接调用`getConfig`的方法，并且设置了一个并发锁，如果后续再有人调用这个方法，全部注册到了事件管道上，然后再看`getConfig`的成功处理处理，触发事件管道上订阅的事件，这就是我们前文所提到的：**Promise 的状态改变以及 Promise 的值都取决于你在什么时刻调用它们以及调用它们的时候传递的值。** 别的 Promise 就都能拿到这个 Promise 的结果。

上述只是一个实现方式，还是回到那个点：*Promise 的状态改变以及 Promise 的值都取决于你在什么时刻调用它们以及调用它们的时候传递的值。* 在这个指导方针下，我们自然而然能想到另外一个更为简单的实现方式：**队列**

使用队列改造这个业务逻辑的代码我就不给出了，通过仔细观察，可以发现，这个过程也是可以封装成一个通用逻辑的，就比如`lodash`提供的`debounce`函数那样，你传递一个原函数，返回一个改变了行为的新函数给你。

先大概的思考一下`API`的格式:

```ts
export declare function singlePromise<T extends unknown[], R>(
  fn: (...args: T) => R,
  ctx: unknown
): (...args: T) => Promise<R>;
```

同样使用一个标记来控制 Promise 的状态是否改变，如果没有改变的过程中再次调用该方法，所有再来的 resolve 和 reject 两个触发器均用队列记录下来，在这个 Promise 状态改变的时候再清空队列。

以下是详细的实现代码：

```ts
let hasExecuteFn = false;

type Resolve = (value: unknown) => void;

type Reject = (reason?: any) => void;

type Executor = "resolve" | "reject";

const queue: Array<{
  resolve: Resolve;
  reject: Reject;
}> = [];

function flushQueue(exec: Executor, val: unknown) {
  while (queue.length) {
    const node = queue.shift();
    const executor = node![exec];
    executor(val);
  }
}

export function singlePromise<T extends unknown[], R>(
  fn: (...args: T) => R,
  ctx: unknown
): (...args: T) => Promise<R> {
  return function decorate(...args: T) {
    return new Promise((resolve, reject) => {
      if (hasExecuteFn) {
        queue.push({ resolve: resolve as Resolve, reject });
      } else {
        // @ts-ignore
        const p = fn.apply(ctx || this, args);
        hasExecuteFn = true;
        Promise.resolve(p)
          .then((res) => {
            hasExecuteFn = false;
            resolve(res);
            flushQueue("resolve", res);
          })
          .catch((err) => {
            hasExecuteFn = false;
            reject(err);
            flushQueue("reject", err);
          });
      }
    });
  };
}
```

上述代码被我封装到了一个单独的 npm 包中，叫做`easy-single-promise`

```bash
npm i easy-single-promise -S
```

我们使用 npm 包封装之后再重构文章开篇给出的初版实现：

```ts
import { singlePromise } from "easy-single-promise";

const getConfig = singlePromise(async function getConfig() {
  let data = null;
  const resp = await post("/common/prize/types");
  if (resp.errorcode === 0) {
    const map = Object.create(null);
    resp.data.list.forEach((item) => {
      map[item.type] = item.editableFields.map((x) => x.toLowerCase());
    });
    data = map;
    setRewardFieldsEditable(data);
  } else {
    Vue.prototype.$notify("获取字段配置信息失败");
  }
  // 通知当前的Promise
  return data;
});

/**
 * 请求服务端的数据，谁第一次请求，谁才会发送真正的请求，否则走缓存或者走内存
 * @returns
 */
export async function requestFieldsEditableConfig() {
  const cache = getRewardFieldsEditable();
  return new Promise((resolve) => {
    // 有缓存走缓存
    if (cache) {
      resolve(cache);
    }
    resolve(getConfig());
  });
}
```

可以看到，代码里面完全已经独立了对 Promise 的控制，用户只需要关心业务即可，若不需要这个控制，直接移除掉`singlePromise`的包装即可，不会对业务代码产生冲击。
