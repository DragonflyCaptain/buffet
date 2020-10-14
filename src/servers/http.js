import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'
import { ALAppCode } from '../utils/basicConfig';

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class httpRequest {
  
  baseOptions(params, method = "GET") {
    let { url, data } = params;
    const BASE_URL = getBaseUrl(url);
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        'Authorization': Taro.getStorageSync('Authorization')
      }
    };
    return Taro.request(option);
  }

  baseOptionsForScan(params, method = "GET") {
    let { url, data } = params;
    const BASE_URL = 'https://codequery.market.alicloudapi.com';
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        'Authorization': `APPCODE ${ALAppCode}`
      }
    };
    return Taro.request(option);
  }

  get(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }

  scanningGet(url, data = "") {
    let option = { url, data };
    return this.baseOptionsForScan(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }

}

export default new httpRequest()