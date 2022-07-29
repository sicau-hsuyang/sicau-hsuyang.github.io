const MAX_LEVEL = 32;
const P_FACTOR = 0.25;

class SkipList {
  constructor() {
    this.head = new SkipListNode(-1, MAX_LEVEL);
    this.level = 0;
  }

  search(target) {
    let curr = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      /* 找到第 i 层小于且最接近 target 的元素*/
      while (curr.forward[i] && curr.forward[i].val < target) {
        curr = curr.forward[i];
      }
    }
    curr = curr.forward[0];
    /* 检测当前元素的值是否等于 target */
    return curr && curr.val === target;
  }

  insert(num) {
    const update = new Array(MAX_LEVEL).fill(this.head);
    let curr = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      /* 找到第 i 层小于且最接近 num 的元素*/
      while (curr.forward[i] && curr.forward[i].val < num) {
        curr = curr.forward[i];
      }
      update[i] = curr;
    }
    const lv = randomLevel();
    this.level = Math.max(this.level, lv);
    const newNode = new SkipListNode(num, lv);
    for (let i = 0; i < lv; i++) {
      /* 对第 i 层的状态进行更新，将当前元素的 forward 指向新的节点 */
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
  }

  erase(num) {
    const update = new Array(MAX_LEVEL).fill(0);
    let curr = this.head;
    for (let i = this.level - 1; i >= 0; i--) {
      /* 找到第 i 层小于且最接近 num 的元素*/
      while (curr.forward[i] && curr.forward[i].val < num) {
        curr = curr.forward[i];
      }
      update[i] = curr;
    }
    curr = curr.forward[0];
    /* 如果值不在存则返回 false */
    if (!curr || curr.val !== num) {
      return false;
    }
    for (let i = 0; i < this.level; i++) {
      if (update[i].forward[i] !== curr) {
        break;
      }
      /* 对第 i 层的状态进行更新，将 forward 指向被删除节点的下一跳 */
      update[i].forward[i] = curr.forward[i];
    }
    /* 更新当前的 level */
    while (this.level > 1 && !this.head.forward[this.level - 1]) {
      this.level--;
    }
    return true;
  }
}

/* 随机生成 level */
function randomLevel() {
  let level = 1;
  while (Math.random() < P_FACTOR && level < MAX_LEVEL) {
    level++;
  }
  return level;
}

class SkipListNode {
  constructor(val, maxLevel) {
    this.val = val;
    this.forward = new Array(maxLevel).fill(0);
  }
}

const skipList = new SkipList();

skipList.insert(1);

skipList.insert(10);

skipList.insert(2);

skipList.insert(9);

skipList.insert(3);

skipList.insert(7);

skipList.insert(4);

skipList.insert(6);

skipList.insert(5);

skipList.insert(8);

debugger;

const flag = skipList.search(8);

console.log(skipList, flag);
