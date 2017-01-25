import { combineReducers } from 'redux'

import grid from './grid'
import coefficients from './coefficients'

const rootReducer = combineReducers({
  grid,
  coefficients,
});

export default rootReducer;
