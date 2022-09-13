import '/styles/style.css'
import ForceGraph3D from "3d-force-graph";
import SpriteText from 'three-spritetext';
import * as dat from 'dat.gui';

type Link = {
  source: number;
  target: number;
  value?: number;
};

const V = 10;
const load = 0.5;
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
const gData = {
  nodes: [...Array(V).keys()].map((i) => ({ id: i, selected: 1 })),
  links
};

const distance = 200;
const Graph = ForceGraph3D()
  (document.getElementById('graph-types')!)
  .graphData(gData)
  .nodeLabel('id')
  .nodeAutoColorBy('group')
  .linkThreeObjectExtend(true)
  .cameraPosition({ z: distance })
  .backgroundColor("#121212")

// Spread nodes a little wider
Graph.d3Force('charge')?.strength(-120);


const Settings = function() {
  this.directed = false;
  this.weighted = false;
};
const settings = new Settings();
const gui : any = new dat.GUI();

gui.add(settings, 'directed', true).onChange((value: boolean) => {
  Graph.linkDirectionalArrowLength(value ? 6 : 0).linkDirectionalArrowRelPos(1);
});

gui.add(settings, 'weighted', true).onChange((value: boolean) => {
  Graph.linkThreeObject(link => {
    // extend link with text sprite
    const sprite = new SpriteText(value ? `${link.value}` : '');
    sprite.color = 'lightgrey';
    sprite.textHeight = 3.5;
    return sprite;
  }).linkPositionUpdate((sprite, { start, end }) => {
    const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
      [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
    })));
    // Position sprite
    Object.assign(sprite.position, middlePos);
  });
});
