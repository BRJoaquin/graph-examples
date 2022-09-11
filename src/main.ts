import './style.css'
import ForceGraph3D from "3d-force-graph";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="3d-graph">
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`

const V = 100;
const links = [...Array(V).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id-1)),
          value: Math.round(Math.random() * 8) + 2
        }))

// console.log(links)
const gData = {
  nodes: [...Array(V).keys()].map((i) => ({ id: i, selected: 1 })),
  links
};
let selectedNodes = new Set();
const dDiv = document.getElementById('3d-graph')!;
const Graph = ForceGraph3D()(dDiv)
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
Graph.d3Force('link')?.distance((link:any) => link.value);

// fit the graph in the div
// Graph.zoomToFit(400)

// Graph.backgroundColor('');
Graph.linkWidth(3);
Graph.linkDirectionalArrowLength(9.5);
