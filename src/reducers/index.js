import { combineReducers } from 'redux'
import count from './count'
import addToCart from './home'

export default combineReducers({
  count,
  addToCart
})