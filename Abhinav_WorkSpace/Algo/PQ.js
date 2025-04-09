export class PriorityQueue{
    constructor(){
        this.heap = [];
    }

    enqueue(value, priority){
        this.heap.push({value, priority})
        this._bubbleUp();
    }

    dequeue(){
        if(this.isEmpty()) return null;

        const min = this.heap[0];
        const end = this.heap.pop();

        if(!this.isEmpty()){
            this.heap[0] = end;
            this._sinkDown();
        }

        return min;
    }

    _bubbleUp(){
        let idx = this.heap.length - 1
        const ele = this.heap[idx];

        while(idx>0){
            let parentIdx = Math.floor((idx-1)/2);
            //(idx-1)/2 (it is binary heap formula)
            let parent = this.heap[parentIdx];

            if(ele.priority >= parent.priority) break;
            
            // if the new node's priority is less than the parent's, swap
            this.heap[parentIdx] = ele;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
    }

    _sinkDown() {
        let idx = 0;
        const len = this.heap.length;
        const ele = this.heap[0];
    
        while (true) {
            let leftIdx = 2 * idx + 1;
            let rightIdx = 2 * idx + 2;
            let swap = null;
    
            if (leftIdx < len) {
                const left = this.heap[leftIdx];
                if (left.priority < ele.priority) {
                    swap = leftIdx;
                }
            }
    
            if (rightIdx < len) {
                const right = this.heap[rightIdx];
                if (
                    (swap === null && right.priority < ele.priority) ||
                    (swap !== null && right.priority < this.heap[swap].priority)
                ) {
                    swap = rightIdx;
                }
            }
    
            if (swap === null) break;
    
            this.heap[idx] = this.heap[swap];
            this.heap[swap] = ele;
            idx = swap;
        }
    }
    
    
    isEmpty(){
        return this.heap.length === 0;
    }
}

/* 
enqueue()-> inserts an element into the queue and bubble
it up to maintain min-heap structure(
# push the item to the end(heap is a complete binary tree)
# call _bubbleUp() to move it up if it violates heap rule.)

_bubbleUP()-> moves the newly added element up the tree until
it finds its correct spot(
# idx is the index of the new node.
# parentIdx = (idx-1)//2 (binary heap formula)
)

dequeue()-> removes and returns the element with the smallest
priority(the root of the heap).
(
# save the root node(min), it has the highest priority(lowest number).
# pop the last node(end) from the heap.
# replace root with end, then call _sinkDown() to restore
heap property.
)

_sinkDown()-> pushes the root node down to its correct position
based on priority(
# leftIdx = 2*idx+1, rightIdx = 2*idx +2: children of current node.
# compare both children with current node.
# if either child has less priority than the current, swap with the
smaller one.
# repeat until no swaps are needed
)

Heap priority: In a min-heap, every parent has a lower
or equal priority than its children. */