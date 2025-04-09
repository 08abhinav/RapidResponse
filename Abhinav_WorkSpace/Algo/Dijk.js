//Adjacency List:

import {PriorityQueue} from "./PQ.js"

const graph = {
    A: [{ node: "B", weight: 4 }, { node: "C", weight: 2 }],
    B: [{ node: "A", weight: 4 }, { node: "C", weight: 1 }, { node: "D", weight: 5 }],
    C: [{ node: "A", weight: 2 }, { node: "B", weight: 1 }, { node: "D", weight: 8 }, { node: "E", weight: 10 }],
    D: [{ node: "B", weight: 5 }, { node: "C", weight: 8 }, { node: "E", weight: 2 }],
    E: [{ node: "C", weight: 10 }, { node: "D", weight: 2 }]
};

function dijkstra(graph, start) {
  const distances = {};
  const prev = {};
  const heap = new PriorityQueue();

  for (let node in graph) {
    distances[node] = Infinity;
    prev[node] = null;
  }

  distances[start] = 0;
  heap.enqueue(start, 0);

  while (!heap.isEmpty()) {
      const { value: currentNode } = heap.dequeue();

    for (let neighbor of graph[currentNode]) {
      const distance = distances[currentNode] + neighbor.weight;

      if (distance < distances[neighbor.node]) {
        distances[neighbor.node] = distance;
        prev[neighbor.node] = currentNode;
        heap.enqueue(neighbor.node, distance);
      }
    }
  }

  return { distances, prev };
}
  

function reconstructPath(strat, end, prev){
  const path = []
  let current = end;

  while(current!=null){
    path.push(current);
    current = prev[current];
  }

  path.reverse();

  if(path[0]!==strat){
    return [];
  }

  return path;
}

const {distances, prev} = dijkstra(graph, "A")
const path = reconstructPath("A", "E", prev)

console.log("Shortest distances from D: ")
console.log(distances);

console.log("Previous nodes fro path reconstruction: ");
console.log(prev);

console.log("Shortest path from A to E: ", path);


/* Dijkstra's Algorithm
It finds the shrotest travel time
between two points in a weighted graph.

It works on both directed and undirected graph.

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