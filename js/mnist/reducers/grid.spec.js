import { expect } from 'chai';
import { describe, it } from 'mocha';

import grid from './grid';
import * as actions from '../actions';

describe('grid reducer', () => {
  it('handles initial state', () => {
    const init = grid(undefined, {});
    expect(init).to.be.empty;
    expect(init).to.be.instanceOf(Array);
  });

  it('initiates grid to some MxN matrix', () => {
    const width = 10;
    const height = 10;
    const state = grid(undefined, actions.initGrid(width, height));

    expect(state).to.not.be.empty;
    expect(state).to.be.instanceOf(Array);
    expect(state).to.have.length(height);
    for (let y = 0; y < height; y++) {
      expect(state[y]).to.have.length(width);
    }
  });

  it('plots some (x, y) point', () => {
    const x = 1;
    const y = 1;
    const value = 100;
    const origGrid = grid(undefined, actions.initGrid(10, 10));
    const state = grid(origGrid, actions.plot(x, y, value));

    expect(state).to.not.be.equal(origGrid);
    expect(state[y][x]).to.be.equal(value);
  });
});
