import { ADD_COMMODITY, REDUCE_COMMODITY, ADD_SELECT, REDUCE_SELECT, SAVE_USER_INFO } from "../constants/home";

export const addCommodity = payload => {
  return {
    type: ADD_COMMODITY,
    payload
  };
};

export const reduceCommodity = payload => {
  return {
    type: REDUCE_COMMODITY,
    payload
  };
};

export const addSelect = payload => {
  return {
    type: ADD_SELECT,
    payload
  }
}


export const reduceSelect = payload => {
  return {
    type: REDUCE_SELECT,
    payload
  }
}

export const saveUserInfo = payload => {
  return {
    type: SAVE_USER_INFO,
    payload
  }
}