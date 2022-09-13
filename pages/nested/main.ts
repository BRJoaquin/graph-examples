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

const V = 30;
const load = 0.06;
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

const distance = 400;

const Graph = ForceGraph3D()(document.getElementById("3d-graph")!)
  .graphData(gData)
  .linkCurvature(0)
  .linkWidth(1.5)
  .enableNodeDrag(false)
  .enableNavigationControls(false)
  .showNavInfo(false)
  .cameraPosition({ z: distance })
  .backgroundColor("#121212")
  
// distance beteween link reperesent the cost to go
// Graph.d3Force('link')?.distance((link : any )=> link.value);

let angle = 0;
setInterval(() => {
  Graph.cameraPosition({
    x: distance * Math.sin(angle),
    z: distance * Math.cos(angle)
  });
  angle += Math.PI / 1000;
}, 10);
