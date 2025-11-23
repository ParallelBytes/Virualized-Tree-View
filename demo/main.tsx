import React from 'react';
import ReactDOM from 'react-dom/client';
import { VirtualizedTree } from '../src/VirtualizedTree';
import { sampleData } from './data';

const App = () => {
  return (
    <VirtualizedTree
      data={sampleData}
      onNodeClick={(node) => console.log('Clicked:', node)}
    />
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
