import { combineReducers } from 'redux';

import grid from './grid';
import coefficients from './coefficients';
import prediction from './prediction';

const rootReducer = combineReducers({
  grid,
  prediction,
  coefficients,
});

export default rootReducer;
