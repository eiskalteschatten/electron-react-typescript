import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { useAppDispatch } from './store/hooks';
import { setPrefersDarkMode } from './store/slices/appSlice';

import MainLayout from './components/layouts/MainLayout';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches));

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      dispatch(setPrefersDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches));
    });
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path='*' element={<MainLayout />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
