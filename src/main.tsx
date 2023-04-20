import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './_redux/store';
import { Provider } from 'react-redux';

import './i18n';
import App from './App';
import 'antd/dist/reset.css';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
