export const graph = {
  nodes: [
    { id: "A", x: 100, y: 100 },
    { id: "B", x: 300, y: 200 },
    { id: "C", x: 500, y: 100 },
    { id: "D", x: 500, y: 300 },
  ],
  edges: [
    { from: "A", to: "B", weight: 2 },
    { from: "A", to: "C", weight: 4 },
    { from: "B", to: "C", weight: 1 },
    { from: "B", to: "D", weight: 7 },
    { from: "C", to: "D", weight: 3 }
  ]
};
