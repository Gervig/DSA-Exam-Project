import PriorityQueue from "../data-structures/priorityQueue.js";

export default class Model {
    constructor(graph) {
        this.graph = graph;
        this.resetState();
    }

    resetState() {
        this.dist = {};
        this.prev = {};
        this.visited = new Set();
        this.steps = [];
        this.finished = false;
    }

    runDijkstra(start) {
        this.resetState();
        const pq = new PriorityQueue();

        // init distances
        this.graph.nodes.forEach(n => {
            this.dist[n.id] = Infinity;
            this.prev[n.id] = null;
        });

        this.dist[start] = 0;
        pq.insert(start, 0);

        this.steps.push({
            type: "init",
            dist: { ...this.dist },
            pq: [...pq.heap]
        });

        while (!pq.isEmpty()) {
            const { node: u } = pq.extractMin();

            if (this.visited.has(u)) continue;

            this.visited.add(u);

            const neighbors = this.graph.getNeighbors(u);

            for (const { id: v, weight } of neighbors) {
                let alt = this.dist[u] + weight;

                if (alt < this.dist[v]) {
                    this.dist[v] = alt;
                    this.prev[v] = u;
                    pq.decreaseKey(v, alt);
                    pq.insert(v, alt); // insert if not present
                }

                this.steps.push({
                    type: "relax",
                    u, v,
                    dist: { ...this.dist },
                    prev: { ...this.prev },
                    pq: [...pq.heap]
                });
            }

            this.steps.push({
                type: "visit",
                u,
                visited: new Set(this.visited),
                dist: { ...this.dist },
                pq: [...pq.heap]
            });
        }

        this.steps.push({ type: "done", dist: this.dist, prev: this.prev });
    }
}
