import { CREATE_ORDER, DEL_ORDER } from "../constants/order";

const INITIAL_STATE = {
  orderList: [],
};

const handleCreateOrder = (oldData, newData) => {
  oldData.push(newData)
  return oldData
};

export default function Order(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        orderList: handleCreateOrder(state.orderList, action.payload)
      };
    case DEL_ORDER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
