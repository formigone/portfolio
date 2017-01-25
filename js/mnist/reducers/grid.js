import { INIT_GRID, PLOT } from '../actions/types';
import { genGrid } from '../util';

const initialState = [];

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INIT_GRID:
      return genGrid(action.width, action.height, action.value);
    case PLOT:
      const grid = [...state];
      grid[action.y][action.x] = action.value;
      return grid;
    default:
      return state;
  }
};
