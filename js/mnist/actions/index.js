import * as types from './types';
import { genAction } from '../util';

export const initGrid = (width, height, value = 255) => genAction(types.INIT_GRID, { width, height, value });
export const plot = (x, y, value) => genAction(types.PLOT, { x, y, value });
export const setWeights = (weights) => genAction(types.SET_WEIGHTS, { weights });
