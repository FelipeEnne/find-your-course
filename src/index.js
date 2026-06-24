import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';

import App from './components/App';
import store from './reducers/index';

const info = JSON.stringify({
  id: 0,
  name: '',
  email: '',
  favorite: '',
  remember: false,
});

if (localStorage.getItem('localUser') === null) {
  localStorage.setItem('localUser', info);
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
