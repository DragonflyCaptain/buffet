import { CARTREDUCE, CARTADD } from '../constants/cart'

const INITIAL_STATE = {

}

export default function cart ( state =  INITIAL_STATE, action) {
    switch (action.type) {
        case CARTADD:
            return {
                ...state
            }
        case CARTREDUCE:
            return {
                ...state
            }
        default:
            return state
    }
}