import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import * as Actions from '../actions';
import Grid from '../components/Grid';

const Mnist = ({ grid, plot }) => (
  <div className="mnist">
    <Grid cells={grid} plot={plot}/>
  </div>
);

Mnist.propTypes = {
};

const mapStateToProps = (state) => ({
  grid: state.grid,
});

const mapDispatchToProps = (dispatch) => ({
  plot: (x, y, value) => {
    dispatch(Actions.plot(x, y, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Mnist);
