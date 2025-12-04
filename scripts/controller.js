import Graph from "../data-structures/graph.js";
import Model from "./model.js";
import View from "./view.js";

const graph = new Graph();
const view = new View();
const model = new Model(graph);

// Sample graph
graph.addNode("A", 100, 100);
graph.addNode("B", 300, 80);
graph.addNode("C", 450, 200);
graph.addNode("D", 250, 300);
graph.addNode("E", 100, 250);

graph.addEdge("A", "B", 2);
graph.addEdge("A", "D", 5);
graph.addEdge("B", "C", 4);
graph.addEdge("C", "D", 1);
graph.addEdge("D", "E", 3);

view.renderGraph(graph);

let stepIndex = 0;
let autoPlay = null;

// Run full Dijkstra
document.getElementById("btn-run").onclick = () => {
    model.runDijkstra("A");
    stepIndex = 0;
    playSteps();
};

// Next Step manually
document.getElementById("btn-step").onclick = () => {
    if (model.steps.length === 0) model.runDijkstra("A");
    showStep(stepIndex++);
};

// Reset
document.getElementById("btn-reset").onclick = () => {
    stepIndex = 0;
    model.resetState();
    view.renderGraph(graph);
    view.log.innerHTML = "";
    clearInterval(autoPlay);
};

// Auto-play handler
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

// Interpret a step object
function showStep(step) {
    const s = model.steps[step];

    if (!s) return;

    view.updatePQ(s.pq);

    if (s.type === "init") {
        view.logStep("Initialized distances.");
        view.highlightPseudo(0);
    }

    if (s.type === "relax") {
        view.markActive(s.u);
        view.logStep(`Relaxing edge ${s.u} -> ${s.v}`);
        view.highlightPseudo(5);
    }

    if (s.type === "visit") {
        view.markVisited(s.u);
        view.logStep(`${s.u} permanently visited.`);
        view.highlightPseudo(10);
    }

    if (s.type === "done") {
        view.logStep("Algorithm finished.");
        view.highlightPseudo(14);
    }
}
