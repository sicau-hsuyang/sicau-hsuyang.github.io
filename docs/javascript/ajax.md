## Ajax

`Ajax`在某种程度上来说，改变了现代`Web`技术的发展走向。

### 1、Ajax 的前世今生

`Ajax` 即 `Asynchronous Javascript And XML`在 2005 年被`Jesse James Garrett`提出的新术语，用来描述一种使用现有技术集合的‘新’方法，包括: HTML 或 XHTML, CSS, JavaScript, DOM, XML, XSLT, 以及最重要的 XMLHttpRequest。 使用`Ajax`技术网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面，这使得程序能够更快地回应用户的操作。

在没有`Ajax`技术的时候，前端想要向后端交互数据必须整页的提交，给用户的感觉就是整个页面刷一下，有了这项技术以后便可以局部更新页面，随着后来前端技术的发展（`Angular`、`React`、`Vue`等框架的出现），服务端不再负责页面的渲染，逐渐发展成为了现在的前后端分离的开发模式，即前端负责渲染页面，通过 `Ajax`技术和后端进行数据的交互，因为不再需要需要整页的向服务器提交数据了，所以我们的页面不再发生跳转，所以看起来就像一个客户端应用一样，即单页面应用程序(`SPA`)。

在实际的开发中，我们已经不再需要自己手写`Ajax`的实现，几乎都是用成熟的库，比如大名鼎鼎的`axios`，后面各大浏览器厂商甚至直接直接了一个类似`axios`这样的请求客户端，`fetch`。

另外，虽然说`A`代表的含义是异步，但是并不是说`Ajax`只能异步处理，也可以同步处理，但是几乎不用，因为如果是同步的`Ajax`，在服务端没有返回的这个过程中，浏览器是无法响应用户的操作的，造成界面的假死，这是非常影响用户体验的；早期和服务端的通信采用`XML`语言，但是`XML`是比较笨重的，因此现在普遍的方式都是采用轻量的`JSON（JavaScript Object Notation）`格式进行通信。

### 2、原生 Ajax 的实现

我们模拟实现一个能满足`80%`日常工作的`Ajax`函数，实现如下：

```js
function MyAjax(params) {
  params = params || {};
  params.data = params.data || {};
  // ajax请求
  function json(params) {
    // 请求方式，默认是GET
    params.type = (params.type || "GET").toUpperCase();
    // 避免有特殊字符，必须格式化传输数据
    params.data = formatParams(params.data);
    var xhr = null;
    // 实例化XMLHttpRequest对象
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      // IE6及其以下版本
      xhr = new ActiveXObjcet("Microsoft.XMLHTTP");
    }
    // 监听事件，只要 readyState 的值变化，就会调用 readystatechange 事件
    xhr.onreadystatechange = function () {
      // readyState属性表示请求/响应过程的当前活动阶段，4为完成，已经接收到全部响应数据
      if (xhr.readyState == 4) {
        var status = xhr.status;
        // status：响应的HTTP状态码，以2开头的都是成功
        if (status >= 200 && status < 300) {
          var response = "";
          // 判断接受数据的内容类型
          var type = xhr.getResponseHeader("Content-type");
          if (type.indexOf("xml") !== -1 && xhr.responseXML) {
            response = xhr.responseXML; //Document对象响应
          } else if (type === "application/json") {
            response = JSON.parse(xhr.responseText); //JSON响应
          } else {
            response = xhr.responseText; //字符串响应
          }
          // 成功回调函数
          params.success && params.success(response);
        } else {
          params.error && params.error(status);
        }
      }
    };
    // 连接和传输数据
    if (params.type == "GET") {
      // 三个参数：请求方式、请求地址(get方式时，传输数据是加在地址后的)、是否异步请求(同步请求的情况极少)；
      xhr.open(params.type, params.url + "?" + params.data, true);
      xhr.send(null);
    } else {
      xhr.open(params.type, params.url, true);
      //必须，设置提交时的内容类型
      xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      // 传输数据
      xhr.send(params.data);
    }
  }

  //格式化参数
  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      // encodeURIComponent() ：用于对 URI 中的某一部分进行编码
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    // 添加一个随机数参数，防止缓存
    arr.push("v=" + random());
    return arr.join("&");
  }

  // 获取随机数
  function random() {
    return Math.floor(Math.random() * 10000 + 500);
  }
}
```

上述代码中，有很多个关键点，我们逐一进行解释。

首先，在很久很久以前，`IE6`还在的时候，它还不支持`XMLHttpRequest(即XHR)`对象，只能用`ActiveXObjcet`插件。

接着，`XMLHttpRequest`对象有很多属性，比如常用的`readyState`，`responseType`, 也有很多事件是可以监听的，只不过这些事件或属性我们几乎很少用到，比如`onabort`在取消请求的时候会触发，`ononprogress`，在上传文件的时候，如果是大文件，会需要有进度条，因为需要用到它，如果你有兴趣还可以了解一下它的其他属性和事件。最重要的是它的`onreadystatechange`事件（**注意：是全小写**）

readyState 有这些值，每个值都表示有特定的含义

| 值  | 状态             | 描述                                              |
| --- | ---------------- | ------------------------------------------------- |
| 0   | UNSET            | 代理被创建，但尚未调用 open() 方法。              |
| 1   | OPENED           | open() 方法已经被调用。                           |
| 2   | HEADERS_RECEIVED | send() 方法已经被调用，并且头部和状态已经可获得。 |
| 3   | LOADING          | 下载中；responseText 属性已经包含部分数据。       |
| 4   | DONE             | 下载操作已完成。                                  |

所以这就是为什么在`onstatechange`监听处理函数里面需要判断`readyState`的状态为`4`

`HTTP`的状态码`200`附近的状态码都代表成功相关，`300`附近的状态都代表重定向相关，因此，如果服务器返回这类状态码就表明已经请求成功了，否则代表请求失败。

最后，可以看到，我们通常在地址上会追加一个变动的参数，这是因为浏览器的缓存机制，当浏览器发现两个请求方式一样，请求地址一样，此时浏览器就会认为它是一致的请求，从而得不到我们预期的结果（`幂等性`（最主要的特点就是相同情况下，不管执行多少次`API`，返回的作用效果都是一致的））

### 3、选择与服务器的约定通信方式

在`Ajax`通信过程中，最容易和服务端发生不愉快的场景就是传输格式的约定了。

对于`GET`， `HEAD`， `DELETE`这类不随请求报文发送数据的请求还好，反正只能通过查询字符串的形式向服务端传递数据。

但是对于`POST`、`PUT`这类复杂请求，数据会随请求报文一并发送，如果产生跨域的话还会发送`OPTIONS`预检请求。

这类请求数据传输格式有三种，分别对应的编码格式为`application/x-www-form-urlencoded`（**即设置请求头`Content-Type:application/x-www-form-urlencoded`**，后续两种方式也是，不赘述），这种格式传输的时候，要求服务端以`key-value`的形式接收数据（跟查询字符串其实差不多），另外一种就是使用`application/json`的形式发送给服务端，这种形式就是告诉服务端，我给你传递的是一个`JSON`，你可以直接拿着这个数据进行反序列化就能得到你想要的业务实体类的实例。最后一种就是能够发送二进制的方式，主要是在上传文件这类业务场景才会遇到，使用的编码格式为`multipart/form-data`。使用这种编码格式传递数据，前端不能使用普通的数据对象，必须使用一个专门的接口，叫做`FormData`，`FormData`提供了以`key-value`设置数据的能力，`value`可以是二进制数据流，**另外对于`FormData`这个`API`需要注意的是，如果指定的键已经存在，`set`会新值覆盖原来的值，而`append`不会，因此，我们在多文件上传的时候，就可以使用其`append`方法**。

### 4、跨域 Ajax

跨域`Ajax`是因为浏览器的安全机制拦截了`XHR`而导致的，解决跨域`Ajax`即要从不同的方面来破解浏览器的限制。

#### 4.1、同源策略

如果两个`URL`的`protocol（协议）`、`port（端口）`(如果有指定的话)和`host（主机）`都相同的话，则这两个`URL`是同源。

下表给出了与`URL` http://store.company.com/dir/page.html 的源进行对比的示例：

| URL                                      | 结果   | 原因         |
| ---------------------------------------- | ------ | ------------ |
| http://store.company.com/dir2/other.html | 同源   | 只有路径不同 |
| https://store.company.com/secure.html    | 不同源 | 协议不同     |
| http://store.company.com:81/dir/etc.html | 不同源 | 端口不同     |
| http://news.company.com/dir/other.html   | 不同源 | 主机不同     |

#### 4.2、跨域 Ajax 的实现方式

跨域`Ajax`的实现，主流的大概有一下几种方式: `jsonp`，`CORS`，`代理`。

**1、jsonp**

`jsonp`从原来上来说跟我们的`XHR`是没有任何关系的，它的原理就是利用像`script`，`img`这类可以不受同源策略限制标签，设置其`src`指向我们想要请求的地址，然后得到服务器返回的内容，然后把它注入到客户端，从而实现的通信方式。这种方式从它的实现方式出发，我们就很容易的知道它只能支持`GET`这种请求方式。

模拟实现大致如下：

```js
(function (window, document) {
  "use strict";
  var jsonp = function (url, data, callback) {
    // 1.将传入的data数据转化为url字符串形式
    var dataString = url.indexof("?") == -1 ? "?" : "&";
    for (var key in data) {
      dataString += key + "=" + data[key] + "&";
    }
    // 2 处理url中的回调函数
    // cbFuncName回调函数的名字 ：my_json_cb_名字的前缀 + 随机数（把小数点去掉）
    var cbFuncName = "my_json_cb_" + Math.random().toString().replace(".", "");
    dataString += "callback=" + cbFuncName;
    // 3.创建一个script标签并插入到页面中
    var scriptEle = document.createElement("script");
    scriptEle.src = url + dataString;
    // 4.挂载回调函数
    window[cbFuncName] = function (data) {
      callback(data);
      // 处理完回调函数的数据之后，删除jsonp的script标签
      document.body.removeChild(scriptEle);
    };
    document.body.appendChild(scriptEle);
  };
  window.$jsonp = jsonp;
})(window, document);
```

如果你看不懂上面的代码，我们先来脑补一下，浏览器加载`script`标签，`script`文件里面返回的就是一串文本，然后这串文本被解析成`JS`脚本。现在这个地址被指向到了一个可动态生成文本的地址难道你就不会了吗，那当然是万万不能啦。

简单理解，比如一个接口地址`https://www.baidu.com/getProfile`，明确要求当你以`GET`形式访问这个地址的时候，你需要在查询字符串上拼接`name`，`age`，`callback`，然后它向你返回一段文本内容(假设我们传递的`callback`的值为`func`)，如下：

```text
func({ name: 'yangxu', age: 28 });
```

那，如果把这个内容写到`<script>`内部则不就成了一个有效的`JS`代码了吗？那哪儿来的`func`可以执行呢，我们事先在访问这个地址之前在`window`对象上挂载好这个方法不就行了吗。

到现在你应该完全明白`JSONP`的原理了吧。
