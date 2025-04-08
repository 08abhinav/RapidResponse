/*Build a basic graph class
The graph will represent a city or region.
Every intersection(node) is a key, and the
roads(edges) are values with connected intersections
and weights.

Why am i using adjacency list?
Adjacency list represents a graph as a dictionary or map where:
->Each key is a node or vertex in the graph.
->Each value is a list of adjacent nodes that
the key node is directly connected to.

Example: 
a--b
|  |
|  |
c  d

The adjacency list would be:
{
a:['b', 'c'],
b:['a', 'd'],
c:['a'],
d:['b']
} (each key is a node, value is an array of edges)

Advantages:
1.It is efficient for sparse graphs(like city maps).
2.Easy to update in real time.
3.Memory efficient:
for graph with v vertices and e Edges
->adjancency list space= O(v+e);
->adjancency matrix space = O(v^2)
*/

// Implementing

class Graph{
    constructor(){
        this.adjList = {};
    }

    addNode(node){
        if(!this.adjList[node]){
            this.adjList[node] = [];
        }
    }

    addEdge(from, to, weight=1){
        this.addNode(from);
        this.addNode(to);
        this.adjList[from].push({node: to, weight: weight})
    }

    updateEdge(from, to, newWeight){
        for(let edge of this.adjList[from]){
            if(edge.node === to){
                edge.weight = newWeight;
                return;
            }
        }
    }

    display(){
        for(let node in this.adjList){
            console.log(`${node}->`, this.adjList[node]);
        }
    }
}

const cityGraph = new Graph();

cityGraph.addEdge("A", "B", 180)
cityGraph.addEdge("D", "B", 120)
cityGraph.addEdge("B", "C", 100)
cityGraph.addEdge("D", "C", 180)
cityGraph.addEdge("A", "D", 240)

cityGraph.display()

/*
*****OUTPUT*****
A-> [ { node: 'B', weight: 180 }, { 
node: 'D', weight: 240 } ]
B-> [ { node: 'C', weight: 100 } ]  
D-> [ { node: 'B', weight: 120 }, { 
node: 'C', weight: 180 } ]
C-> []
*/