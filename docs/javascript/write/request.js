// function request(url, maxCount = 5) {
//   return fetch(url).catch((err) => {
//     return maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1);
//   });
// }

request("https://www.qq.com/1.html", 5)
  .then((resp) => {
    console.log(resp);
  })
  .catch((err) => {
    console.log(err);
  });

async function request(url, maxCount = 5) {
  // 包裹的函数，定义成函数的原因，是可能在这里面可以支持额外的操作
  const func = (url) => fetch(url);
  const queue = [func];
  maxCount--;
  while (queue.length) {
    const fn = queue.shift();
    try {
      const resp = await fn(url);
      return resp;
    } catch (exp) {
      if (maxCount <= 0) {
        throw new Error(exp);
      } else {
        maxCount--;
        queue.push(func);
      }
    }
  }
}
