const getBaseUrl = (url, type) => {
  console.log('getBaseUrl', type)
    let BASE_URL = '';
    if (process.env.NODE_ENV === 'development') {
      //开发环境 - 根据请求不同返回不同的BASE_URL
      if (url.includes('/api/')) {
        BASE_URL = 'https://20180129.com'
        // BASE_URL = 'http://localhost:3001'
      } 
      // BASE_URL = type?'https://302301.market.alicloudapi.com':'https://20180129.com'
      // BASE_URL = type ? 'https://codequery.market.alicloudapi.com':'https://20180129.com'
      // else if (url.includes('/iatadatabase/')) {
      //   BASE_URL = ''
      // }
    } else {
      // 生产环境
      if (url.includes('/api/')) {
        BASE_URL = 'https://20180129.com'
      } 
      // else if (url.includes('/iatadatabase/')) {
      //   BASE_URL = ''
      // }
    }
    return BASE_URL
  }
  
  export default getBaseUrl;