import App from './app';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import React from "react";
import '../src/styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>
);

reportWebVitals();
