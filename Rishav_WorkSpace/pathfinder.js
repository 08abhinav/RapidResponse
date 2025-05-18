const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

// Sample graph (nodes and edges) with Adjacency List representation
const graph = {
    A: { B: 2, C: 4 },
    B: { A: 2, C: 1, D: 7 },
    C: { A: 4, B: 1, D: 3, E: 5 },
    D: { B: 7, C: 3, E: 2 },
    E: { C: 5, D: 2 }
};

const positions = {
    A: [100, 100], B: [200, 200], C: [300, 150], D: [400, 250], E: [500, 100]
};

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);// Clear previous drawing
    ctx.fillStyle = "lightgray";// Set background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);// Fill background

    ctx.strokeStyle = "black";// Set line color
    ctx.lineWidth = 2;// Set line thickness
    
    for (let node in graph) {
        for (let neighbor in graph[node]) {
            ctx.beginPath();               // Start new line
            ctx.moveTo(...positions[node]);// Move to current node
            ctx.lineTo(...positions[neighbor]);// Draw line to neighbor
            ctx.stroke();                     // Render the line
        }
    }

    for (let node in positions) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(...positions[node], 10, 0, Math.PI * 2);// Draw circle for the node
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.fillText(node, positions[node][0] - 5, positions[node][1] + 5);// Label the node
    }
}

//Dijkstra's Algorithm
function dijkstra(start, end) {
let distances = {};  // Object to store the shortest distance from start node to every other node
let prev = {};       // Object to store the previous node for each node (used to reconstruct path)
let pq = new Set(Object.keys(graph));  // Priority queue: initially contains all nodes

// Initialize distances: set all nodes to Infinity, except the start node (0)
for (let node in graph) {
distances[node] = Infinity;
}
distances[start] = 0;

// Main loop: continue until all nodes have been visited
while (pq.size) {
// Find the node with the smallest distance from the unvisited nodes
let minNode = Array.from(pq).reduce((a, b) => distances[a] < distances[b] ? a : b);
pq.delete(minNode);  // Remove the node from the queue (it's now visited)

// Update the distances for each neighbor of the current node
for (let neighbor in graph[minNode]) {
    let alt = distances[minNode] + graph[minNode][neighbor]; // Calculate new path distance
    if (alt < distances[neighbor]) {
        distances[neighbor] = alt; // Update distance if a shorter path is found
        prev[neighbor] = minNode; // Record the path (how we got to this neighbor)
    }
}
}

// Reconstruct the shortest path from end to start
let path = [];
let step = end;
while (step) {
path.unshift(step);  // Insert the step at the beginning of the path
step = prev[step];   // Move to the previous node in the path
}

// Return the path if it contains more than one node (means a valid path was found)
return path.length > 1 ? path : [];
}


function highlightPath(path) {
    if (path.length < 2) return;
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    
    ctx.beginPath();
    ctx.moveTo(...positions[path[0]]);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(...positions[path[i]]);
    }
    ctx.stroke();
}

function findPath() {
const start = document.getElementById("start").value; // Get the start node from input field
const destination = document.getElementById("destination").value; // Get the destination node

if (start === destination) {               // Check if start and end are the same
alert("Start and destination cannot be the same."); // Show alert if they are the same
return;                                 // Exit the function
}

drawGraph();                                // Function to draw the graph visually (assumed defined elsewhere)
const path = dijkstra(start, destination);  // Call Dijkstra's algorithm to find the shortest path
highlightPath(path);                        // Highlight the path on the graph (assumed defined elsewhere)
}

drawGraph();