import { SEND_MSG, GET_MSG } from '../constants/message'

const INITIAL_STATE = {
    msgList : []
}

const concatMsg = (data, obj) => {
    let arr = [...data];
    arr.push(obj)
    data = arr;
    return data
}

export default function message ( state =  INITIAL_STATE, action) {
    switch (action.type) {
        case SEND_MSG:
            return {
                ...state,
                msgList: concatMsg(state.msgList, action.payload)
            }
        case GET_MSG:
            return {
                ...state
            }
        default:
            return state
    }
}