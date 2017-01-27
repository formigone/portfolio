import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Mnist from './containers/Mnist';
import reducer from './reducers';
import { genGrid } from './util';

import css from './app.css';

const WIDTH = 28;
const HEIGHT = 28;
const store = createStore(reducer, { grid: genGrid(WIDTH, HEIGHT, 0) });

render(
  <div className={css.root}>
    <Provider store={store}>
      <Mnist />
    </Provider>
  </div>,
  document.getElementById('mnist-container')
);
