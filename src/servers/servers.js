import HTTPREQUEST from "./http";
import { stringify } from "querystring";

export const getResultData_servers = (postData) => {
  return HTTPREQUEST.post("/api/white-screen/search", postData);
};

export const queryCommodity = async (params) => {
  const { data } = await axios.get(
    `/api/commodity/goods/conditions/query?${stringify(params)}`
  );
  return data;
};

export const createCommodity = async (params) => {
  const { data } = await axios.post("/api/commodity", params);
  return data;
};

export const updateGoods = async (query, params) => {
  const { data } = await axios.post(
    `/api/commodity/goods/conditions/update?${stringify(query)}`,
    params
  );
  return data;
};

export const deleteGood = async (query) => {
  const { data } = await axios.delete(
    `/api/commodity/goods/conditions/delete?${stringify(query)}`
  );
  return data;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 查询所有数据
export const getAllCommodityData_server = (getData) => {
  return HTTPREQUEST.get("/api/user");
};

// 录入数据 post
export const enterData_server = (params) => {
  return HTTPREQUEST.post("/api/commodity", params);
};

// 首页 点击分类去查询数据

export const clickTypeRequest = (params) => {
  return HTTPREQUEST.get(
    `/api/commodity/goods/conditions/query?${stringify(params)}`
  );
};

// 提交订单
export const submitOrder = (params) => {
  return HTTPREQUEST.post("/api/order", params);
};

// 查询订单(全部)
export const findOrder = (params) => {
  return HTTPREQUEST.get(`/api/order/find?${stringify(params)}`);
};

//查询订单（条件）
export const findOrderParams = (params) => {
  return HTTPREQUEST.get("/api/order/findType", params);
};

// 删除订单
export const deleteOrder = async (query) => {
  const { data } = await HTTPREQUEST.put(
    `/api/order/deleteOrder?${stringify(query)}`
  );
  return data;
};

// 查询条形码
export const scanning = (params, type) => {
  return HTTPREQUEST.scanningGet(`/barcode/barcode?barcode=${params}`, type);
};

// 查询条形码
export const scanningTwo = (params, type) => {
  return HTTPREQUEST.scanningGet(`/querybarcode?code=${params}`, type);
};
