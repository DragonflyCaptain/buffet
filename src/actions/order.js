import { CREATE_ORDER, DEL_ORDER } from "../constants/order";

export const createOrder = payload => {
  return {
    type: CREATE_ORDER,
    payload
  };
};

export const delOrder = payload => {
    return {
      type: DEL_ORDER,
      payload
    };
  };