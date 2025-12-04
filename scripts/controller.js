import {graph} from "../data structures/graph.js"
import queue from "../data structures/queue.js"

let steps = [];

function applyStep(step) {
  // reset node colors
  graph.nodes.forEach(n => {
    document.getElementById(`node-${n.id}`).setAttribute("class", "node");
  });

  // color visited
  step.visited.forEach(id => {
    document.getElementById(`node-${id}`).classList.add("visited");
  });

  // color priority queue
  step.queue.forEach(id => {
    document.getElementById(`node-${id}`).classList.add("queue");
  });

  // highlight current node
  document.getElementById(`node-${step.current}`).classList.add("current");

  // highlight final path (if any)
  step.path.forEach(p => {
    const id = `edge-${p.from}-${p.to}`;
    document.getElementById(id).classList.add("path");
  });
}

function drawGraph() {
  const svg = document.getElementById("graph");
  svg.innerHTML = "";

  // Draw edges
  graph.edges.forEach(e => {
    const n1 = graph.nodes.find(n => n.id === e.from);
    const n2 = graph.nodes.find(n => n.id === e.to);

    svg.innerHTML += `
      <line 
        class="edge" 
        id="edge-${e.from}-${e.to}"
        x1="${n1.x}" y1="${n1.y}"
        x2="${n2.x}" y2="${n2.y}"
      ></line>

      <text 
        x="${(n1.x + n2.x) / 2}" 
        y="${(n1.y + n2.y) / 2}" 
        font-size="14"
      >${e.weight}</text>
    `;
  });

  // Draw nodes
  graph.nodes.forEach(n => {
    svg.innerHTML += `
      <circle 
        class="node"
        id="node-${n.id}"
        cx="${n.x}" cy="${n.y}" r="20" 
        stroke="black" stroke-width="2" fill="white"
      ></circle>
      <text 
        x="${n.x}" 
        y="${n.y + 5}" 
        text-anchor="middle"
        font-size="14"
      >${n.id}</text>
    `;
  });
}

drawGraph();

