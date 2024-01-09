import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/index.css'
import { Provider } from 'react-redux';
import { setupStore } from './lib/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
