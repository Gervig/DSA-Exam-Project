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
        this.endNode = null;
    }

    // Dijkstra's algorithm, with visualization steps
    runDijkstra(start, end) {
        this.resetState(); // clear any previous data
        this.endNode = end; // set new end node
        

        const pq = new PriorityQueue(); // initialize new min heap, priority queue

        // initialize
        this.graph.nodes.forEach(n => {
            this.dist[n.id] = Infinity; // set distances to infinity at the beginning
            this.prev[n.id] = null;
        });

        this.dist[start] = 0; // the distance to the start is always 0, we begin here
        pq.insert(start, 0);

        // visualization step of the algorithm for the UI
        this.steps.push({
            type: "init", // initial setup for psuedocode highlight
            dist: { ...this.dist }, // copies initial distances
            pq: [...pq.heap] // store min-heap (priority queue) in an array
        });

        // main loop, ends when there are no nodes left to explore
        while (!pq.isEmpty()) {
            const { node: u } = pq.extractMin(); // extract next node to explore
            if (this.visited.has(u)) continue; // skip if it has been visited

            this.visited.add(u); // mark node as visited

            // once the target has been reached, we can stop
            if (u === end) {
                this.steps.push({
                    type: "target_reached", // event type for the UI
                    u,
                    dist: { ...this.dist },
                    prev: { ...this.prev }
                });
                break;
            }

            // relax all neighbours of u node
            for (const { id: v, weight } of this.graph.getNeighbors(u)) {
                const alt = this.dist[u] + weight;
                if (alt < this.dist[v]) {
                    this.dist[v] = alt;
                    this.prev[v] = u;
                    pq.decreaseKey(v, alt);
                    pq.insert(v, alt);
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

        this.steps.push({
            type: "done",
            dist: this.dist,
            prev: this.prev
        });
    }

    /** Build the final path by backtracking prev[] */
    reconstructPath() {
        const path = [];
        let curr = this.endNode;

        while (curr !== null) {
            path.push(curr);
            curr = this.prev[curr];
        }

        return path.reverse();
    }
}
