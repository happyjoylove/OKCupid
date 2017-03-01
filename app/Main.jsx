import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './madlibs';

import App from './components/App.jsx';

const store = createStore(reducer);
console.log('initial state', store.getState());
// store.dispatch({
//   type: submi,
//   payload: {
//     id: '1',
//     answer: 'hello',
//   },
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);
