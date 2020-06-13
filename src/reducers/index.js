import { combineReducers } from 'redux'
import count from './count';
import addToCart from './home';
import cart from './cart';

export default combineReducers({
  count,
  addToCart,
  cart
})