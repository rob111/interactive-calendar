import { combineReducers } from 'redux';
import { weeksReducer } from '../modules/weeksReducer';

const rootReducer = combineReducers ({
  weeksReducer
});

export default rootReducer;
