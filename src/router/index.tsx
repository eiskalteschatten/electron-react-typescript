import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../components/layouts/MainLayout';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='*' element={<MainLayout />} />
    </Routes>
  );
};

export default Router;
