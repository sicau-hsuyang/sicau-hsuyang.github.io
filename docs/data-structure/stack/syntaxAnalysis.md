## 栈的应用之词法分析

### 1. 序列化与反序列化二叉树

二叉树节点的定义如下：

```ts
interface TreeNode<T> {
  left: TreeNode | null;
  right: TreeNode | null;
  val: T;
}
```

#### 分析

序列化二叉树的代码较为简单，只要对数据结构有一点儿入门的同学一定能够解答出来。但是反序列化就相当不简单了。因为序列化之后的结果是一层一层的`{`和`}`的嵌套。首先假设输入一定合法，怎么样确定解析规则呢？每当我们遇到一个`}`，向前推导，那么一定是可以遇到一个`{`的。如果一个二叉树有左右子树，那么一定就存在左右子节点。这段字符串里面也一定有相应的字段。（但是也有可能没有，或者是`left:null`这样的情况），我们把左右儿子节点解析出来以后，先按规则存下来，然后，再解析根节点存下来，重复这样一个过程，最终存结果的容器里面只会有一个节点，那就是根节点，即可得到最终的结果。

#### 代码实现：

```javascript
/**
 * 序列化二叉树
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (typeof root === "undefined") {
    return "";
  } else if (root === null) {
    return "null";
  } else {
    const leftStr = serialize(root.left);
    const rightStr = serialize(root.right);
    let str = `val:${root.val}`;
    if (leftStr !== "") {
      str += `,left:${leftStr}`;
    }
    if (rightStr !== "") {
      str += `,right:${rightStr}`;
    }
    return `{${str}}`;
  }
};

/**
 * 反序列化二叉树
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  try {
    // 定义一个栈，用于词法分析
    const stack = [];
    // 定义一个节点栈，用于存储解析的结果，你也可以不用栈，根据自己的需要即可
    const nodeStack = [];
    let offset = 0;
    while (offset < data.length) {
      let char = data[offset];
      // 如果遇到后大括号，需要退栈，退到遇到前花括号为止
      if (char === "}") {
        let leftChar = stack.pop();
        let tempStr = "";
        while (stack.length && leftChar != "{") {
          tempStr = leftChar + tempStr;
          leftChar = stack.pop();
        }
        /*
          经过上述操作之后，我们可以得到一个不含嵌套的树节点字符串
          主要有这几种case:
          "val: 1"
          "val: 1, left: null",
          "val: 1, left: null, right: null",
          "val: 1, left: , right: "
        */
        // 定义解析val域的正则
        let valArr = tempStr.match(/val:\s*(-?\d+)/);
        // 定义解析左子树的正则
        let leftArr = tempStr.match(/left:\s*(null)?/);
        // 定义解析右子树的正则
        let rightArr = tempStr.match(/right:\s*(null)?/);
        // 申明一个初始的空节点，一会根据提取的内容覆盖其属性
        let node = { val: Infinity };
        // 解析val
        if (!Array.isArray(valArr)) {
          throw `the data source is not valid`;
        } else {
          node.val = Number.parseInt(valArr[1]);
        }
        // 解析左子树，但左子树不一定存在
        if (Array.isArray(rightArr)) {
          if (rightArr[1] === "null") {
            node.right = null;
          } else {
            const rightChild = nodeStack.pop();
            if (typeof rightChild === "undefined") {
              throw `the data source is not valid`;
            }
            node.right = rightChild;
          }
        }
        // 解析右子树，但右子树不一定存在
        if (Array.isArray(leftArr)) {
          if (leftArr[1] === "null") {
            node.left = null;
          } else {
            const leftChild = nodeStack.pop();
            if (typeof leftChild === "undefined") {
              throw `the data source is not valid`;
            }
            node.left = leftChild;
          }
        }
        /* 把解析出来的节点加入节点栈 */
        nodeStack.push(node);
      } else {
        // 否则内容直接入栈
        stack.push(char);
      }
      offset++;
    }
    if (nodeStack.length != 1) {
      throw `the data source is not valid`;
    }
    // 在输入合法的前提下，节点栈中的第一个节点就是树的根节点
    return nodeStack[0];
  } catch (exp) {
    console.log(exp);
    return null;
  }
};
```

有了这个基础，相信有能力的同学一定能够手写`JSON.parse()`。

### 2. 四则运算求值

#### 描述：

输入一个表达式（用字符串表示），求这个表达式的值。
保证字符串中的有效字符包括[‘0’-‘9’],‘+’,‘-’, ‘\*’,‘/’ ,‘(’， ‘)’,‘[’, ‘]’,‘{’ ,‘}’。且表达式一定合法。

例如:
`3+2*{1+2*[-4/(8-6)+7]}`，最终结果为 25。

#### 分析：

题设已经说了输入有效。那我们就不考虑异常 case 了，对于一个正常的不带`{}`,`[]`,`()`表达式，比较好求。如`1+2/-10*4-3`,只需要正常的求，首先还是要遍历，第一轮我们主要考虑`*`和`/`,一轮之后,得到的结果便是`1+-0.8-3`，然后第二轮我们可以直接按顺序算便可以得到结果（这儿还有个取巧的方法，用`eval`，哈哈哈）。如果带上`{}`,`[]`,`()`这类运算符号的话，我们是否可以像我们之前的思维方式一样还是分轮进行解析。首先把`()`之间的表达式的值求出来，再填到表达式里面去。接着处理`[]`,再者处理`{}`,最后，问题转化成了我们最开始讨论的不带括号的表达式了。

#### 算法实现：

```javascript
/**
 * 根据不带括号的表达式求值
 * @param {string} str
 */
var calc = function (str) {
  // TODO: 暂时先用eval实现，后期优化为自行处理
  return eval(str);
};

/**
 * 四则运算求值
 * @param {string} s
 */
var arithmetic = function (s) {
  let offset = 0;
  let stack = [];
  while (offset < s.length) {
    let char = s[offset];
    if (char === ")") {
      // 解析()之间的内容
      let tmpStr = "";
      let tmpChar = stack.pop();
      while (tmpChar != "(") {
        tmpStr = tmpChar + tmpStr;
        tmpChar = stack.pop();
      }
      stack.push(eval(tmpStr));
    } else if (char === "]") {
      // 解析[]之间的内容
      let tmpStr = "";
      let tmpChar = stack.pop();
      while (tmpChar != "[") {
        tmpStr = tmpChar + tmpStr;
        tmpChar = stack.pop();
      }
      stack.push(calc(tmpStr));
    } else if (char === "}") {
      // 解析{}
      let tmpStr = "";
      let tmpChar = stack.pop();
      while (tmpChar != "{") {
        tmpStr = tmpChar + tmpStr;
        tmpChar = stack.pop();
      }
      stack.push(calc(tmpStr));
    } else {
      stack.push(char);
    }
    offset++;
  }
  // 解析不带括号的表达式的结果
  let tmpStr = "";
  while (stack.length) {
    tmpStr = stack.pop() + tmpStr;
  }
  let val = calc(tmpStr);
  return val;
};
```
