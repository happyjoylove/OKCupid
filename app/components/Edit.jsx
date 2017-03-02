import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { submitStartOver } from '../madlibs';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

require('./App.scss');

const Edit = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    essayText: PropTypes.string.isRequired,
  },
  showProps() {
    return (this.props.essayText);
  },
  startOver(event) {
    event.preventDefault();
    this.props.dispatch(submitStartOver(
      {
        flush: true,
      }
    ));
  },
  render() {
    return (
      <MuiThemeProvider>
        <div className="container" id="demo">
          <div className="row white cardpanel">
            <div className="col col s8 offset-s2 m6 offset-m3 center-align  blue-grey lighten-5">
              <h5>Your essay text</h5>
              <textarea
                className="materialize-textarea  "
                value= {this.showProps().replace(/<(?:.|\n)*?>/gm, '')}
              />
              <div className="row">
                <div className="col s12 left-align">
                  <div
                    className="btn "
                    onClick= {() => {
                      this.startOver(event);
                    }}
                  >
                    Start Over
                  </div>
                </div>
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

export default connect(mapStateToProps)(Edit);
