import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Mnist from './containers/Mnist';
import reducer from './reducers';
import { genGrid } from './util';

const WIDTH = 28;
const HEIGHT = 28;
const store = createStore(reducer, { grid: genGrid(WIDTH, HEIGHT, 255)});

render(
  <Provider store={store}>
    <Mnist />
  </Provider>,
  document.getElementById('mnist-container')
);
