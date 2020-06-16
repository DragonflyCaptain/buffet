import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "我的订单",
  };

  render() {
    return (
      <View>
          我的订单
      </View>
    );
  }
}

