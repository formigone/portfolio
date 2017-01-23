import { expect } from 'chai';
import { describe, it } from 'mocha';

import counter from './counter';
import * as actions from '../actions';

describe('couter reducer', () => {
  it('handles initial state', () => {
    expect(
      counter(undefined, {})
    ).to.equal(0);
  });

  it('increments by { value }', () => {
    const cases = [
      { init: 0, value: 1, exp: 1 },
      { init: 0, value: -1, exp: -1 },
      { init: 10, value: 2, exp: 12 },
      { init: -10, value: 2, exp: -8 },
    ];

    cases.forEach(({ init, value, exp }) => {
      expect(
        counter(init, actions.incBy(value))
      ).to.equal(exp);
    });
  });

  it('casts numeric { value } to number', () => {
    expect(
      counter(0, actions.incBy('42'))
    ).to.equal(42);
  });

  it('treats non-numeric { value } as zero', () => {
    const cases = [
      { init: 0, value: 'one', exp: 0 },
      { init: 42, value: 'one', exp: 42 },
    ];

    cases.forEach(({ init, value, exp }) => {
      expect(
        counter(init, actions.incBy(value))
      ).to.equal(exp);
    });
  });
});
