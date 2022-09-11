import '/styles/style.css'
import ForceGraph3D from "3d-force-graph";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="3d-graph">
`

type Link = {
  source: number;
  target: number;
  value?: number;
};

const V = 300;
const load = (Math.round(Math.random() * 2) + 1) / V;
const links: Link[] = [];

for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++) {
        if(Math.random() < load) {
            links.push({
                source: i,
                target: j,
                value: Math.round(Math.random() * 10)
            })
        }
    }
}
console.log(links)
const gData = {
  nodes: [...Array(V).keys()].map((i) => ({ id: i, selected: 1 })),
  links
};
let selectedNodes = new Set();
const Graph = ForceGraph3D()(document.getElementById("3d-graph")!)
  .graphData(gData)
  .linkDirectionalArrowLength(3.5)
  .linkDirectionalArrowRelPos(1)
  .linkCurvature(0)
  .nodeColor(node=> selectedNodes.has(node) ? 'red' : 'yellow')
  .enableNodeDrag(false)
  .onNodeClick((node) => {
    selectedNodes.has(node) ? selectedNodes.delete(node) : selectedNodes.add(node)
    Graph.nodeColor(Graph.nodeColor()); // update color of selected nodes
  })
  
  
// distance beteween link reperesent the cost to go
Graph.d3Force('link')?.distance((link : any )=> link.value);

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
