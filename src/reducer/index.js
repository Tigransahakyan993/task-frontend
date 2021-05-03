import {combineReducers} from "redux";
import auth from './auth/auth';
import user from './users';
import restaurant from './restaurant';
import products from './products';

export default combineReducers({
  auth,
  restaurant,
  products,
  user
})