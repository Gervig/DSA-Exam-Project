export default class Queue {
  // First in, first out (FIFO)
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  head() {
    return this.head;
  }

  tail() {
    return this.tail;
  }

  enqueue(data) {
    const newNode = this._createNode(data);

    // if the list doesn't have a tail, sets new node as tail and head
    if (!this.tail && !this.head) {
      this.tail = newNode;
      this.head = newNode;
      // sets the tail's next as new node
      // sets new node's prev as the old tail
      // finally overwrites the tail variable as the new node
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    // size of list goes up
    this._size++;
  }

  remove(index) {
    // checks for valid index
    if (index < 0 || index >= this._size) {
      throw RangeError(`Index ${index} out of range`);
    }

    // declare a node for removal
    let removedNode;
    // if index is the head
    if (index === 0) {
      removedNode = this.head;
      // sets the head's node .next as the new head
      // now the old head has no next,
      // it's not linked and therefore 'removed' from the list
      this.head = this.head.next;
      // the new head should no longer have a prev
      if (this.head) this.head.prev = null;
      // if the list only has one node,
      // the tail variable should also be set to null after deletion
      if (this._size === 1) this.tail = null;
    }
    // if index is the tail
    else if (index === this._size - 1) {
      removedNode = this.tail;
      // sets the tail's node .prev as the new tail
      this.tail = this.tail.prev;
      // now the old tail has no prev,
      // the new tail should no longer have a next
      this.tail.next = null;
    } else {
      // finds the node before the 'deletion'
      const prev = this.getNode(index - 1);
      // finds the node after the 'deletion'
      const next = prev.next.next;
      // sets removal node as the prev's next
      removedNode = prev.next;
      // sets the prev's next as the removed node's next
      prev.next = removedNode.next;
      // the removed node still has a next,
      // but no other node has a next that points to it
      // we can therefor consider it 'removed'

      // sets the node that is after the deletion's prev
      // to be the deleted node's prev
      next.prev = prev;
    }
    // size of list goes down
    this._size--;

    // return removedNode
    return removedNode;
  }

  dequeue() {
    if (!this.get(0)) {
      throw RangeError(`Nothing to dequeue`);
    }
    return this.remove(0);
  }

  peek() {
    return this.head().data;
  }

  size() {
    return this._size;
  }

  get(index) {
    // return this.list.get(index);

    // finds the node at the index
    const node = this.getNode(index);
    // if it's not null, returns its data
    if (node != null) {
      return node.data;
    } else {
      // if it's null, return undefined
      return undefined;
    }
  }

  // Helper method to create a new node
  _createNode(data, next = null, prev = null) {
    return { data, next, prev };
  }

  getNode(index) {
    // returns null if index is invalid
    if (index < 0 || index >= this._size) return null;
    let current;
    let i = 0;
    let j = this._size - 1;

    // checks if it's fastest to start from head
    // otherwise starts from tail
    if (index > 0 && index < this._size / 2) {
      current = this.head;
      // loops through nodes from the head
      while (current && i < index) {
        current = current.next;
        i++;
      }
    } else {
      current = this.tail;
      // loops through nodes from the tail
      while (current && j > index) {
        current = current.prev;
        j--;
      }
    }

    return current;
  }

  isEmpty() {
    return this._size === 0;
  }

  toArray() {
    const arr = [];
    while (!this.isEmpty()) {
      arr.push(this.dequeue().data);
    }
    return arr;
  }
}
