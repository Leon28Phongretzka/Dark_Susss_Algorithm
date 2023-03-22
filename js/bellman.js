const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Graph{
    constructor() {
        this.nodes = new Set();
        this.edges = new Map();
    }

    addNode(node) {
        this.nodes.add(node);
        this.edges.set(node, new Map());
    }

    addEdge(node1, node2, weight) {
        this.edges.get(node1).set(node2, weight);
        this.edges.get(node2).set(node1, weight);
    }
    print() {
        for (let node of this.nodes) {
            let neighbors = this.edges.get(node);
            let result = "";
            for (let neighbor of neighbors) {
                result += neighbor[0] + " " + neighbor[1] + " ";
            }
            console.log(node + " => " + result);
        }
    }
    // Bellman-Ford algorithm to find minimum value path from source to all other nodes
    bellmanFord(source){
        let distance = new Map();
        let predecessor = new Map();
        // Set all distances to infinity and all predecessors to null
        for(let node of this.nodes){
            distance.set(node, Infinity);
            predecessor.set(node, null);
        }
        // Set distance of source to 0
        distance.set(source, 0);
        // Relax all edges |V|-1 times
        for(let node of this.nodes){
            for(let neighbor of this.edges.get(node).keys()){
                let alt = distance.get(node) + this.edges.get(node).get(neighbor);
                if(alt < distance.get(neighbor)){
                    distance.set(neighbor, alt);
                    predecessor.set(neighbor, node);
                }
            }
        }
        return {distance, predecessor};
    }
}

let graph = new Graph();
// node from readline
rl.on('line', (line) => {
    let input = line.split(' ');
    if(input[0] == 'V')
    {
        for(let i = 1; i < input.length; i++){
            graph.addNode(input[i]);
        }
    }
    else if(input[0] == 'E'){
        let input = line.split(' ');
        for(let i = 1; i < input.length; i++){
            let edge = input[i].split(',');
            graph.addEdge(edge[0], edge[1], parseInt(edge[2]));
        }
    }
    else if(input[0] == 's'){
        let result = graph.bellmanFord(input[1]);
        console.log(result);
    }

});

// Input
// V a b c d e
// E a,b,6 a,c,7 b,c,8 b,d,5 c,d,11 c,e,9 d,e,-10
// s a

// Output
// { distance: Map { 'a' => 0, 'b' => 6, 'c' => 7, 'd' => 11, 'e' => 16 },
//     predecessor: Map { 'a' => null, 'b' => 'a', 'c' => 'a', 'd' => 'b', 'e' => 'c' } }

// How to use this code?
// I have two ways to use this code. One from my github and another from ideone.com

// From my github:
// You can find this .js file from the below link:
// Link:
// After that you can clone this file to your PC and run it from your terminal/.
// Turn on the terminal and use 'node bellman.js' command to run the code.
// After that you can implement code from the example input there.

// From ideone.com:
// You can find this code from the below link:
// Link: https://ideone.com/J1mbdl
// After that, choose Node.js and enter the stdin and click on run button.
