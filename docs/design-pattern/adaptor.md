## 适配器模式

### 1、基本概念

**适配器模式**，将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

<div align="center">
  <img :src="$withBase('/design-pattern/adaptor-pattern.png')" alt="适配器模式" />
</div>

适配器模式的`UML`图如上述，其实挺简单的。

`Target`类定义了一套标准的`API`，但是因为现在`Adaptee`无法兼容`Target`的`API`，因此，编写了一个`Adaptor`类来保证`API`和`Target`的规格相同（所以`Adaptor`内部持有`Adaptee`），其内部实现就根据`Target`的规格调用与之能匹配的`Adaptee`的`API`。

### 2、代码范式

```ts
abstract class Target {
  abstract render(): void;
}

class Adaptee {
  mount() {
    console.log("渲染页面");
  }
}

class Adaptor extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  render() {
    this.adaptee();
  }
}

function bootstrap() {
  const adaptor = new Adaptor(new Adaptee());
  adaptor.render();
}
```

有了`Adaptor`，比如你的项目最开始用的是`高德地图API`，现在换成`百度地图API`，只需要修改`Adaptor`类即可。

### 3、在前端开发中的实践

适配器模式也是前端开发中常用的设计模式，而且是一个能够帮助你提高`KPI`的设计模式。

举两个实际开发中可能遇到的例子：

第一个例子，相信大家一定都听说过`uni-app`，`taro`这类跨平台的框架（还有比如`typeorm`能支持不同数据库的`dialect`），这些跨平台框架除了能够支持将一份的代码编译到对应的平台（因为写法不同），还能支持在它顶层暴露一些可以支持操作各个平台都支持的`API`。

本文就以滴滴的`mpx`框架（一个增强`Vue`的跨平台框架）来阐述。

比如有一个`API`，叫`createApp`，对于`H5`来说，可能这个`API`是从`Vue`里面导出的，对于小程序来说，可能这个`API`是存在于`wx`这个全局变量上的。

但是对于写业务代码的同学来说，他可不想在调用`createApp`这个`API`的时候还关心特定的环境，如果每个操作，代码都需要这样写的话，那么用跨平台框架的意义又是什么呢？所以框架的设计者对用户暴露的`API`必须是统一的。此刻，在框架设计时就可以引入一个适配器来处理根据当前环境应用不同的宿主能力了。

```js
import { createApp as createAppInH5 } from "vue";
// 微信小程序 适配器，适配在微信小程序中的处理
function wxAdaptor() {
  return wx.createApp();
}

// vue 适配器，适配在浏览器中的处理
function vueAdaptor() {
  return createAppInH5();
}

// 适配器工厂，根据mpx提供的宿主环境选择对应平台的API处理
function getAdaptor() {
  let selectedAdaptor = null;
  switch (mode) {
    case "wx":
      selectedAdaptor = wxAdaptor;
      break;
    default:
      selectedAdaptor = vueAdaptor;
      break;
  }
  return selectedAdaptor;
}

// 对外暴露一个包裹好的API，业务开发人员可以毫无心智负担的调用
export function createApp(...args) {
  const adaptor = getAdaptor();
  return adaptor.apply(this, args);
}
```

第二个例子，就拿现在我所在的业务团队来举例吧，因为公司的业务调整，原来北京的研发团队全部被解散，在成都新建了研发团队。

由于不同的团队，有自己的编码风格，所以后来后端的接口就有一些调整，比如原来北京的同事取名叫`user_id`，现在的同事取名叫`userId`，还有些项目叫`userid`，拉齐他们的接口有一定的历史包袱，所以不能`100%`的做到拉齐。因此就只能通过业务开发去做这个兜底。

此时，如果去改业务代码是不太聪明的，而且改动量不可估量，容易产生潜在的 bug，这显然是不太符合开闭原则的。

但是我们有个比较好的办法，因为原来的数据接口（`axios`请求后端的接口）全部抽离在了一个数据访问层的，此刻就可以给它套一个适配器就可以精准解决这个问题。

没有修改之前的代码如下：

```js
// 获取榜单数据列表
function getRankList() {
  return fetch("https://xxx.com/v2/api/getRankList").then((res) => res.json());
}
```

添加适配器之后的代码如下：

```js
function getRankList() {
  return fetch("https://xxx.com/v2/api/getRankList")
    .then((res) => res.json())
    .then((res) => {
      return {
        ...res,
        data: {
          list: res.data.list.map((row) => {
            const userId = row.userid || row.userId || row.user_id;
            // 兜底全部可能的key，这样业务代码不需要进行修改
            return {
              ...row,
              userId,
              user_id: userId,
              userid: userId,
            };
          }),
        },
      };
    });
}
```

还有一个场景也与这个场景类似，其实我们在写的业务组件内部兜底需要做很多事儿的，而且代码也会比较多，如果我们直接用验证器校验数据，然后在组件内部就不在需要做兜底的话，那代码写起来肯定要舒服很多，此刻就可以利用迭代器的思路，在给组件传递数据之前对其进行标准化。

下述代码是一个简单的例子：

```js
// 数据访问层
function standardUserInfo(user) {
  return {
    ...user,
    address: user.address || {
      province: "北京市",
      city: "北京市",
      area: "海淀区",
    },
  };
}

function getUserList() {
  return fetch("/getUsers").then((res) => {
    return {
      ...res,
      data: (res.data || []).map(standardUserInfo),
    };
  });
}
```

```js
// 业务组件
import React from "react";
import getUserList from "repository";

class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      userList: [],
    };
  }

  componentDidMount() {
    getUserList().then((res) => {
      this.setState({
        userList: res.data,
      });
    });
  }

  render() {
    return (
      <div class="wrapper">
        {this.state.userList.map((u, idx) => {
          return <User info={u} key={idx} />;
        })}
      </div>
    );
  }
}
```

最后一个例子，叫做`参数归一化`，以下是使用适配器模式编写的一个工具函数`groupBy`：

```ts
/**
 * 对数据进行分组
 * @param arr 源数据
 * @param groupByPredicate 分组条件
 * @returns
 */
export function groupBy<T>(
  arr: T[],
  groupByPredicate: ((item: T) => string) | string
) {
  const fn =
    typeof groupByPredicate === "string"
      ? (item: T) => item[groupByPredicate]
      : groupByPredicate;
  const record: Record<string, T[]> = {};
  arr.forEach((item) => {
    const groupByProp = fn(item);
    let group = record[groupByProp];
    if (!group) {
      record[groupByProp] = [item];
    } else {
      group.push(item);
    }
  });
  return record;
}
```

以下是这个函数的测试用例，它既可以对普通类型进行分组，也可以对复杂类型进行分组：

```ts
import { groupBy } from "./group-by";

describe("group by test", () => {
  it("group age", () => {
    const list = [
      {
        name: "wangwu",
        age: 12,
      },
      {
        name: "zhangsan",
        age: 12,
      },
      {
        name: "lisi",
        age: 18,
      },
      {
        name: "zhaosi",
        age: 17,
      },
    ];
    const res = groupBy(list, "age");
    expect(res).toEqual({
      12: [
        {
          name: "wangwu",
          age: 12,
        },
        {
          name: "zhangsan",
          age: 12,
        },
      ],
      18: [
        {
          name: "lisi",
          age: 18,
        },
      ],
      17: [
        {
          name: "zhaosi",
          age: 17,
        },
      ],
    });
  });

  it("group by age+gender", () => {
    type Person = { name: string; age: number; gender: string };
    const list: Person[] = [
      {
        name: "wangwu",
        age: 12,
        gender: "male",
      },
      {
        name: "zhangsan",
        age: 12,
        gender: "female",
      },
      {
        name: "lisi",
        age: 18,
        gender: "female",
      },
      {
        name: "zhaosi",
        age: 17,
        gender: "male",
      },
      {
        name: "Alice",
        age: 18,
        gender: "female",
      },
    ];
    const res = groupBy(list, (item: Person) => {
      return item.age + "+" + item.gender;
    });
    expect(Object.keys(res).length).toBe(4);
  });

  it("group by basic type", () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8];
    const res = groupBy(nums, (item) => {
      return item % 2 !== 0 ? "odd" : "even";
    });
    expect(res).toEqual({
      odd: [1, 3, 5, 7],
      even: [2, 4, 6, 8],
    });
  });
});
```

阅读完本文的读者，快快把适配器模式用起来，提高你的`KPI`吧~
