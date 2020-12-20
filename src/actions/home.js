import Taro, { Component } from "@tarojs/taro";
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
  HANDLE_GOODS_DATA,
  LOAD_MORE_GOODS,
} from "../constants/home";
import * as api from "../servers/servers";

// 查询商品列表
export const getGoodsList = (payload) => {
  return (dispatch) => {
    api
      .clickTypeRequest(payload.params)
      .then((res) => {
        console.log(res, "result");
        dispatch({
          type: HANDLE_GOODS_DATA,
          payload: {
            type: payload.type,
            data: res.data,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

// 条件查询商品
export const getSearchValueData = (payload) => {
  return (dispatch) => {
    api.clickTypeRequest(payload).then((res) => {
      dispatch({
        type: UPDATE_STATE,
        payload: {
          searchResultData: res.data,
        },
      });
    });
  };
};

// 付款
export const submitOrder = (payload) => {
  return async (dispatch) => {
    Taro.showLoading({
      title: "付款中",
      mask: true,
    });
    const res = await api.submitOrder(payload);
    console.log(res, "fukuan");
    if (res && res.code === 0) {
      Taro.hideLoading();
      dispatch({
        type: RESET_CART,
      });
    } else {
      Taro.hideLoading();
    }
  };
};

// 读取更多
export const loadMoreGoods = (type, params) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_STATE,
      payload: {
        loadMore: "loading",
      },
    });
    const res = await api.clickTypeRequest(params);
    if (res && res.code === 0) {
      dispatch({
        type: LOAD_MORE_GOODS,
        payload: {
          type,
          data: res.data,
        },
      });
      if (!res.data.length || res.data.length < 10) {
        dispatch({
          type: UPDATE_STATE,
          payload: {
            loadMore: "noMore",
          },
        });
      } else {
        dispatch({
          type: UPDATE_STATE,
          payload: {
            loadMore: "more",
          },
        });
      }
    } else {
      console.log("请求错误!");
      dispatch({
        type: UPDATE_STATE,
        payload: {
          loadMore: "more",
        },
      });
    }
  };
};

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
