import React, { PropTypes } from 'react'

import css from './Grid.css';

let isMouseDown = false;
/** @type {HTMLTableElement} table */
let table = null;

export const Grid = ({ cells, plot, predict }) => (
  <table className={css.root} ref={el => table = el}>
    <tbody>
    {cells.map((row, y) => (
      <tr key={`row-${y}`}>
        {row.map((col, x) => (
          <td key={`col-${x}`} className={col === 1 ? css.active : ''}
              onTouchMove={({ touches }) => {
                const { clientX: x, clientY: y } = touches[0];
                const { offsetWidth: width, offsetHeight: height } = table.querySelector('td');
                plot(Math.floor(x / width), Math.floor(y / height), 1);
              }}
              onMouseDown={() => isMouseDown = true}
              onMouseUp={() => {
                isMouseDown = false;
                setTimeout(() => {
                  predict(cells);
                }, 0);
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
                predict(cells);
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
  predict: PropTypes.func,
};

export default Grid;
