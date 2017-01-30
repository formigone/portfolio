import { PREDICT } from '../actions/types';

export default function counter(state = predict(null), action) {
  switch (action.type) {
    case PREDICT:
      return predict(action.cells);
    default:
      return state;
  }
};

const predict = (cells = []) => {
  let prediction = {
    value: 0,
    confidence: -1,
  };

  if (!(cells instanceof Array)) {
    return prediction;
  }

  prediction.value = cells.reduce((acc, row) => {
    return acc + row.reduce((acc, cell) => {
        return acc + cell;
      }, 0);
  }, 0);
  if (prediction.value > 0) {
    prediction.confidence = Number(Number(1 / prediction.value * 100).toFixed(2));
  }

  return prediction;
};
