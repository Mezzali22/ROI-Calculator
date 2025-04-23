import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROICalculator from './ROICalculator';
import LogisticsPage from './LogisticsPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ROICalculator />} />
      <Route path="/logistics" element={<LogisticsPage />} />
    </Routes>
  </BrowserRouter>
);
