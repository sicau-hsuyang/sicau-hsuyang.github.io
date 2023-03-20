function jsonp(url, data) {
  return new Promise((resolve, reject) => {
    const randomMethodName = "jsonp" + (Math.random() * 10 ** 10).toFixed(0);
    const script = document.createElement("script");
    let queryString = "?";
    for (let prop in data) {
      queryString += `&${prop}=${JSON.stringify(data[prop])}&`;
    }
    url += queryString.replace(/^&*|&*$/g, "");
    url += "&jsonpCallback=" + randomMethodName;
    script.src = url;
    script.type = "text/javascript";
    script.onload = function success() {
      document.body.removeChild(script);
    };
    script.onerror = reject;
    window[randomMethodName] = function (...args) {
      resolve(args);
    };
    document.body.appendChild(script);
  });
}
