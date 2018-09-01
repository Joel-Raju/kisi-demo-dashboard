import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore() {
  const middleware = [
    thunk,
  ];

  return createStore(
    rootReducer,
    compose(applyMiddleware(...middleware)),
  );
}
