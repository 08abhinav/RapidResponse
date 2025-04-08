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
}

Advantages:
1.It is efficient for sparse graphs(like city maps).
2.Easy to update in real time.
3.Memory efficient:
for graph with v vertices and e Edges
->adjancency list space= O(v+e);
->adjancency matrix space = O(v^2)
*/