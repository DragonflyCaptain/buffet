import { ADD_COMMODITY, REDUCE_COMMODITY } from "../constants/home";

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
