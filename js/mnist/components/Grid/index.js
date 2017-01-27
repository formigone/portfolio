import React, { PropTypes } from 'react'

import css from './Grid.css';

let isMouseDown = false;

export const Grid = ({ cells, plot }) => (
  <table className={css.root}>
    <tbody>
    {cells.map((row, y) => (
      <tr key={`row-${y}`}>
        {row.map((col, x) => (
          <td key={`col-${x}`} className={col === 1 ? css.active : ''}
                onMouseDown={() => isMouseDown = true}
                onMouseUp={() => {
                  isMouseDown = false;
                  console.log('TODO: make prediction')
                }}
                onDoubleClick={() => {
                  plot(x, y, 0);
                  plot(x - 1, y, 0);
                  plot(x, y - 1, 0);
                  plot(x - 1, y - 1, 0);
                  plot(x + 1, y - 1, 0);
                  plot(x + 1, y, 0);
                  plot(x, y + 1, 0);
                  plot(x + 1, y + 1, 0);
                  plot(x - 1, y + 1, 0);
                }}
                onMouseMove={() => isMouseDown && plot(x, y, 1)}
                onClick={() => plot(x, y, 1)}
          />
        ))}
      </tr>
    ))}
    </tbody>
  </table>
);

Grid.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ),
  plot: PropTypes.func,
};

export default Grid;
