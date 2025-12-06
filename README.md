<div align="center">
<h1>DSA Exam Project</h1>
EK Exam project for DSA 2025 by Casper Gervig
</div>

<div align="center">
  <img src="images/screenshot.png" alt="App screenshot" width="70%">
</div>

## Short explanation of the project

This project is an interactive visual tool that shows how the Dijkstra algorithm finds the shortest route between two points. You can choose two nodes, and the program animates the steps the algorithm goes through, explaining each decision it makes. It’s basically a way to watch the computer ‘think’ as it figures out the best path.

## Link for deployed version

https://gervig.github.io/DSA-Exam-Project/

## Algorithms and data structures

### Algorithm
The algorithm used for this project is **Dijkstra's algorithm** for finding the shortest path from a start node to an end node in a graph.

### Data structures

#### Graph
The graph is represented with nodes (each marked with a letter), edges (lines between the nodes) and weights (values for the lines).

#### Binary heap
Dijkstra's algorithm has a priority queue for selecting the next closest node, for this purose a min-heap was chosen.

#### Set
For tracking which nodes have been visited a set was used.

## Tables
For tracking shortest known distances and the previously visited node (the path), tables were used for this purpose.

## Running it locally
To run the application locally follow these steps: 

1) Clone the repository to your device from Github.
2) Open the project in Visual Studio Code.
3) Download the Live Server extension for Visual Code.
4) In the bottom right corner of Visual Studio code, click "Go Live".
5) Your default browser will now open a locally hosted version of the application.
