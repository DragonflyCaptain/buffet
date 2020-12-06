import {
  ADD_COMMODITY,
  REDUCE_COMMODITY,
  ADD_SELECT,
  REDUCE_SELECT,
  SAVE_USER_INFO,
  RESET_CART,
  SAVE_TYPE_DATA,
  CACHE_TYPE,
  RESET_SELECTED,
  GET_GOODS_DATA,
  UPDATE_STATE,
} from "../constants/home";
import * as api from "../servers/servers";

export const getFitrstTimeData = (payload) => {
  return (dispatch) => {
    api.clickTypeRequest({ category: payload }).then((res) => {
      dispatch({
        type: GET_GOODS_DATA,
        payload: res.data,
      });
    });
  };
};

export const updateState = (payload) => {
  return {
    type: UPDATE_STATE,
    payload,
  };
};

export const addCommodity = (payload) => {
  return {
    type: ADD_COMMODITY,
    payload,
  };
};

export const reduceCommodity = (payload) => {
  return {
    type: REDUCE_COMMODITY,
    payload,
  };
};

export const addSelect = (payload) => {
  return {
    type: ADD_SELECT,
    payload,
  };
};

export const reduceSelect = (payload) => {
  return {
    type: REDUCE_SELECT,
    payload,
  };
};

export const saveUserInfo = (payload) => {
  return {
    type: SAVE_USER_INFO,
    payload,
  };
};

export const resetCart = (payload) => {
  return {
    type: RESET_CART,
    payload,
  };
};

export const saveTypeData = (payload) => {
  return {
    type: SAVE_TYPE_DATA,
    payload,
  };
};

export const cacheType = (payload) => {
  return {
    type: CACHE_TYPE,
    payload,
  };
};

export const resetSelected = (payload) => {
  return {
    type: RESET_SELECTED,
    payload,
  };
};
