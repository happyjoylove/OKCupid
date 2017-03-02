import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment, submitField, submitEssay } from '../madlibs';


require('./App.scss');

const App = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
    fieldOrder: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    value: PropTypes.string,
  },
  submitForm(e, key) {
    e.preventDefault();
    console.log(key, this.refs[key].value);
    if (this.refs[key].value.length > 0) {
      this.props.dispatch(submitField(
        {
          id: key,
          answer: this.refs[key].value,
        }
      ));
      this.submitText(key);
    }
    // console.log('next state', store.getState());
  },
  submitText(key) {
    console.log('Submitting Essay', key);
    this.props.dispatch(submitEssay(
      {
        id: key,
        answer: this.refs[key].value,
      }
    ));
    // console.log('next state', store.getState());
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
          <form ref="madLibEssay" onSubmit={this.submitForm}>
          { this.props.fieldOrder.map((key) => (
            <div>
              <label htmlFor={key}>{this.props.fields[key]}</label>
              <input
                defaultValue = ""
                id={key}
                onKeyDown= {this.handleKeyDown}
                className= "form-input"
                ref= {key}
                name= {key}
                type= "text"
                onBlur= {() => {
                  this.submitForm(event, key);
                }}
              />
            </div>
          ))}
          <button >
            submit
          </button>
          </form>
        </div>
    );
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
