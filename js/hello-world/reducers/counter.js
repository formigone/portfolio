import { INC_BY } from '../actions/types';

const initialState = 0;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INC_BY:
      return state + (Number(action.value) || 0);
    default:
      return state;
  }
};
