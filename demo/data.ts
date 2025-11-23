import { NodeData } from '../src/types';

function createNode(
  id: number,
  level: number,
  index: number,
  label: string,
  children: NodeData<{ label: string }>[] = []
): NodeData<{ label: string }> {
  return {
    id,
    x: 0,
    y: 0,
    level,
    index,
    hasChildren: children.length > 0,
    isExpanded: true,
    nodeInfo: { label },
    children,
  };
}

let idCounter = 1;

// Level 5: 100 nodes
const level5Nodes: NodeData<{ label: string }>[] = [];
for (let i = 0; i < 100; i++) {
  level5Nodes.push(createNode(idCounter++, 5, i, `L5 Staff ${i + 1}`));
}

// Level 4: 50 nodes. Distribute 100 children (2 per parent)
const level4Nodes: NodeData<{ label: string }>[] = [];
for (let i = 0; i < 50; i++) {
  const children = level5Nodes.slice(i * 2, (i + 1) * 2);
  level4Nodes.push(createNode(idCounter++, 4, i, `L4 Lead ${i + 1}`, children));
}

// Level 3: 20 nodes. Distribute 50 children.
// First 10 get 3 children (30), Next 10 get 2 children (20) -> Total 50
const level3Nodes: NodeData<{ label: string }>[] = [];
let l4Index = 0;
for (let i = 0; i < 20; i++) {
  const count = i < 10 ? 3 : 2;
  const children = level4Nodes.slice(l4Index, l4Index + count);
  l4Index += count;
  level3Nodes.push(createNode(idCounter++, 3, i, `L3 Manager ${i + 1}`, children));
}

// Level 2: 5 nodes. Distribute 20 children (4 per parent)
const level2Nodes: NodeData<{ label: string }>[] = [];
for (let i = 0; i < 5; i++) {
  const children = level3Nodes.slice(i * 4, (i + 1) * 4);
  level2Nodes.push(createNode(idCounter++, 2, i, `L2 Director ${i + 1}`, children));
}

// Level 1: 1 node. Distribute 5 children.
const level1Nodes: NodeData<{ label: string }>[] = [];
level1Nodes.push(createNode(idCounter++, 1, 0, `VP of Everything`, level2Nodes));

// Level 0: Root
export const sampleData = createNode(idCounter++, 0, 0, `CEO`, level1Nodes);
