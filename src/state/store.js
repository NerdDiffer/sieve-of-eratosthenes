import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const getInitialState = () => ({
  foo: {
    bar: true
  }
});

const store = createStore(
  reducers,
  getInitialState(),
  composeEnhancer(
    applyMiddleware()
  )
);

export default store;
