import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import getRed from './reducers/get';

const preload = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
document.getElementById('init').remove();

const store = createStore(getRed, preload);
hydrate (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);