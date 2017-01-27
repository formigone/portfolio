import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import * as Actions from '../actions';
import Grid from '../components/Grid';
import Prediction from '../components/Prediction';

const Mnist = ({ grid, plot, prediction }) => (
  <div className="mnist">
    <Grid cells={grid} plot={plot} />
    <Prediction {...prediction} />
  </div>
);

Mnist.propTypes = {
};

const mapStateToProps = (state) => ({
  grid: state.grid,
  prediction: state.prediction || { value: '--', confidence: 100 },
});

const mapDispatchToProps = (dispatch) => ({
  plot: (x, y, value) => {
    dispatch(Actions.plot(x, y, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Mnist);
