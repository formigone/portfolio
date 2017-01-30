import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import * as Actions from '../actions';
import Grid from '../components/Grid';
import Prediction from '../components/Prediction';

const Mnist = ({ grid, plot, predict, prediction }) => (
  <div className="mnist">
    <Grid cells={grid} plot={plot} predict={predict} />
    <Prediction {...prediction} />
  </div>
);

Mnist.propTypes = {
};

const mapStateToProps = (state) => ({
  grid: state.grid,
  prediction: state.prediction,
});

const mapDispatchToProps = (dispatch) => ({
  plot: (x, y, value) => {
    dispatch(Actions.plot(x, y, value));
  },
  predict: (cells) => {
    dispatch(Actions.predict(cells));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Mnist);
