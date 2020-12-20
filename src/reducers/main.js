import * as ACTION from "../constants/home";

const INITALSTATE = {
  goodType: [],
  goodList: {},
  userInfo: {},
  cartList: [],
  alreadyClickType: [],
};

export default function main(state = INITALSTATE, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION.UPDATE_STATE:
      return Object.assign({}, state, payload);
    // case
    default:
      break;
  }
}
