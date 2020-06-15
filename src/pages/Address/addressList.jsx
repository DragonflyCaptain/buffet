import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class AddressList extends Component {
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
    navigationBarTitleText: "收货地址",
  };

  render() {
    return (
      <View>
          收货地址列表
      </View>
    );
  }
}

