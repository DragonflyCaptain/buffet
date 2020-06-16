import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class About extends Component {
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
    navigationBarTitleText: "关于我们",
  };

  render() {
    return (
      <View>
          关于我们
      </View>
    );
  }
}

