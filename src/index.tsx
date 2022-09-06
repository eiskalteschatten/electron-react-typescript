import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './i18n';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import './eventsFromMain';

import './assets/css/reboot.css';
import './scss/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
