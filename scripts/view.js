export default class View {
    constructor() {
        this.svg = document.getElementById("graph");
        this.pseudo = document.getElementById("pseudocode");
        this.pqList = document.getElementById("pq-list");
        this.log = document.getElementById("log");
    }

    renderGraph(graph) {
        this.svg.innerHTML = "";

        // Draw edges
        graph.edges.forEach(e => {
            const n1 = graph.nodes.find(n => n.id === e.from);
            const n2 = graph.nodes.find(n => n.id === e.to);
            this.svg.innerHTML += `
                <line class="edge"
                      id="edge-${e.from}-${e.to}"
                      x1="${n1.x}" y1="${n1.y}"
                      x2="${n2.x}" y2="${n2.y}"
                      stroke="black" stroke-width="2"></line>
                <text x="${(n1.x+n2.x)/2}"
                      y="${(n1.y+n2.y)/2}"
                      font-size="14"
                      fill="black">${e.weight}</text>
            `;
        });

        // Draw nodes
        graph.nodes.forEach(n => {
            this.svg.innerHTML += `
                <circle class="node"
                        id="node-${n.id}"
                        cx="${n.x}" cy="${n.y}" r="20"
                        fill="white" stroke="black" stroke-width="2"></circle>
                <text x="${n.x}" y="${n.y+5}"
                      text-anchor="middle"
                      font-size="14">${n.id}</text>
            `;
        });
    }

    highlightPseudo(lineIndex) {
        const lines = this.pseudo.innerHTML.split("\n");
        this.pseudo.innerHTML = lines
            .map((line, i) => i === lineIndex ?
                `<span class="pseudo-highlight">${line}</span>` : line)
            .join("\n");
    }

    updatePQ(heap) {
        this.pqList.innerHTML = "";
        heap.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.node} (dist = ${item.priority})`;
            this.pqList.appendChild(li);
        });
    }

    logStep(text) {
        this.log.innerHTML += `<div>${text}</div>`;
        this.log.scrollTop = this.log.scrollHeight;
    }

    markVisited(id) {
        document.getElementById(`node-${id}`).classList.add("visited");
    }

    markActive(id) {
        document.querySelectorAll(".node").forEach(n => n.classList.remove("active"));
        document.getElementById(`node-${id}`).classList.add("active");
    }
}
