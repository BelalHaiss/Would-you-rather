import alertReducer from './alertReducer.js';
import authReducer from './authReducer.js';
import questReducer from './questReducer.js';

import { combineReducers } from 'redux';
export default combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  quests: questReducer
});
