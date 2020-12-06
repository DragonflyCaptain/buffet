import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import "./index.less";

export default class SuccessPage extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  config = {
    navigationBarTitleText: "",
  };

  goBack = () => {
    Taro.switchTab({
      url: "../Home/index",
    });
  };

  viewCurrentOrder = () => {};

  render() {
    return (
      <View className="payment-success">
        <AtIcon value="check-circle" size="30"></AtIcon>支付成功
        <View className="btn-group">
          <View onClick={this.goBack} className="go-back">
            返回首页
          </View>
          <View className="view-order">查看订单</View>
        </View>
      </View>
    );
  }
}
