import { ADD, MINUS } from '../constants/count'

const INITIAL_STATE = {
  num: 0
}

export default function count (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + action.payload
      }
    case MINUS:
      return {
        ...state,
        num: state.num - action.payload
      }
    default:
      return state
  }
}