import React, { PropTypes } from 'react'

export const Counter = ({ value }) => (
  <p>{ value }</p>
);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Counter;