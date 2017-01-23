import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import css from './app.css';
import Mnist from './containers/Mnist';
import reducer from './reducers';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Mnist />
  </Provider>,
  document.getElementById('container')
);
