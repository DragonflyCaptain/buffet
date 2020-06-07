import { ADD, MINUS } from "../constants/count";

export const add = payload => {
  return {
    type: ADD,
    payload
  };
};
export const minus = payload => {
  return {
    type: MINUS,
    payload
  };
};

// 异步的 action
export function asyncAdd() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add());
    }, 2000);
  };
}
