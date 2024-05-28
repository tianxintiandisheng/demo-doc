// LinkedList.js
class ListNode {
  data: any;
  next: any;
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head: any;
  constructor() {
    this.head = null;
  }

  // 返回链表长度
  length() {
    let current = this.head;
    let count = 0;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  /**
   * 新增
   */
  append(data) {
    const newNode = new ListNode(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  /**
   * 删除
   */
  remove(data) {
    if (!this.head) return;
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
    }
  }

  /**
   * 在指定位置插入数据
   */
  insertAt(data, position) {
    if (position < 0 || position > this.length()) {
      console.error('Insert position is out of range.');
      return;
    }

    const newNode = new ListNode(data);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let prev = null;
      for (let i = 0; i < position; i++) {
        prev = current;
        current = current.next;
      }
      newNode.next = current;
      prev.next = newNode;
    }
  }

  /**
   * 置顶
   * @param {*} data 要置顶的节点的数据
   */
  moveToTop(data) {
    if (!this.head) return; // 链表为空时无需操作

    // 如果头节点就是要置顶的节点，则无需操作
    if (this.head.data === data) return;

    // 首先尝试找到待置顶节点及其前驱节点
    let current = this.head;
    let prev = null;

    while (current && current.data !== data) {
      prev = current;
      current = current.next;
    }

    if (!current) return; // 数据不存在于链表中

    // 如果找到了待置顶的节点
    if (prev) {
      // 从原位置删除节点
      prev.next = current.next;
    } else {
      // 如果是头节点，则直接更新head
      this.head = current.next;
    }

    // 插入到头部
    current.next = this.head;
    this.head = current;
  }

  toArray() {
    let current = this.head;
    const array: any[] = [];
    while (current) {
      array.push(current.data);
      current = current.next;
    }
    return array;
  }

  /**
   * @function 将"数组结构"的数据转换为"链表结构"的数据
   */
  arrayToLinkList(arrayData: any[]) {
    const newLinkList = new LinkedList();
    arrayData.forEach((i) => {
      newLinkList.append(i);
    });
    return newLinkList;
  }

  /**
   * @function 将当前链表数据转换为一个新的链表副本
   */
  createCopy() {
    return this.arrayToLinkList(this.toArray());
  }
}

export { LinkedList };
