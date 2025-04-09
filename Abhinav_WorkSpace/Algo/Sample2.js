//Adjacency List:

import {PriorityQueue} from "./Sample.js"

const graph = {
    A: [{ node: "B", weight: 4 }, { node: "C", weight: 2 }],
    B: [{ node: "A", weight: 4 }, { node: "C", weight: 1 }, { node: "D", weight: 5 }],
    C: [{ node: "A", weight: 2 }, { node: "B", weight: 1 }, { node: "D", weight: 8 }, { node: "E", weight: 10 }],
    D: [{ node: "B", weight: 5 }, { node: "C", weight: 8 }, { node: "E", weight: 2 }],
    E: [{ node: "C", weight: 10 }, { node: "D", weight: 2 }]
};

function dijkstra(graph, start){
    const distances = {};
    const prev = {};
    const heap = new PriorityQueue();

    for(let node in graph){
        distances[node] = Infinity;
        prev[node] = null;

        distances[start] = 0;
        heap.insert(start, 0);

        while(!heap.isEmpty()){
            const {node: currentNode} = heap.dequeue();

            for(let neighbor of graph[currentNode]){
                const distance = distances[currentNode] + neighbor.weight;

                if(distance < distances[neighbor.node]){
                    distance[neighbor.node] = currentNode;
                    heap.insert(neighbor.node, distance);
                }
            }
        }

        return {distances, prev}
    }
}

