import { CREATE_ORDER, DEL_ORDER, SAVE_ORDER_DATA } from "../constants/order";

export const createOrder = (payload) => {
  return {
    type: CREATE_ORDER,
    payload,
  };
};

export const delOrder = (payload) => {
  return {
    type: DEL_ORDER,
    payload,
  };
};

export const saveOrderData = payload => {
  return {
    type: SAVE_ORDER_DATA,
    payload
  }
}
