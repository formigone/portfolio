import { INIT_GRID, PLOT } from '../actions/types';
import { genArray } from '../util';

const initialState = [];

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INIT_GRID:
      return genArray(action.height, () => genArray(action.width, 255));
    case PLOT:
      const grid = [...state];
      grid[action.y][action.x] = action.value;
      return grid;
    default:
      return state;
  }
};
