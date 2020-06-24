import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

import App from './components/App';
import store from './reducers/index';

// const info = JSON.stringify({
//   id: 0,
//   name: '',
//   email: '',
//   favorite: '',
//   remember: false,
// });

// localStorage.setItem('localUser', info);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
