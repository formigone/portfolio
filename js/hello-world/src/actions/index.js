import * as types from './types';

/**
 *
 * @param {string} type
 * @param {Object} data
 */
const gen = (type, data) => ({
  ...data,
  type
});

export const incBy = (value) => gen(types.INC_BY, { value });
