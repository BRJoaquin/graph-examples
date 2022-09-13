import '/styles/style.css'
import ForceGraph3D from "3d-force-graph";
import * as dat from 'dat.gui';

type Link = {
  source: number;
  target: number;
  value?: number;
};


function generateGraph(V: number, load: number) {
  const links: Link[] = [];

  for (let i = 0; i < V; i++) {
    for (let j = i + 1; j < V; j++) {
      if(Math.random() < load) {
        links.push({
          source: i,
          target: j,
          value: Math.round(Math.random() * 10)
        })
      }
    }
  }
  return {
    nodes: [...Array(V).keys()].map((i) => ({ id: i, selected: 1 })),
    links
  };
}

const distance = 200;
const Graph = ForceGraph3D()
  (document.getElementById('graph-density')!)
  .graphData(generateGraph(10, 0.05))
  .nodeLabel('id')
  .nodeAutoColorBy('group')
  .linkThreeObjectExtend(true)
  .cameraPosition({ z: distance })
  .backgroundColor("#121212")
  
// Spread nodes a little wider
Graph.d3Force('charge')?.strength(-120);


const Settings = function() {
  this.V = 10;
  this.load = 5;
};
const settings = new Settings();
const gui : any = new dat.GUI();

gui.add(settings, 'load', 0, 100).onChange((value: number) => {
  Graph.graphData(generateGraph(Math.floor(settings.V), settings.load/100));
});

gui.add(settings, 'V', 1, 100).onChange((value: number) => {
  Graph.graphData(generateGraph(Math.floor(settings.V), settings.load/100));
});

