import {
  CREATE_ORDER,
  DEL_ORDER,
  SAVE_ORDER_DATA,
  UPDATE_STATE,
} from "../constants/order";

const INITIAL_STATE = {
  orderList: [],
  isDeleteTips: false,
};

const handleCreateOrder = (oldData, newData) => {
  oldData.push(newData);
  return oldData;
};

export default function Order(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        orderList: handleCreateOrder(state.orderList, action.payload),
      };
    case DEL_ORDER:
      return {
        ...state,
      };
    case SAVE_ORDER_DATA:
      return {
        ...state,
        orderList: action.payload,
      };
    case UPDATE_STATE:
      console.log(action.payload, "|||||||");
      // return {
      //   ...state,
      //   orderList: action.payload,
      // };
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
