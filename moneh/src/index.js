"use client"
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import "@fontsource/poppins"; 
import "@fontsource/poppins/400.css"; 
import "@fontsource/poppins/500.css"; 
import "@fontsource/poppins/600.css"; 
import "@fontsource/poppins/700.css"; 
import "@fontsource/poppins/800.css"; 
import "@fontsource/poppins/900.css"; 
import "@fontsource/lexend"; 
import "@fontsource/lexend/400.css"; 
import "@fontsource/lexend/500.css"; 
import "@fontsource/lexend/600.css"; 
import "@fontsource/lexend/700.css"; 
import "@fontsource/lexend/800.css"; 
import "@fontsource/lexend/900.css"; 
import './design_tokens/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css'

// CSS Modules
import './design_tokens/navbar.css';
import './design_tokens/table.css';
import './design_tokens/button.css';
import './design_tokens/typography.css';
import './design_tokens/modal.css';
import './design_tokens/form.css';

// Pages
import FlowIndex from './pages/flow/index';
import StatsFlowIndex from "./pages/stats_flow";
import StatsOtherIndex from "./pages/stats_other";
import AboutIndex from "./pages/about";
import PocketIndex from "./pages/pocket";
import StatsPocketIndex from "./pages/stats_pocket";
import StatsWishlistIndex from "./pages/stats_wishlist";
import WishlistIndex from "./pages/wishlist";
import HomeIndex from "./pages/home";
import DashboardIndex from "./pages/dashboard";
import CalendarIndex from "./pages/calendar";
import LoginIndex from "./pages/login";
import { ToastContainer } from "react-toastify";

export default function App() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeIndex />}></Route>
          <Route path="/login" element={<LoginIndex />}></Route>
          <Route path="/calendar" element={<CalendarIndex />}></Route>
          <Route path="/dashboard" element={<DashboardIndex />}></Route>
          <Route path="/flow" element={<FlowIndex />}></Route>
          <Route path="/pocket" element={<PocketIndex />}></Route>
          <Route path="/wishlist" element={<WishlistIndex />}></Route>
          <Route path="/stats_flow" element={<StatsFlowIndex />}></Route>
          <Route path="/stats_pocket" element={<StatsPocketIndex />}></Route>
          <Route path="/stats_wishlist" element={<StatsWishlistIndex />}></Route>
          <Route path="/stats_others" element={<StatsOtherIndex />}></Route>
          <Route path="/about" element={<AboutIndex />}></Route>
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

reportWebVitals();
