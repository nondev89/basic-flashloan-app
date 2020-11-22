import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './Reducers'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas/index';

const sagaMiddleware = createSagaMiddleware();
let store = compose(
  applyMiddleware(sagaMiddleware)
)(createStore)(rootReducer);
if (process.env.REACT_APP_ENV === "DEV") {
  store = compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore)(rootReducer);
}


sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
