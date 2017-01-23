import { SET_WEIGHTS } from '../actions/types';

const initialState = [];

export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_WEIGHTS:
      return action.weights;
    default:
      return state;
  }
};
