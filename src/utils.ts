import { NodeData } from './types';

export function flattenTree<T>(root: NodeData<T>): Record<number, NodeData<T>> {
  const map: Record<number, NodeData<T>> = {};
  
  function traverse(node: NodeData<T>) {
    map[node.id] = node;
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  traverse(root);
  return map;
}

export function getChildrenIds<T>(node: NodeData<T>): number[] {
  return node.children?.map(child => child.id) || [];
}
