# Dijkstra's Algorithm

## Goal
Find the shortest path from a single source node to all other nodes in a graph with non-negative edge weights.

## 1.Initialize
**Set the distance to all nodes as infinity except the source, which is 0.**
**Keep a priority queue of unvisited nodes, ordered by current shortest distance.**

## Loop until all nodes are visited
**Pick the node with the smallest distance from the queue.**

**For each neighbor of the currect node:**
->calculate new_distance = distance[current] + weight (current->neighbor)
->if new_distance < distance[neighbor], update distance[neighbor] and reorder the queue.

**Mark the current node as visited(we've found the best path to it).**

## Repeat until all reachable nodes are processed.

# Draw back of Dijkstra Algorithm 
If there is a negative weight it will give wrong answer because if there is a small node it will update that path and when it come across the new node with negative value then it will not update that path because it is already updated and this will give us wrong answer.