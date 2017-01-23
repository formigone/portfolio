import * as types from './types';
import { genAction } from '../util';

export const initGrid = (width, height) => genAction(types.INIT_GRID, { width, height });
export const plot = (x, y, value) => genAction(types.PLOT, { x, y, value });
export const setWeights = (weights) => genAction(types.SET_WEIGHTS, { weights });
