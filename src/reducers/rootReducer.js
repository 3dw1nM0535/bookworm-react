import { combineReducers } from 'redux';

import user from './user';
import characters from './characters';
import formErrors from "./formErrors";

export default combineReducers({
  user,
  formErrors,
  characters,
});
