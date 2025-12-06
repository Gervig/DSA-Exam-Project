import Graph from "../data-structures/graph.js";
import Model from "./model.js";
import View from "./view.js";

const graph = new Graph();
const view = new View();
const model = new Model(graph);

// ----- Build sample graph ----- //

graph.addNode("A", 120, 80);
graph.addNode("B", 300, 60);
graph.addNode("C", 480, 120);
graph.addNode("D", 520, 280);
graph.addNode("E", 350, 330);
graph.addNode("F", 160, 300);
graph.addNode("G", 80, 200);
graph.addNode("H", 260, 180);

// weighted edges
graph.addEdge("A", "B", 2);
graph.addEdge("A", "G", 3);
graph.addEdge("A", "H", 7);

graph.addEdge("B", "C", 4);
graph.addEdge("B", "H", 1);

graph.addEdge("C", "D", 5);
graph.addEdge("C", "H", 2);

graph.addEdge("D", "E", 1);

graph.addEdge("E", "F", 6);

graph.addEdge("F", "G", 4);

graph.addEdge("H", "E", 3);
graph.addEdge("H", "F", 5);



view.renderGraph(graph);

// ----- Populate dropdowns ----- //
const startSelect = document.getElementById("start-node");
const endSelect = document.getElementById("end-node");

graph.nodes.forEach(n => {
    startSelect.innerHTML += `<option>${n.id}</option>`;
    endSelect.innerHTML += `<option>${n.id}</option>`;
});

startSelect.value = "A";
endSelect.value = "E";

let stepIndex = 0;
let autoPlay = null;

// ----- Buttons ----- //

document.getElementById("btn-run").onclick = () => {
    model.runDijkstra(startSelect.value, endSelect.value);
    stepIndex = 0;
    playSteps();
};

document.getElementById("btn-step").onclick = () => {
    if (model.steps.length === 0)
        model.runDijkstra(startSelect.value, endSelect.value);

    showStep(stepIndex++);
};

document.getElementById("btn-reset").onclick = () => {
    clearInterval(autoPlay);
    model.resetState();
    view.renderGraph(graph);
    view.log.innerHTML = "";
    stepIndex = 0;
};

// highlight final path
document.getElementById("btn-show-path").onclick = () => {
    const path = model.reconstructPath();
    view.highlightFinalPath(path);
    view.logStep(`Final path: ${path.join(" → ")}`);
};

// ----- Step handling ----- //

function playSteps() {
    clearInterval(autoPlay);
    const delay = document.getElementById("speed").value;

    autoPlay = setInterval(() => {
        if (stepIndex >= model.steps.length) {
            clearInterval(autoPlay);
            return;
        }
        showStep(stepIndex++);
    }, delay);
}

function showStep(step) {
    const s = model.steps[step];
    if (!s) return;

    view.updatePQ(s.pq);

    switch (s.type) {
        case "init":
            view.logStep("Initialized distances.");
            view.highlightPseudo(0);
            break;

        case "relax":
            view.markActive(s.u);
            view.logStep(`Relaxing edge ${s.u} → ${s.v}`);
            view.highlightPseudo(5);
            break;

        case "visit":
            view.markVisited(s.u);
            view.logStep(`${s.u} permanently visited.`);
            view.highlightPseudo(10);
            break;

        case "target_reached":
            view.markVisited(s.u);
            view.logStep(`Target node ${s.u} reached! Stopping early.`);
            view.highlightPseudo(8);
            break;

        case "done":
            view.logStep("Algorithm finished.");
            view.highlightPseudo(14);
            break;
    }
}
