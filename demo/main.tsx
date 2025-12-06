import React from 'react';
import ReactDOM from 'react-dom/client';
import { VirtualizedTree } from '../src/VirtualizedTree';
import { NodeData } from '../src/types';

function generateStaticTreeData(): NodeData<{ label: string }> {
  let idCounter = 0;

  // Level 1: Root node
  const root: NodeData<{ label: string }> = {
    id: idCounter++,
    x: 0,
    y: 0,
    level: 0,
    index: 0,
    hasChildren: true,
    isExpanded: true,
    nodeInfo: { label: 'Root' },
    children: [],
  };

  // Level 3: 10,000 nodes (shared children for all Level 2 nodes)
  const level3Nodes = Array.from({ length: 10000 }, (_, i) => ({
    id: idCounter++,
    x: 0,
    y: 0,
    level: 2,
    index: i,
    hasChildren: false,
    isExpanded: false,
    nodeInfo: { label: `L3-${i + 1}` },
    children: [],
  }));

  // Level 2: 10,000 nodes (each references the same level3Nodes array)
  const level2Nodes = Array.from({ length: 10000 }, (_, i) => ({
    id: idCounter++,
    x: 0,
    y: 0,
    level: 1,
    index: i,
    hasChildren: true,
    isExpanded: false,
    nodeInfo: { label: `L2-${i + 1}` },
    children: level3Nodes,
  }));

  root.children = level2Nodes;

  return root;
}

const App = () => {
  const treeData = React.useMemo(() => generateStaticTreeData(), []);
  const actualNodesCreated = 20001; 
  const virtualTotalNodes = 100010001; 

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'row' }}>
      {/* Sidebar Panel */}
      <div style={{
        width: '280px',
        padding: '24px',
        background: '#f8f9fa',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        color: '#2c3e50',
        overflowY: 'auto',
      }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: '22px', 
          fontWeight: '600',
          letterSpacing: '-0.5px',
          color: '#2c3e50',
        }}>
          React Virtualized Tree
        </h2>

        {/* Tree Statistics */}
        <div style={{ 
          padding: '16px',
          background: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{ 
            fontSize: '13px', 
            fontWeight: '600', 
            color: '#2c3e50',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Tree Statistics
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '8px',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <span style={{ fontSize: '14px', color: '#6c757d' }}>Nodes Created:</span>
            <span style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              color: '#2c3e50',
              fontFamily: 'monospace',
            }}>
              {actualNodesCreated.toLocaleString()}
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '8px',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <span style={{ fontSize: '14px', color: '#6c757d' }}>Virtual Total:</span>
            <span style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#6c757d',
              fontFamily: 'monospace',
            }}>
              {virtualTotalNodes.toLocaleString()}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#6c757d' }}>Level 1:</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#2c3e50' }}>1</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#6c757d' }}>Level 2:</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#2c3e50' }}>10,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#6c757d' }}>Level 3:</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#2c3e50' }}>100,000,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tree Visualization */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <VirtualizedTree
          data={treeData}
          onNodeClick={(node) => console.log('Clicked:', node)}
        />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
