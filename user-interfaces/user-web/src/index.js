import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';

const element = (
  <Router>
    <App />
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);