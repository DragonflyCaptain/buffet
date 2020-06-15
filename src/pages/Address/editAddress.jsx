import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class EditAddress extends Component {
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
    navigationBarTitleText: "编辑收货地址",
  };

  render() {
    return (
      <View>
          编辑收货地址
      </View>
    );
  }
}

