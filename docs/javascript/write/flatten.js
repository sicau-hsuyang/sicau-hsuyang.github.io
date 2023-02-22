/*
 Array.prototype.toString 方法返回一个字符串，表示指定的数组及其元素。
 它覆盖了Object的toString方法。
 对于数组对象，toString方法在内部调用join方法拼接数组中的元素并返回一个字符串，
 其中包含用逗号分隔的每个数组元素。如果join方法不可用，或者它不是一个函数，
 将使用 Object.prototype.toString代替，返回"[object Array]"
 */

/**
 * 使用toString拍平数组
 * @param {Array<any>} arr 待拍平的数组
 */
function flatten0(arr) {
  // 有些安全限制不允许用eval
  return eval("[" + arr.toString() + "]");
}

/**
 * 优缺点：
 * 优点: 简单，并且能够保证元素的相对顺序
 * 缺点: 无法指定拍平的层级，无法保留原本的数据类型，只能处理单一数据类型，并且不能是对象
 * 推荐指数：1颗星
 */

/**
 * 使用正则拍平数组
 * @param {Array<any>} arr 待拍平数组
 * @returns
 */
function flatten1(arr) {
  const strArr = JSON.stringify(arr);
  // 注意，正则表达式不要写错，我们需要全局替换空格或者\[或者\]，所以要将它们三个写成一个字符集
  const tmpStr = strArr.replace(/[\s\[\]]*/g, "");
  // 使用eval可以保留数组原本的类型
  return eval("[" + tmpStr + "]");
}

/**
 * 优缺点：
 * 优点: 简单，可以保留原本的数据类型（但是只能针对能被序列化的数组类型，undefined，Symbol，BigInt，Function这些类型无法序列化）
 * 缺点: 无法指定拍平的层级。
 * 推荐指数：2颗星
 */

/**
 * 优缺点：
 * 优点：支持任何数据类型，支持任何层级，
 * 缺点：在极端情况下，可能会出现最大调用栈的错误
 */
/**
 * 使用深度优先遍历的方式拍平数组，不使用reduce
 * @param {Array<any>} arr 待拍平的数组
 * @param {number} maxDeep 最大拍平的层级
 * @returns
 */
function flatten2(arr, maxDeep) {
  const flattenPass = [];
  arr.forEach((v) => {
    if (Array.isArray(v) && maxDeep > 0) {
      flattenPass.push(...flatten2(v, maxDeep - 1));
    } else {
      flattenPass.push(v);
    }
  });
  return flattenPass;
}
/* 推荐指数：3颗星 */
/**
 * 使用深度优先遍历的方式拍平数组，使用reduce
 * @param {number[]} arr 需要被拍平的深度
 * @param {number} maxDeep 最大拍平深度
 * @returns
 */
function flatten3(arr, maxDeep) {
  return arr.reduce((total, cur) => {
    // 为什么concat的是[cur]呢，因为，如果cur是数组，concat会给抹平，而给它包上这一次就可以防止它被抹平，才能跟最大拍平深度对应的上
    return total.concat(
      Array.isArray(cur) && maxDeep > 0 ? flatten3(cur, maxDeep - 1) : [cur]
    );
  }, []);
}
/* 推荐指数：5颗星 */

/**
 * 使用广度优先拍平数组
 * @param {number[]} arr 需要被拍平的数组
 * @param {number} maxDeep 最大拍平深度
 * @returns
 */
function flatten5(arr, maxDepth) {
  const results = [];
  const queue = [];
  // 第一层进队
  arr.forEach((v) => {
    queue.push({
      val: v,
      depth: 0,
    });
  });
  // 队列的退出条件是空队结束
  while (queue.length) {
    const node = queue.shift();
    const { val, depth } = node;
    // 取出当前元素， 当前是数组，并且没有超过最大拍平深度，则继续将其进队
    if (Array.isArray(val) && depth < maxDepth) {
      val.forEach((sub) => {
        queue.push({
          val: sub,
          depth: depth + 1,
        });
      });
    } else {
      results.push(val);
    }
  }
  return results;
}

/**
 * 优缺点：
 * 优点：支持任何类型，支持拍平层级
 * 缺点：元素无法保留最初的相对书序
 * 推荐指数：4颗星
 */

flatten5([[1], [[2]], [[[3]]], [[[[4]]]]], 3);
