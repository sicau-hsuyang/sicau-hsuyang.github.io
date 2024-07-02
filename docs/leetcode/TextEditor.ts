interface TextNode {
  prev: TextNode | null;
  char: string;
  next: TextNode | null;
}

export class TextEditor {
  /**
   * 当前指针的位置
   */
  private currentPos!: TextNode;
  /**
   * 用于存储文本的内容的链表头结点
   */
  private head: TextNode = this.createTextNode("HOME");

  /**
   * 用于存储文本的内容的链表尾结点
   */
  private tail: TextNode = this.createTextNode("END");

  constructor() {
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.currentPos = this.tail;
  }

  /**
   * 创建一个文本节点
   * @param char
   * @returns
   */
  private createTextNode(char: string): TextNode {
    return {
      prev: null,
      char,
      next: null,
    };
  }

  /**
   * 创建一个文本串
   * @param text
   * @returns
   */
  private createString(text: string): { head: TextNode; tail: TextNode } {
    let head!: TextNode;
    let tail!: TextNode;
    for (let i = 0; i < text.length; i++) {
      const node = this.createTextNode(text[i]);
      if (!head && !tail) {
        head = node;
        tail = node;
      } else {
        tail!.next = node;
        node.prev = tail!;
        tail = node;
      }
    }
    return {
      head,
      tail,
    };
  }

  public addText(text: string): void {
    const { head, tail } = this.createString(text);
    // 如果当前光标指向第一个位置
    if (this.currentPos.char === "HOME") {
      const next = this.currentPos.next!;
      tail.next = next;
      next.prev = tail;
      this.currentPos.next = head;
      head.prev = this.currentPos;
      this.currentPos = tail.next;
    }
    // 最后一个位置
    else {
      const prev = this.currentPos.prev!;
      prev.next = head;
      head.prev = prev;
      tail.next = this.currentPos;
      this.currentPos.prev = tail;
    }
  }

  deleteText(k: number): number {
    let node: TextNode | null = this.currentPos.prev;
    let count = 0;
    while (node && node.char !== "HOME" && count < k) {
      node = node!.prev;
      count++;
    }
    let now: TextNode = node!;
    now.next = this.currentPos;
    this.currentPos.prev = now;
    return count;
  }

  public cursorLeft(k: number): string {
    // 如果位于最左边
    if (this.currentPos.char === "HOME") {
      return "";
    }
    let count = 0;
    // 从当前位置的前面开始挪动
    let node = this.currentPos;
    while (node.char !== "HOME" && count < k) {
      node = node.prev as TextNode;
      this.currentPos = node;
      count++;
    }
    let res = "";
    count = 0;
    node = this.currentPos.prev!;
    // 至多取10个
    while (node && node.char !== "HOME" && count < 10) {
      res = node.char + res;
      node = node.prev as TextNode;
      count++;
    }
    return res;
  }

  cursorRight(k: number): string {
    // 如果还没有到最后一个位置，一直向后移动，直到K个为止
    let count = 0;
    let node = this.currentPos;
    // 向右至多移动K次
    while (node.char !== "END" && count < k) {
      node = node.next as TextNode;
      this.currentPos = node;
      count++;
    }
    let res = "";
    node = this.currentPos.prev!;
    count = 0;
    while (node && node.char !== "HOME" && count < 10) {
      res = node.char + res;
      node = node.prev as TextNode;
      count++;
    }
    return res;
  }
}

/**
 * Your TextEditor object will be instantiated and called as such:
 * var obj = new TextEditor()
 * obj.addText(text)
 * var param_2 = obj.deleteText(k)
 * var param_3 = obj.cursorLeft(k)
 * var param_4 = obj.cursorRight(k)
 */
