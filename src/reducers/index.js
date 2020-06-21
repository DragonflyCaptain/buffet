import { combineReducers } from 'redux'
import count from './count';
import Home from './home';
import cart from './cart';

export default combineReducers({
  count,
  Home,
  cart
})