import { combineReducers } from 'redux';
import { weeksReducer } from '../modules/weeksReducer';
import { eventsReducer } from '../modules/eventsReducer';

const rootReducer = combineReducers ({
  weeksReducer,
  eventsReducer
});

export default rootReducer;
