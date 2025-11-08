import React from 'react';
import ReactDOM from 'react-dom/client';
import TrangChuWeb from './JSX/TRANG/TrangChuWebsite.jsx';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { UIProvider } from "./REDUCER/TrangChuWeb";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UIProvider>
      <BrowserRouter>
        <TrangChuWeb />
      </BrowserRouter>
    </UIProvider>
  </React.StrictMode>
);

reportWebVitals();
