import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state={
      typeContent: ''
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "首页",
  };

  render() {
    
    return (
      <View className="home">
          WuLiuPage
      </View>
    );
  }
}
