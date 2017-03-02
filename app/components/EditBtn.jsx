import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { submitEdit } from '../madlibs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

require('./App.scss');

const EditBtn = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
  },
  submitEdit(event) {
    event.preventDefault();
    this.props.dispatch(submitEdit(
      {
        showEdit: true,
      }
    ));
  },
  render() {
    return (
      <MuiThemeProvider>
        <div
          className="btn"
          onClick= {() => {
            this.submitEdit(event);
          }}
        >
        Edit
        </div>
      </MuiThemeProvider>
    );
  },
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(EditBtn);
