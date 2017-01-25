import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as Actions from '../actions';
import Counter from '../components/Counter';

console.log('actions', Actions);

const Mnist = ({ value, actions }) => {
  let input = null;
  return (
    <div className="mnist">
      <h1>MNIST</h1>
      <Counter value={value} />
      <p>Adder: <input ref={ref => input = ref} defaultValue="1" /></p>
      <button onClick={() => {
        console.log('click', input.value, actions);
        actions.incBy(input.value)
      }}>INC BY</button>
    </div>
  );
};

Mnist.propTypes = {
  value: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  value: Number(state.counter) || 0,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mnist);
