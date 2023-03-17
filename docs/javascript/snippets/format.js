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
