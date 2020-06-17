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
        <View>
          <Text>
            1. 且将新火试新茶，诗酒趁年华。——苏轼《望江南·超然台上作》
          </Text><br/>
          
        </View>
        <Text>
            意为：姑且点上新火来烹煮一杯刚采的新茶，作诗醉酒都要趁年华尚在啊。
          </Text>
      </View>
    );
  }
}

