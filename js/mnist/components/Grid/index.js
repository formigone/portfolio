import React, { PropTypes } from 'react'

import css from './Grid.css';

export const Grid = ({ cells }) => (
  <div className={css.root}>
    {cells.map((row, y) => (
      <p key={`row-${y}`}>
        {row.map((col, x) => (
          <span key={`col-${x}`}>[{x}, {y}]</span>
        ))}
      </p>
    ))}
  </div>
);

Grid.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ),
};

export default Grid;
