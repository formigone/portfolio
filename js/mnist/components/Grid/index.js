import React, { PropTypes } from 'react'

import css from './Grid.css';

let isMouseDown = false;

export const Grid = ({ cells, plot }) => (
  <div className={css.root}>
    {cells.map((row, y) => (
      <p key={`row-${y}`}>
        {row.map((col, x) => (
          <span key={`col-${x}`} style={{background: `rgb(${col}, ${col}, ${col})`}}
                onMouseDown={() => (isMouseDown = true)} onMouseUp={() => (isMouseDown = false)}
                onDoubleClick={() => {
                  plot(x, y, 255);
                  plot(x - 1, y, 255);
                  plot(x, y - 1, 255);
                  plot(x - 1, y - 1, 255);
                  plot(x + 1, y - 1, 255);
                  plot(x + 1, y, 255);
                  plot(x, y + 1, 255);
                  plot(x + 1, y + 1, 255);
                  plot(x - 1, y + 1, 255);
                }}
                onMouseMove={() => (isMouseDown && plot(x, y, 0))}
          />
        ))}
      </p>
    ))}
  </div>
);

Grid.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ),
  plot: PropTypes.func,
};

export default Grid;
