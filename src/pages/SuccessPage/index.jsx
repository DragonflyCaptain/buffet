import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";

export default class SuccessPage extends Component {
  constructor() {
    super(...arguments);
    this.state = {
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  config = {
    navigationBarTitleText: "测试页3222面"
  };

  goBack = () => {
    Taro.switchTab({
      url: "../Home/index",
    });
  };

  viewCurrentOrder = () => {
    console.log("查看当前订单");
  };

  render() {
    return (
      <View>
        <Button onClick={this.goBack}>返回首页</Button>
        <Button>查看订单</Button>
      </View>
    );
  }
}
