import React from 'react';
import ReactDOM from 'react-dom/client';
import TrangChuWeb from './JSX/TRANG/TrangChuWebsite.jsx';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UIProvider } from "./REDUCER/TrangChuWeb";
import TrangChuAdmin from '../src/JSX/TRANG/TrangChuAdmin.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UIProvider>
      <BrowserRouter>
        <Routes>
          {/* Trang chủ website */}
          <Route path="/*" element={<TrangChuWeb />} />

          {/* Trang admin */}
          <Route path="/admin/*" element={<TrangChuAdmin />} />
        </Routes>
      </BrowserRouter>
    </UIProvider>
  </React.StrictMode>
);

reportWebVitals();
