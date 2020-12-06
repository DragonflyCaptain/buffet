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
} from "../constants/home";

function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower)) + lower;
}

const INITIAL_STATE = {
  cartSum: [],
  commodityList: {},
  userInfo: {},
};

const addData = (state, obj) => {
  let type = obj.type;
  let index = obj.index;
  let newObj = state;
  newObj[type][index].selected += 1;
  return newObj;
};

const reduceData = (data, obj) => {
  const { type, index } = obj;
  let newObj = data;
  newObj[type][index].selected -= 1;
  return newObj;
};

const renderCartAdd = (data, obj) => {
  let item = obj.item;
  if (!data.includes(item)) {
    data.push(item);
  }
  return data;
};

const renderCartReduce = (data, obj) => {
  let item = obj.item;
  if (item.selected < 1) {
    data.forEach((val, index) => {
      if (val.title === obj.name) {
        data.splice(index, 1);
      }
    });
  }
  return data;
};

const renderAddSelect = (data, obj) => {
  data.forEach((item) => {
    if (item.title === obj.name) {
      item.selected += 1;
    }
  });
  return data;
};

const renderReduceSelect = (data, obj) => {
  data.forEach((item, index) => {
    if (item.title === obj.name) {
      item.selected -= 1;
      if (item.selected < 1) {
        data.splice(index, 1);
      }
    }
  });
  return data;
};

// 每次点击每次存放
const saveTypeData = (commodityList, obj) => {
  const { text, data } = obj;
  let newObj = commodityList;
  if (data.length) {
    newObj[text] = data;
    return newObj;
  }
  return newObj;
};

const handleResetCount = (obj) => {
  Object.keys(obj).forEach((item) => {
    obj[item].forEach((val) => {
      val.selected = 0;
    });
  });
  return obj;
};

export default function Home(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_COMMODITY:
      return {
        ...state,
        commodityList: addData(state.commodityList, action.payload),
        cartSum: renderCartAdd(state.cartSum, action.payload),
      };
    case REDUCE_COMMODITY:
      return {
        ...state,
        commodityList: reduceData(state.commodityList, action.payload),
        cartSum: renderCartReduce(state.cartSum, action.payload),
      };
    case ADD_SELECT:
      return {
        ...state,
        cartSum: renderAddSelect(state.cartSum, action.payload),
      };
    case REDUCE_SELECT:
      return {
        ...state,
        cartSum: renderReduceSelect(state.cartSum, action.payload),
      };
    case SAVE_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case RESET_CART:
      return {
        ...state,
        cartSum: [],
      };
    case SAVE_TYPE_DATA:
      return {
        ...state,
        commodityList: saveTypeData(state.commodityList, action.payload),
      };
    case RESET_SELECTED:
      return {
        ...state,
        commodityList: handleResetCount(state.commodityList),
      };
    default:
      return state;
  }
}
