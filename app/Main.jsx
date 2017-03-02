import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './madlibs';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import AppBar from 'material-ui/AppBar';
// import { List } from 'material-ui/List';
// import Divider from 'material-ui/Divider';
import App from './components/App.jsx';
import Edit from './components/Edit.jsx';
import EditBtn from './components/EditBtn.jsx';

const store = createStore(reducer);
// console.log('initial state', store.getState());
window.store = store;
store.subscribe(() => {
  // console.log(store.getState());
  const newstate = store.getState();
  // console.log(newstate.fieldOrder.length + ' -- ' + Object.keys(newstate.essayList).length);
  const essayLength = Object.keys(newstate.essayList).length;
  document.getElementById('demo').innerHTML = `
    <div class="row"><div class="col s12">${newstate.essayText}</div></div>
    `;
  if (newstate.flushed !== true) {
    if (newstate.fieldOrder.length === essayLength) {
      ReactDOM.render(
        <Provider store={store}>
          <EditBtn />
        </Provider>
        ,
        document.getElementById('demo').appendChild(document.createElement('div'))
      );
      if (newstate.showEdit === true) {
        ReactDOM.render(
          <Provider store={store}>
            <Edit />
          </Provider>
          ,
        document.getElementById('matchApp')
        );
      }
    }
  } else {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
      ,
    document.getElementById('matchApp')
    );
  }
});

ReactDOM.render(
  <Provider store={store}>
    <div id="matchApp">
      <App />
    </div>
  </Provider>
,
  document.body.appendChild(document.createElement('div'))
);
