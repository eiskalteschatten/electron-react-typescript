import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/MainLayout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
