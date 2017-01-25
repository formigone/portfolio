import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as Actions from '../actions';
import Grid from '../components/Grid';

const Mnist = ({ grid }) => (
  <div className="mnist">
    <Grid cells={grid} />
  </div>
);

Mnist.propTypes = {
};

const mapStateToProps = (state) => ({
  grid: state.grid,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mnist);
