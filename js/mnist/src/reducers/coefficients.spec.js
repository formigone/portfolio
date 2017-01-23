import { expect } from 'chai';
import { describe, it } from 'mocha';

import coefficients from './coefficients';
import * as actions from '../actions';

describe('coefficients reducer', () => {
  it('handles initial state', () => {
    const init = coefficients(undefined, {});

    expect(init).to.be.empty;
    expect(init).to.be.instanceOf(Array);
  });

  it('sets coefficients', () => {
    const weights = [1, 2, 3];
    const origWeights = coefficients(undefined, {});
    const state = coefficients(origWeights, actions.setWeights(weights));

    expect(state).to.not.be.equal(origWeights);
    expect(state).to.not.be.empty;
    expect(state).to.be.equal(weights);
  });
});
