import { ADD_COMMODITY, REDUCE_COMMODITY } from "../constants/home";

const INITIAL_STATE = {
  cartSum: [],
  commodityList: {
    热搜推荐: [
      {
        url: "https://jdc.jd.com/img/200",
        name: "花露水",
        count: 100,
        id: Math.random(),
        price: 30,
        selected: 0
        
      },
      {
        url: "https://jdc.jd.com/img/200",
        name: "驱蚊片",
        count: 200,
        id: Math.random(),
        price: 30,
        selected: 0
      },
    ],
    个护清洁: [
      {
        url: "https://jdc.jd.com/img/200",
        name: "飘柔洗发露",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0
      },
      {
        url: "https://jdc.jd.com/img/200",
        name: "舒肤佳沐浴露",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0
      },
      {
        url: "https://jdc.jd.com/img/200",
        name: "舒肤佳香皂",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0
      },
    ],
    食品酒水: [
      {
        url: "https://jdc.jd.com/img/200",
        name: "老坛酸菜牛肉面",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0
      },
      {
        url: "https://jdc.jd.com/img/200",
        name: "红烧牛肉面",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0
      },
      {
        url: "https://jdc.jd.com/img/200",
        name: "汤达人泡面",
        count: 150,
        id: Math.random(),
        price: 30,
        selected: 0
      },
    ],
  }
}

const addData = (state, obj) => {
    let type = obj.type;
    let index = obj.index
    console.log(obj, 'addData')
    let newObj = state;
    newObj[type][index].selected += 1
    return newObj;
}

const reduceData = (state, obj) => {
    let type = obj.type;
    let index = obj.index
    console.log(obj, 'addData')
    let newObj = state;
    newObj[type][index].selected -= 1
    return newObj;
}

const renderCart = (data, obj) => {
    let item = obj.item
    if(!data.includes(item)){
        data.push(item)
    }
    return data
}


export default function addToCart (state = INITIAL_STATE, action) {
    console.log(action, 'action')
  switch (action.type) {
    case ADD_COMMODITY:
      return {
        ...state,
        commodityList: addData(state.commodityList, action.payload),
        cartSum: renderCart(state.cartSum, action.payload)
      }
    case REDUCE_COMMODITY:
      return {
        ...state,
        commodityList: reduceData(state.commodityList, action.payload)
      }
    default:
      return state
  }
}