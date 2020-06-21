import {
  ADD_COMMODITY,
  REDUCE_COMMODITY,
  ADD_SELECT,
  REDUCE_SELECT,
  SAVE_USER_INFO,
  RESET_CART,
  SAVE_TYPE_DATA
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
  console.log(obj, "addData");
  let newObj = state;
  newObj[type][index].selected += 1;
  return newObj;
};

const reduceData = (data, obj) => {
  const { type, index} = obj;
  console.log(obj, "reduceData");
  let newObj = data;
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
  console.log(obj, '|||||')
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
const saveTypeData = (commodityList, obj) =>{
  const {text, data} = obj;
  let newObj = commodityList;
  if(data.length){
    newObj[text] = data;
    return newObj
  }
  return newObj
}

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
        }
      };
    case SAVE_TYPE_DATA: 
      return {
        ...state,
        commodityList: saveTypeData(state.commodityList, action.payload)
      }
    default:
      return state;
  }
}
