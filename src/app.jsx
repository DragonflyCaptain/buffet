import Taro, { Component } from "@tarojs/taro";
import { Provider } from '@tarojs/redux'
import Index from "./pages/index";
import configStore from './store'

import "./app.less";
import 'taro-ui/dist/style/index.scss'

const store = configStore()

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: [
      'pages/Home/index',
      'pages/Cart/index',
      'pages/User/index',
      'pages/commodityDetail/index',
      'pages/orderPay/index',
      'pages/Address/addressList',
      'pages/Address/editAddress',
      'pages/About/about',
      'pages/Order/order'

    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
    },
    tabBar: {
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/Home/index",
          iconPath: "./assets/tab-bar/home.png",
          selectedIconPath: "./assets/tab-bar/homed.png",
          text: "首页",
        },{
          pagePath: "pages/Cart/index",
          iconPath: "./assets/tab-bar/cart.png",
          selectedIconPath: "./assets/tab-bar/carted.png",
          text: "购物车"
        },{
          pagePath: "pages/User/index",
          iconPath: "./assets/tab-bar/user.png",
          selectedIconPath: "./assets/tab-bar/userd.png",
          text: "我的",
        }
      ],
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
