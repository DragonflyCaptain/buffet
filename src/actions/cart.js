import { CARTADD, CARTREDUCE } from "../constants/cart";

export const cartAdd = payload => {
  return {
    type: CARTADD,
    payload
  };
};

export const cartReduce = payload => {
  return {
    type: CARTREDUCE,
    payload
  };
};
