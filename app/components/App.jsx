import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment } from '../madlibs';

require('./App.scss');

const App = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
  },

  render() {
    return (
        <div className="matchArea">
          <p>Counter (to make sure redux works): {this.props.counter}</p>

          <p>
            <button onClick={() => this.props.dispatch(increment())}>
              Increment
            </button>
          </p>
        </div>
    );
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
