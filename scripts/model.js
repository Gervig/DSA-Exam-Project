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
