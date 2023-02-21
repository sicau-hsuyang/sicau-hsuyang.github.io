function flatten1(arr) {
  const strArr = JSON.stringify(arr);
  // 注意，正则表达式不要写错，我们需要全局替换空格或者\[或者\]，所以要将它们三个写成一个字符集
  const tmpStr = strArr.replace(/[\s\[\]]*/g, "");
  // 使用eval可以保留数组原本的类型
  return eval("[" + tmpStr + "]");
}

// flatten1();

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

/**
 * 拍平数组的方法
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

/**
 * 拍平数组的方法
 * @param {number[]} arr 需要被拍平的深度
 * @param {number} maxDeep 最大拍平深度
 * @returns
 */
function flatten4(arr, maxDeep) {
  const result = [];
  const refs = arrToLinkedList(arr);
  const stack = [];
  let node = refs;
  while (stack.length || node) {
    while (node) {
      stack.push(node);
      node = node.child;
    }
    if (stack.length) {
      result.push(node.val);
      node = stack.pop();
      node = node.next;
    }
  }
  return result;
}

/**
 *
 * @param {number[]} arr
 */
function arrToLinkedList(arr, mapDepth) {
  let startNode = null;
  for (let i = 0; i < arr.length; i++) {
    const curNode = {
      val: arr[i],
      next: null,
    };
    let nextNode =
      i === arr.length - 1
        ? null
        : {
            val: arr[i + 1],
            next: null,
          };
    if (i === 0) {
      startNode = nextNode;
    }
    curNode.next = nextNode;
    if (Array.isArray(curNode.val)) {
      curNode.child = arrToLinkedList(curNode.val);
    }
    if (nextNode && Array.isArray(nextNode.val)) {
      nextNode.child = arrToLinkedList(nextNode.val);
    }
  }
  return startNode;
}

function tree(root) {
  const results = [];
  let node = root;
  let stack = [];
  while (stack.length || node) {
    while (node) {
      results.push(node.val);
      stack.push(node);
      node = node.left;
    }
    if (stack.length) {
      node = stack.pop();
      node = node.right;
    }
  }
  return results;
}

/**
 * 拍平数组的方法
 * @param {number[]} arr 需要被拍平的深度
 * @param {number} maxDeep 最大拍平深度
 * @returns
 */
function flatten5(arr, maxDepth) {
  const results = [];
  const queue = [];
  arr.forEach((v) => {
    queue.push({
      val: v,
      depth: 0,
    });
  });
  while (queue.length) {
    const node = queue.shift();
    const { val, depth } = node;
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

flatten5([[1], [[2]], [[[3]]], [[[[4]]]]], 3);
