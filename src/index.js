import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import store from './store';
import LoginContainer from './components/LoginContainer';

//  import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/styles/index.css';
// import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider store={ store }>
    {/* <BrowserRouter> */}
      <LoginContainer/>
    {/* </BrowserRouter> */}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
