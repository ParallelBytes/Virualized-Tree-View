import React from 'react';
import ReactDOM from 'react-dom/client';
import { OrgChartTree } from '../src/OrgChartTree';
import { sampleData } from './data';

const App = () => {
  return (
    <OrgChartTree
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
