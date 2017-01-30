import * as types from './types';
import { genAction } from '../util';

export const initGrid = (width, height, value = 0) => genAction(types.INIT_GRID, { width, height, value });
export const plot = (x, y, value) => genAction(types.PLOT, { x, y, value });
export const predict = (cells) => genAction(types.PREDICT, { cells });
export const setWeights = (weights) => genAction(types.SET_WEIGHTS, { weights });
