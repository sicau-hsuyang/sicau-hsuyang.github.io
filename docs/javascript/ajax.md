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

首先，在很久很久以前，`IE6`还在的时候，它还不支持`XMLHttpRequest`对象，只能用`ActiveXObjcet`插件。

接着，`XMLHttpRequest`对象有很多属性，比如常用的`readyState`，`responseType`, 也有很多事件是可以监听的，只不过这些事件或属性我们几乎很少用到，比如`onabort`在取消请求的时候会触发，`ononprogress`，在上传文件的时候，如果是大文件，会需要有进度条，因为需要用到它，如果你有兴趣还可以了解一下它的其他属性和事件。最重要的是它的`onreadystatechange`事件（**注意：是全小写**）

readyState 有这些值，每个值都表示有特定的含义
