import { combineReducers } from 'redux';
import lockReducer from './lockReducer';

const rootReducer = combineReducers({
  lockReducer,
});

export default rootReducer;