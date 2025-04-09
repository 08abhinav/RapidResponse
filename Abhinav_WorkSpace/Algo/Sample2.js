//Adjacency List:

import {PriorityQueue} from "./Sample.js"

const graph = {
    A: [{ node: "B", weight: 4 }, { node: "C", weight: 2 }],
    B: [{ node: "A", weight: 4 }, { node: "C", weight: 1 }, { node: "D", weight: 5 }],
    C: [{ node: "A", weight: 2 }, { node: "B", weight: 1 }, { node: "D", weight: 8 }, { node: "E", weight: 10 }],
    D: [{ node: "B", weight: 5 }, { node: "C", weight: 8 }, { node: "E", weight: 2 }],
    E: [{ node: "C", weight: 10 }, { node: "D", weight: 2 }]
};
  

