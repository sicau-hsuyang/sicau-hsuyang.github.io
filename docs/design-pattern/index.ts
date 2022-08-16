/*
 * @Autor: Zhang Yingying
 * @Date: 2022-08-16 22:56:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-08-16 23:09:07
 */

/**
 * 队列节点定义
 */
interface CircularQueueNode<T> {
  /**
   * 前驱节点
   */
  prev: CircularQueueNode<T> | null;
  /**
   * 后继节点
   */
  next: CircularQueueNode<T> | null;
  /**
   * 数据域
   */
  data: T;
}

/**
 * 循环双端队列
 */
class MyCircularQueue<T> {
  /**
   * 队列的最大限制
   */
  limit: number;
  /**
   *
   */
  size: number;
  /**
   *
   */
  head: null | CircularQueueNode<T>;
  /**
   *
   */
  tail: null | CircularQueueNode<T>;
  /**
   * 入队
   * @param value
   * @returns
   */
  enQueue(value: T): void {
    if (this.isFull()) {
      return;
    }
    let newNode: CircularQueueNode<T> = {
      prev: null,
      next: null,
      data: value,
    };
    if (this.head === null && this.tail === null) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
  }
  /**
   * 出队
   * @returns
   */
  deQueue(): null | T {
    if (this.isEmpty()) {
      return null;
    }
    let node = this.head!;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      let nextNode = node.next;
      nextNode!.prev = null;
      this.head = nextNode;
    }
    this.size--;
    return node.data;
  }
  /**
   * 获取队首的元素
   * @returns
   */
  Front(): null | T {
    return !this.isEmpty() ? this.head!.data : null;
  }
  /**
   * 获取队尾元素
   */
  Rear(): null | T {
    return !this.isEmpty() ? this.tail!.data : null;
  }
  /**
   * 队列是否为空
   */
  isEmpty() {
    return this.size === 0;
  }
  /**
   * 队列是否满
   */
  isFull() {
    return this.size === this.limit;
  }
}
