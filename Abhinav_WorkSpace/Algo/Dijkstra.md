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