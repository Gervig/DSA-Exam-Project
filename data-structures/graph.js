export default class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(id, x, y) {
        this.nodes.push({ id, x, y });
    }

    addEdge(from, to, weight) {
        this.edges.push({ from, to, weight });
        this.edges.push({ from: to, to: from, weight }); // undirected
    }

    getNeighbors(id) {
        return this.edges
            .filter(e => e.from === id)
            .map(e => ({ id: e.to, weight: e.weight }));
    }
}
