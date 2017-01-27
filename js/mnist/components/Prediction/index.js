import React, { PropTypes } from 'react'

import css from './Prediction.css';

export const Prediction = ({ value, confidence }) => (
  <div className={css.root}>
    <h1 className={css.value}>{value}</h1>
    <p className={css.confidence}>Confidence: {confidence}%</p>
  </div>
);

Prediction.propTypes = {
  value: PropTypes.string,
  confidence: PropTypes.number,
};

export default Prediction;
