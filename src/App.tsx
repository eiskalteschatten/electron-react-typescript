import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';

import { useAppDispatch } from './store/hooks';
import { setPrefersDarkMode } from './store/entities/app';

import Router from './router';

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
      <Router />
    </HashRouter>
  );
};

export default App;
