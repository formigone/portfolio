import React, { PropTypes } from 'react'

import css from './Counter.css';

export const Counter = ({ value }) => (
  <p className={css.root}>{ value }</p>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Counter;
