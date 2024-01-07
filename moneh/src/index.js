"use client"
import { useEffect } from "react";
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './App.css';
import './modules/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

// CSS Modules
import './modules/styles/navbar.css';
import './modules/styles/table.css';
import './modules/styles/button.css';

// Pages
import Flow_Index from './pages/flow/index';
import StatsFlow_Index from "./pages/stats_flow";

export default function App() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/flow" element={<Flow_Index />}></Route>
          <Route path="/stats_flow" element={<StatsFlow_Index />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
