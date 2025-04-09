/* Dijkstra's Algorithm
It finds the shrotest travel time
between two points in a weighted graph.

In dijkstra, we always want to process the 
closest(least weight) node next.

Steps:
1.Intialize a distance map with infinity for
all nodes except the start node(0).

2.Maintain a visited set to avoid re-checking nodes.

3.Use a manual priority queue.

4.Always pick the node with the latest distance from the queue.

5.For each negihbor of the current node:
-> if going through the current node is
shorter, update the neighbor's distance.

6.Repeat until the destination is reached or
the queue is empty.*/

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
            this.heap[idx] = parent;
            this.heap[parentIdx] = ele;
            idx = parentIdx;
        }
    }

    _sinkDown(){
        let idx = 0;
        const len = this.heap.length;
        const ele = this.heap[0];

        while(true){
            let leftIdx = 2*idx+1;
            let rightIdx = 2*idx+2;
            let swapIdx = null;

            if(leftIdx < len){
                if(this.heap[leftIdx].priority < ele.priority){
                    swapIdx = leftIdx;
                }
            }

            if (rightIdx < length) {
                if (
                  (swapIdx === null && this.heap[rightIdx].priority < element.priority) ||
                  (swapIdx !== null && this.heap[rightIdx].priority < this.heap[swapIdx].priority)
                ) {
                  swapIdx = rightIdx;
                }
            }

            if(swapIdx === null) break;

            this.heap[idx] = this.heap[swapIdx];
            this.heap[swapIdx] = ele
            idx = swapIdx
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