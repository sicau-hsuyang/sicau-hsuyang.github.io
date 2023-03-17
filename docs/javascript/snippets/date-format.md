## 日期格式化

日期格式化函数在日常的开发中非常实用，但是如果没有研究过其实现过程的话，还是觉得挺神秘的。

如果对于一个初学者来说，可能不太容易想到。但是对于一个有经验的开发者来说的话，就异常简单了。

因为，这类问题，其实本质上是一个`编译`的过程，如果这么说的话，您是否感觉有什么东西似曾相识呢？

对，我们写的`JSX`是怎么转化成`React.createElement`的？`Vue`是如何解析`template`模板语法的？

既然都想到这儿了，问题也就简单了，我们只需要把我们感兴趣的内容识别到，并且转化成相应的结果，是不是就完成啦？

所以，思路非常简单，接下来就考虑如何去编译用户传递的模板字符串。

有两种办法，第一种属于比较简单的做法，可以直接使用`正则表达式`进行替换，因为字符串替换，第二个参数可以接收一个函数，从而实现灵活的控制替换内容。

```js
function paramPredicate(date) {
  if (!(date instanceof Date) && typeof date != "number") {
    throw new TypeError("Invalid Date Value");
  }
  if (typeof date === "number" && Number.isNaN(date)) {
    throw new TypeError("Invalid Date Value");
  }
}

/**
 * 时间格式化函数
 * @param {Date | Number } date
 * @param {String} formatPattern
 */
function format(date, formatPattern = "YYYY-MM-DD") {
  paramPredicate(date);
  if (typeof date === "number") {
    date = new Date(date);
  }
  /**
   * 格式化年份
   * @param {Date} time 日期
   * @param {boolean} simple 是否只取后两位
   */
  function formatFullYear(time, simple) {
    const year = time.getFullYear().toString();
    return simple ? year.substring(2, 4) : year;
  }
  /**
   * 格式化月份
   * @param {Date} time 日期
   * @param {boolean} pad 是否填充
   */
  function formatMonth(time, pad) {
    const month = time.getMonth() + 1;
    return pad ? String(month).padStart(2, 0) : month.toString();
  }

  /**
   * 通用格式化
   * @param {Date} time
   * @param {keyof Date} method
   * @param {boolean} pad
   */
  function generalFormat(time, method, pad) {
    const val = time[method]();
    return pad ? String(val).padStart(2, 0) : val.toString();
  }

  /**
   * 格式化毫秒
   * @param {Date} time
   * @param {Number} length
   */
  function formatMilliSeconds(time, length) {
    let ms = time.getMilliseconds();
    if (length === 3) {
      return String(ms).padStart(3, 0);
    } else if (length === 2) {
      return String(Number.parseInt(ms / 10)).padStart(2, 0);
    } else {
      return Number.parseInt(ms / 100);
    }
  }

  const formatFlags = {
    yy: function (val) {
      return formatFullYear(val, true);
    },
    yyyy: function (val) {
      return formatFullYear(val, false);
    },
    YY: function (val) {
      return formatFullYear(val, true);
    },
    YYYY: function (val) {
      return formatFullYear(val, false);
    },
    M: function (val) {
      return formatMonth(val, false);
    },
    MM: function (val) {
      return formatMonth(val, true);
    },
    d: function (val) {
      return generalFormat(val, "getDate", false);
    },
    dd: function (val) {
      return generalFormat(val, "getDate", true);
    },
    D: function (val) {
      return generalFormat(val, "getDate", false);
    },
    DD: function (val) {
      return generalFormat(val, "getDate", true);
    },
    h: function (val) {
      return generalFormat(val, "getHours", false);
    },
    hh: function (val) {
      return generalFormat(val, "getHours", true);
    },
    m: function (val) {
      return generalFormat(val, "getMinutes", false);
    },
    mm: function (val) {
      return generalFormat(val, "getMinutes", true);
    },
    s: function (val) {
      return generalFormat(val, "getSeconds", false);
    },
    ss: function (val) {
      return generalFormat(val, "getSeconds", true);
    },
    S: function (val) {
      return formatMilliSeconds(val, 1);
    },
    SS: function (val) {
      return formatMilliSeconds(val, 2);
    },
    SSS: function (val) {
      return formatMilliSeconds(val, 3);
    },
    W: function (val) {
      // TODO: 星期几，如Mon， Tus
    },
    WW: function (val) {
      // TODO: 星期几，如星期一，星期二
    },
    WWW: function (val) {
      // TODO: 星期几，如Monday， Mayday
    },
  };

  return formatPattern.replace(/[a-zA-Z]+/g, function (matched, index, source) {
    const formatter = formatFlags[matched];
    return typeof formatter === "function" ? formatter(date) : matched;
  });
}
```

第二种办法就是使用栈，利用词法分析来做替换，但是这种办法不如正则替换来的快，也不如其代码看起来直观。