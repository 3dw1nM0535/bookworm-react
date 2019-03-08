import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import rootReducer from './reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import history from "./history";
import { fetchCurrentUserRequest, fetchCurrentUserSuccess } from "./actions/users";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk))
);

// Run saga
sagaMiddleware.run(saga);

if (localStorage.bookwormJWT) {
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(fetchCurrentUserRequest());
} else {
  store.dispatch(fetchCurrentUserSuccess({}));
}

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
