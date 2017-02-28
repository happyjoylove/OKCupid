import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment } from '../madlibs';


require('./App.scss');

const App = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
    fieldOrder: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
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
          { this.props.fieldOrder.map((key, index) => (
            <div>
              <label>{this.props.fields[key]}</label>
              <input
                className="'blurry_form"
                id={index}
                onKeyDown= {this.handleKeyDown}
                className= "form-input"
                ref= "title"
                type= "textarea"
                data-autosize-input= '{ "space": 40 }'
                onBlur= {event => {
                  // title.onBlur(event);
                  this.props.dispatch(increment(event));
                }}
              />
            </div>
          ))}
        </div>
    );
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
