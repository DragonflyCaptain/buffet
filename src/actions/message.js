import { SEND_MSG, GET_MSG } from '../constants/message'

export const sendMsg = payload => {
    return {
        type: SEND_MSG,
        payload
    }
}

export const getMsg = payload => {
    return {
        type: GET_MSG,
        payload
    }
}
