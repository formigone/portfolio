import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import HelloWorld from './containers/HelloWorld';
import reducer from './reducers';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <HelloWorld />
  </Provider>,
  document.getElementById('hello-world-container')
);
