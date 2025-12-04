export default class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    insert(node, priority) {
        const entry = { node, priority };
        this.heap.push(entry);
        this._bubbleUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.isEmpty()) return null;

        const min = this.heap[0];
        const end = this.heap.pop();

        if (!this.isEmpty()) {
            this.heap[0] = end;
            this._sinkDown(0);
        }
        return min;
    }

    decreaseKey(node, newPriority) {
        const index = this.heap.findIndex(e => e.node === node);

        if (index === -1) return;

        if (newPriority < this.heap[index].priority) {
            this.heap[index].priority = newPriority;
            this._bubbleUp(index);
        }
    }

    _bubbleUp(i) {
        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);
            if (this.heap[i].priority >= this.heap[parent].priority) break;
            [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
            i = parent;
        }
    }

    _sinkDown(i) {
        const length = this.heap.length;

        while (true) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let smallest = i;

            if (left < length && this.heap[left].priority < this.heap[smallest].priority)
                smallest = left;

            if (right < length && this.heap[right].priority < this.heap[smallest].priority)
                smallest = right;

            if (smallest === i) break;

            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
}
