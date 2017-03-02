import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { submitField, submitEssay } from '../madlibs';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    // console.log(key, this.refs[key].value);
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
    // console.log('Submitting Essay', key);
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
      <MuiThemeProvider>
        <div className="container">
          <div className="row white card">
            <div className="col s12 m6  blue-grey lighten-5">
              <div className="matchArea row">
                <form ref="madLibEssay" className="col 12">
                <h5>About me</h5>
                <Divider />
                { this.props.fieldOrder.map((key) => (
                  <div key={key}>
                    <label htmlFor={key}>{this.props.fields[key]}</label>
                    <input
                      defaultValue = ""
                      id={key}
                      onKeyDown= {this.handleKeyDown}
                      className= "form-input white card"
                      ref= {key}
                      name= {key}
                      type= "text"
                      onBlur= {() => {
                        this.submitForm(event, key);
                      }}
                    />
                  </div>
                ))}
                </form>
              </div>
            </div>
            <div className="col s12 m6">
              <h5>Your essay text</h5>
              <Divider />
              <div id="demo">
              </div>
            </div>
          </div>
        </div>

      </MuiThemeProvider>
    );
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
