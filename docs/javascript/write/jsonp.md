## JSONP

一种古老的跨域方式，兼容性比较好，但是只支持`GET`形式的请求。

`jsonp`的实现思路跟`XMLHttpRequest`没有任何关系，其实现思路利用的是普通资源加载的思路（这也就是为什么`jsonp`只支持`GET`请求方式的原因）

首先，我们要根据用户传递的数据，将其拼接在`URL`上，还要在`URL`上指定一个`key`叫做`jsonpCallback`的查询字符串，值是一个任意的值，但是你得将这个值记录下来（`jsonpCallback`这个名字是一个约定，不能写成别的名字)，服务器会根据我们传递的参数以及`jsonpCallback`的值，给我们返回一段文本，这段文本的内容如下(假设我们传递的`jsonpCallback`的值为`response`，假设此次服务端需要返回`10`个数值给我们)：

```text
response(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
```

而，我们将这段文本以`JavaScript`去解析，就好比是在`window`上调用了一个叫做`response`的函数（为什么说之前要将设置的`jsonpCallback`的值给记录下来，原因如此）。

所以，通用的`JSONP`函数实现如下：（基于`Promise`实现）

```js
(function (window, document) {
  "use strict";
  let jsonp = function (url, data) {
    return new Promise((resolve, reject) => {
      // 1.将传入的data数据转化为url字符串形式
      let dataString = url.indexOf("?") == -1 ? "?" : "&";
      for (let key in data) {
        dataString += key + "=" + data[key] + "&";
      }
      // 2 处理url中的回调函数
      // cbFuncName回调函数的名字 ：my_json_cb_名字的前缀 + 随机数（把小数点去掉）
      let cbFuncName =
        "my_json_cb_" + Math.random().toString().replace(".", "");
      dataString += "jsonpCallback=" + cbFuncName;
      // 3.创建一个script标签并插入到页面中
      let scriptEle = document.createElement("script");
      scriptEle.src = encodeURI(url + dataString);
      // 4.挂载回调函数
      window[cbFuncName] = function (data) {
        resolve(data);
        // 处理完回调函数的数据之后，删除jsonp的script标签
        document.body.removeChild(scriptEle);
      };
      scriptEle.onerror = reject;
      document.body.appendChild(scriptEle);
    });
  };
  window.$jsonp = jsonp;
})(window, document);
```
