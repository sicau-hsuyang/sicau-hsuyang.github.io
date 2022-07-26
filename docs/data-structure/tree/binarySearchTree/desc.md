## 二叉搜索树

`二叉搜索树`（或者叫`二叉排序树`），是一种特殊的二叉树，其中一个重要的性质是它的**左子树的节点值均比根节点小，右子树的节点值均比根节点值大，并且其左右子树也是一颗二叉搜索树**。

正是因为这个性质，通常会采用二叉搜索树进行高效率的检索和删除操作。

## 二叉搜索树的实现

首先定义树节点的结构定义如下：

```ts
interface TreeNode<T> {
  // 树节点的值域
  val: T;
  // 树节点的左子节点
  left: TreeNode<T> | null;
  // 树节点的右子节点
  right: TreeNode<T> | null;
}
```

根据二叉搜索性质，我们可以得出一个结论:

**最大节点一定是在右子树上，并且一定没有右子节点。**

**最小节点一定是在左子树上，并且这个节点一定没有左右儿子节点，即叶节点。**

**二叉树的中序遍历序列一定是一个非降序的序列**

:::tip 编程技巧
二叉树的中序遍历序列一定是一个非降序的序列，因此可以用一颗树的中序序列来判断一颗树是否是二叉搜索树。
:::

二叉搜索树的主要操作有 `find`,`findMin`,`findMax`,`insert`,`delete`。

### 递归实现

#### 查找

根据二叉搜索树的定义，左儿子一定会比右儿子小。因此，如果我们当前起始节点不存在的话，说明对应的值在二叉树中不存在，如果当前节点存在，并且恰好和我们要找的节点值相等的话，那么就说明找到了，因此我们可以直接返回当前节点，如果待查找值比当前节点的值小，那么它只有可能在左子树上找的到，因次，我们沿着左子树递归，反之，我们则沿着右子树递归。

#### 插入

对于插入，如果树是空，直接插入返回新树即可，如果树不为空，若待插入的值比根节点的值小，则沿着左子树进行插入，否则沿着右子树进行插入，重复这个过程直到找到合适的位置，完成插入。

#### 删除

二叉搜索树的删除相比插入要复杂的多，我们需要考虑的情况比较多：
首先，递归的思路此处不再赘述了，如果传入的节点就不存在，说明要删除的值肯定在搜索树中根本不存在。

我们主要考虑能找到待删除节点的情况，如下：

- 1、没有左右儿子节点。
- 2、仅有左儿子节点。
- 3、仅有右儿子节点。
- 4、同时具有左右儿子节点。

对于 case1,因为不需要进行任何操作。
传入的是有值的节点，返回空，我们给上层节点的左（或者 右）儿子接上这个空，则完成了删除。

对于 case2,也不难，不就是要删除当前节点嘛，好呀，我直接把当前节点变成当前节点的左儿子给你返回，你上层递归调用的函数不就老老实实的给我接上了吗，嘿嘿（或者，把当前节点的左儿子的值拷贝给自己，然后把当前节点的左儿子指针置为空，然后返回这个节点，不过好像没有必要这样做呢）。

对于 case3,同 case2，只不过我们操作的是右儿子。

对于 case4,也就是最关键的，这个问题需要利用转化的思想。首先，因为总是有右子树的任何节点比当前待删除节点大，左子树的任何节点比当前待删除节点的值小的性质。我们可以换个角度想，我从右子树里面先找一个最小值节点替换到当前的这个待删除节点上，如果不考虑之前找到的最小值节点，是否仍然满足二叉搜索树的性质呀，nice，那我再从这个位置开始把之前找到的最小值节点删了不就行了吗，哈哈哈。有的朋友会说了，待删除右子树的最小值节点可能同时有左右儿子节点嘛，不就又绕回来了吗。根据二叉搜索树的性质，当前子树的最小值肯定是不会再有左子节点的了。所以，我们再从待删除节点出发，递归的删除当前节点右子树的最小值即可（上述操作找左子树的最大值也可以）。

```js
/**
 * 二叉搜索树类
 */
class BST {
  /**
   * @type {TreeNode}
   */
  #tree = null;

  /**
   * 创建一个树节点
   * @param {number} val
   * @returns {TreeNode}
   */
  #createTreeNode(val) {
    return {
      val,
      left: null,
      right: null,
    };
  }

  /**
   * 查找指定值是否在二叉搜索树中存在
   * @param {number} val
   * @returns {TreeNode}
   */
  find(val) {
    return this.#find(val, this.#tree);
  }

  #find(val, node) {
    if (!node) {
      return null;
    }
    if (node.val === val) {
      return node;
    } else if (node.val > val) {
      return this.#find(val, node.left);
    } else if (node.val < val) {
      return this.#find(val, node.right);
    }
  }

  insert(val) {
    this.tree = this.#insert(val, this.tree);
  }

  /**
   * 使用递归的方式向搜索树中插入一个节点
   * @param {number} val
   * @param {Node} node
   * @returns
   */
  #insert(val, node) {
    if (!node) {
      node = this.#createTreeNode(val);
    } else {
      if (val < node.val) {
        node.left = this.#insert(val, node.left);
      } else if (val > node.val) {
        node.right = this.#insert(val, node.right);
      }
    }
    return node;
  }

  delete(val) {
    this.tree = this.#delete(val, this.tree);
  }

  /**
   * 使用递归的方式删除一个节点
   * @param {number} val 待删除的值
   * @param {TreeNode} node 从指定的节点开始删除
   * @returns
   */
  #delete(val, node) {
    if (!node) {
      console.warn("无法找到需要删除的值");
      return null;
    } else if (val > node.val) {
      node.right = this.#delete(val, node.right);
    } else if (val < node.val) {
      node.left = this.#delete(val, node.left);
    } else {
      if (node.left && node.right) {
        let rightMin = this.#findMinPosition(node.right);
        node.val = rightMin.val;
        node.right = this.#delete(rightMin.val, node.right);
      } else if (node.left) {
        node = node.left;
      } else if (node.right) {
        node = node.right;
      } else {
        node = null;
      }
    }
    return node;
  }
}
```

### 非递归实现

#### 查找

对于查找此处不再赘述，递归和非递归完全类似

#### 插入

对于插入，如果当前树是空的话直接插入即可。

如果有插入相同的值肯定不允许插入。

如果当前的节点值比待插入值小的话，说明我们应该往当前节点的右子树找位置插入才对。如果当前节点的右子树不存在的话，OK，恭喜你，这个位置就是你要插入的位置啦。我们的循环就没有必要再继续做下去了。否则，我们就接着从右子树下面找插入位置往下找呗。

如果当前的节点值比待插入值大的话，说明我们应该往当前节点的左子树找位置插入才对。如果当前节点的左子树不存在，OK，恭喜你，这个位置就是你要插入的位置啦，结束循环。否则，我们接着从左子树下面找合适的插入位置。

#### 删除

使用非递归删除二叉搜素树的思路和递归一致，但是代码的实现复杂程度一下子提高了很多。

在使用递归删除的过程中，因为我们借用了系统的调用栈，我们可以很好的处理删除之后的节点引用关系，而使用非递归操作，这个过程完全就交给我们自己了，正所谓划了多少水，迟早要还的。

首先，我们需要定义一个 parent 指针，因为一会儿需要用这个指针来连接子树。迭代步骤跟插入查找一致，此处不再赘述。退出第一个循环有 2 种情况: **树为空** 或者 **找到了待删除的节点**。
如果是第一种情况，那好说，直接就啥事儿不用干，多好啊，哈哈哈。

主要就是看第二种情况,这种情况下仍然和之前递归删除的时候我们需要考虑的问题是一致的，仍然是 4 种 case。

首先考虑最简单的 case，当前待删除节点无左右儿子，此时 parent 指针指向的是父节点，但是有个问题需要注意哦，当前这个待删除节点是左儿子还是右儿子得根据父节点的值来确定哦。

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f9d18cc84a84055b986946f5c131a7c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />

接着考虑待删除节点仅有右子节点的 case，这个 case 和删除没有左右儿子节点的节点的 case 类似，只需要把当前待删除节点的右子树接上就可以了。同样，还是需要考虑是用父节点的左儿子指针接还是右儿子指针接。

待删除节点仅有左子节点的 case 和待删除节点仅有右子节点的 case 类似，此处也不再赘述。

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa4bfb6c9d734d3494f9ddee5f0d880c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />

最后考虑同时有左右儿子的 case，好想递归调用删除节点方法有没有？哈哈哈哈。既然我们使用非递归删除，那就完完全全的用非递归实现吧。我们先用一个变量先把当前这个节点的位置先记住，免得一会儿向下迭代的时候找不到了。还是和递归删除的思路一致，当前节点的左子树找一个最大值或者右子树里面找一个最小值。找到之后把这个值拷贝到之前我们事先记住的那个节点上去，然后删除这个节点，又变成了删除只有单子节点的 case 了。

这儿有一个需要注意的店是假设我们删除的时候以当前节点的左子树最大值替换待删除节点的值。

:::danger
一定不要忘了，左子树的最大值是有可能有左子树的，一定不要忘了把这个子树给拼接上，否则就会丢失这一大块存储区域。
:::

```js
leftMaxParentNode.right = leftMaxNode.left; // 拼接左子树，有可能没有左子树，但此步骤不能少。
```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1819c6d5c9904d35947f0b371d3778c7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?" />

```js
/**
 * 二叉搜索树的非递归实现
 */
class BST {
  /**
   * @type {TreeNode}
   */
  #tree = null;

  /**
   * 创建一个树节点
   * @param {number} val
   * @returns {TreeNode}
   */
  #createTreeNode(val) {
    return {
      val,
      left: null,
      right: null,
    };
  }

  /**
   * 查找二叉树中值为val的节点
   * @param {number} val
   * @returns
   */
  #findPosition(val) {
    let node = this.#tree;
    let targetNode = null;
    while (node) {
      if (node.val === val) {
        targetNode = node;
        break;
      } else if (val > node.val) {
        node = node.right;
      } else if (val < node.val) {
        node = node.left;
      }
    }
    return targetNode;
  }

  /**
   * 从二叉搜素树中删除一个值
   * @param {number} val
   */
  delete(val) {
    let node = this.#tree;
    let parent = null;
    while (node) {
      // 如果找到了当前节点 则中断循环
      if (node.val === val) {
        break;
      }
      parent = node;
      // 如果当前节点的值比val小，说明待删除的节点在右子树上
      if (node.val < val) {
        node = node.right;
        // 如果当前节点的值比val大，说明待删除的节点在左子树上
      } else if (node.val > val) {
        node = node.left;
      }
    }
    if (!node) {
      console.warn("要删除的节点不存在");
    } else if (node.left && node.right) {
      let leftMaxParentNode = node;
      let leftMaxNode = node.left;
      // 退出循环的时候，leftMaxNode是肯定没有右子树节点的了
      while (leftMaxNode.right) {
        leftMaxParentNode = leftMaxNode;
        leftMaxNode = leftMaxNode.right;
      }
      // 先把左子树的最大值拷贝到当前要删除的节点上去，然后从左子树删除左子树的最大值节点
      node.val = leftMaxNode.val;
      // 前驱节点的右指针指向当前节点的左指针 虽然leftMaxNode.left可能不存在，但是还是要将其链接在前驱节点的右子节点上
      leftMaxParentNode.right = leftMaxNode.left;
    } else if (node.left) {
      if (parent === null) {
        this.#tree = node.left;
      } else {
        // 判断当前节点是来源于左子节点还是右子节点
        if (parent.val > node.val) {
          parent.left = node.left;
        } else {
          parent.right = node.left;
        }
      }
    } else if (node.right) {
      if (parent === null) {
        this.#tree = node.right;
      } else {
        // 判断当前节点是来源于左子节点还是右子节点
        if (parent.val > node.val) {
          parent.left = node.right;
        } else {
          parent.right = node.right;
        }
        node = null;
      }
    } else {
      if (parent === null) {
        this.#tree = null;
      } else {
        // 判断当前节点是来源于左子节点还是右子节点
        if (parent.val > node.val) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      }
      node = null;
    }
  }

  /**
   * 向二叉搜索树中插入一个值
   * @param {number} val
   */
  insert(val) {
    // 创建一个新的节点
    let newNode = this.#createTreeNode(val);
    // 如果当前树为空, 直接将节点插入根节点
    if (!this.#tree) {
      this.#tree = newNode;
      return;
    }
    let node = this.#tree;
    while (true) {
      // 如果插入相同值，直接报错
      if (val === node.val) {
        console.warn("不允许插入相同值的节点");
        break;
      }
      // 如果当前值比节点值大，node向右子树下滤
      else if (val > node.val) {
        // 如果当前节点的右儿子没了，说明这个就是一个合适的插入位置
        if (!node.right) {
          node.right = newNode;
          break;
        }
        // 沿着右子树下滤
        node = node.right;
        // 如果当前值比节点值小，node向左子树下滤
      } else if (val < node.val) {
        // 如果当前节点的左儿子没了，说明这个就是一个合适的插入位置
        if (!node.left) {
          node.left = newNode;
          break;
        }
        // 沿着左子树下滤
        node = node.left;
      }
    }
  }

  /**
   * 查找树中最大值
   */
  findMax() {
    let node = this.#findMaxPosition();
    return node ? node.val : null;
  }

  /**
   * 查找树中最大值的位置
   * @param {TreeNode} startNode 从指定节点开始查询
   * @returns {TreeNode}
   */
  #findMaxPosition(startNode) {
    startNode = startNode || this.#tree;
    if (!startNode) {
      console.warn("empty tree");
      return null;
    }
    let node = startNode;
    while (node.right) {
      node = node.right;
    }
    return node;
  }

  /**
   * 查找树中最小值
   * @returns {number}
   */
  findMin() {
    let node = this.#findMinPosition();
    return node ? node.val : null;
  }

  /**
   * 查找树中最小值的节点
   * @param {TreeNode} startNode 从指定节点开始查询
   * @returns {TreeNode}
   */
  #findMinPosition(startNode) {
    startNode = startNode || this.#tree;
    if (startNode) {
      console.warn("empty tree");
      return;
    }
    let node = startNode;
    while (node.left) {
      node = node.left;
    }
    return node;
  }
}
```

## 复杂度分析

二叉搜索树理想情况插入、查找、删除的效率是非常高的，是典型的二分查找思想，能达到 `O(logN)`，但是理想很丰满，现实很骨感。假设我们**插入有序序列**或者**总是删除二叉搜索树的最大值或者最小值**，最终我们的**二叉搜索树竟然会成为一个链表**，效率直接降到 `O(N)`，所以如何在插入或删除的时候总是使得我们的树左半部分和右半部分节点数差异不大，那么我们查找和删除的效率总能达到 `O(logN)`，这便是 `AVL树`或`红黑树`。[AVL 树](../../search/avlTree.md)或`红黑树`在后面我们会详细讨论。
