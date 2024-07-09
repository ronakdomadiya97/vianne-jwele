// reducers.js
import { combineReducers } from 'redux';
import blogReducer from './reducer/blogReducer';
import contactUsReducer from './reducer/contactUsReducer';
import homeReducer from './reducer/homeReducer';

const rootReducer = combineReducers({
  home:homeReducer,
  blog:blogReducer,
  contactUs: contactUsReducer
  // Add other reducers here
});

export default rootReducer;
