import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!); // The '!' tells TypeScript we're sure this exists

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);