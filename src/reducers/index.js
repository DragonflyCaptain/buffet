import { combineReducers } from 'redux'
import Home from './home';
import cart from './cart';
import Order from './order';
import message from './message'

export default combineReducers({
  Home,
  cart,
  Order,
  message
})