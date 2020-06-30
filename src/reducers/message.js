import { SEND_MSG, GET_MSG } from "../constants/message";

const INITIAL_STATE = {
  msgList: [
    {
      text: "用户一的消息",
      Marking: 1,
      id: Math.random(),
      url: 'https://source.unsplash.com/random'
    },{
        text: "其他用户消息",
        Marking: 2,
        id: Math.random(),
        url: 'https://source.unsplash.com/random'
    },
  ],
};

const concatMsg = (data, obj) => {
  let arr = [...data];
  arr.push(obj);
  data = arr;
  return data;
};

export default function message(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_MSG:
      return {
        ...state,
        msgList: concatMsg(state.msgList, action.payload),
      };
    case GET_MSG:
      return {
        ...state,
      };
    default:
      return state;
  }
}
