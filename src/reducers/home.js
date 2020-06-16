import {
  ADD_COMMODITY,
  REDUCE_COMMODITY,
  ADD_SELECT,
  REDUCE_SELECT,
  SAVE_USER_INFO,
} from "../constants/home";

const INITIAL_STATE = {
  cartSum: [],
  commodityList: {
    热搜推荐: [
      {
        url: "https://source.unsplash.com/random",
        name: "花露水",
        count: 100,
        id: Math.random(),
        price: 30,
        selected: 0,
      },
      {
        url: "https://source.unsplash.com/random",
        name: "驱蚊片",
        count: 200,
        id: Math.random(),
        price: 30,
        selected: 0,
      },
    ],
    个护清洁: [
      {
        url: "https://source.unsplash.com/random",
        name: "飘柔洗发露",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0,
      },
      {
        url: "https://source.unsplash.com/random",
        name: "舒肤佳沐浴露",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0,
      },
      {
        url: "https://source.unsplash.com/random",
        name: "舒肤佳香皂",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0,
      },
    ],
    食品酒水: [
      {
        url: "https://source.unsplash.com/random",
        name: "老坛酸菜牛肉面",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0,
      },
      {
        url: "https://source.unsplash.com/random",
        name: "红烧牛肉面",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0,
      },
      {
        url: "https://source.unsplash.com/random",
        name: "汤达人泡面",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0,
      },
    ],
  },
  userInfo: {},
};

const addData = (state, obj) => {
  let type = obj.type;
  let index = obj.index;
  console.log(obj, "addData");
  let newObj = state;
  newObj[type][index].selected += 1;
  return newObj;
};

const reduceData = (state, obj) => {
  let type = obj.type;
  let index = obj.index;
  console.log(obj, "addData");
  let newObj = state;
  newObj[type][index].selected -= 1;
  return newObj;
};

const renderCartAdd = (data, obj) => {
  let item = obj.item;
  console.log(item, "________");
  if (!data.includes(item)) {
    data.push(item);
  }
  return data;
};

const renderCartReduce = (data, obj) => {
  let item = obj.item;
  if (item.selected < 1) {
    data.forEach((val, index) => {
      if (val.name === item.name) {
        data.splice(index, 1);
      }
    });
  }
  return data;
};

const renderAddSelect = (data, obj) => {
  data.forEach((item) => {
    if (item.name === obj.name) {
      item.selected += 1;
    }
  });
  return data;
};

const renderReduceSelect = (data, obj) => {
  data.forEach((item, index) => {
    if (item.name === obj.name) {
      item.selected -= 1;
      if (item.selected < 1) {
        data.splice(index, 1);
      }
    }
  });
  return data;
};

export default function addToCart(state = INITIAL_STATE, action) {
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
    default:
      return state;
  }
}
