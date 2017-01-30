import React, { PropTypes } from 'react'

import css from './Prediction.css';

export const Prediction = ({ value, confidence }) => (
  <div className={css.root}>
    <h1 className={css.value}>{confidence < 0 ? '--' : value}</h1>
    {confidence >= 0 && (
      <p className={css.confidence}>Confidence: {confidence}%</p>
    )}
  </div>
);

Prediction.propTypes = {
  value: PropTypes.number,
  confidence: PropTypes.number,
};

export default Prediction;
