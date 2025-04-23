import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ROICalculator from './ROICalculator';
import LogisticsPage from './LogisticsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ROICalculator />} />
      <Route path="/logistics" element={<LogisticsPage />} />
    </Routes>
  </BrowserRouter>
);
