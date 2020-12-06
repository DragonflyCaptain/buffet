import * as API from "../servers/servers";

import {
  CREATE_ORDER,
  DEL_ORDER,
  SAVE_ORDER_DATA,
  UPDATE_STATE,
} from "../constants/order";

export const getOrderData = (payload) => {
  return (dispatch) => {
    API.findOrder(payload)
      .then((res) => {
        dispatch({
          type: UPDATE_STATE,
          payload: {
            orderList: res.data,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteOrder = (payload) => {
  return (dispatch) => {
    API.deleteOrder(payload)
      .then((res) => {
        console.log(res, "删除成功了没有");
        API.findOrder({ enable: true })
          .then((result) => {
            dispatch({
              type: UPDATE_STATE,
              payload: {
                orderList: result.data,
                isDeleteTips: false,
              },
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

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

export const saveOrderData = (payload) => {
  return {
    type: SAVE_ORDER_DATA,
    payload,
  };
};
