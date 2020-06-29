import HTTPREQUEST from "./http";
import { stringify } from 'querystring'


export const getResultData_servers = (postData) => {
  return HTTPREQUEST.post('/api/white-screen/search', postData)
}

// 查询所有数据
export const getAllCommodityData_server = ( getData ) => {
  return HTTPREQUEST.get('/api/user')
}

// 录入数据 post
 export const enterData_server = (params) => {
  return HTTPREQUEST.post('/api/commodity', params)
 }

 // 首页 点击分类去查询数据

export const clickTypeRequest = (params) => {
  return HTTPREQUEST.get(`/api/commodity/field/?${stringify(params)}`)
}

// 提交订单
export const submitOrder = params => {
  return HTTPREQUEST.post('/api/order', params)
}

// 查询订单(全部)
export const findOrder = () => {
  return HTTPREQUEST.get('/api/order/find')
}

//查询订单（条件）
export const findOrderParams = (params) => {
  return HTTPREQUEST.get('/api/order/findType', params)
}