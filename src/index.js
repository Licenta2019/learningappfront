import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import store from './store';
import App from './components/App';

//  import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/styles/index.css';
import { BrowserRouter } from 'react-router-dom';

// import { addLocaleData } from "react-intl";
// import locale_en from 'react-intl/locale-data/en';
// import locale_ro from 'react-intl/locale-data/ro';

// addLocaleData([...locale_en, ...locale_ro]);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
