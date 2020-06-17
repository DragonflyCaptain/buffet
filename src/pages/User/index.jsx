import Taro, { Component, scanCode } from "@tarojs/taro";
import { View, Camera, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtList, AtListItem, AtAvatar } from "taro-ui";
import "./user.less";

const orderImg = require("../../assets/static/order.png");
const aboutImg = require("../../assets/static/About.png");
@connect(
  ({ addToCart }) => ({ addToCart }),
  (dispatch) => ({})
)
class UserPage extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "我的",
  };

  goToAbout = () => {
    Taro.navigateTo({
      url: `../About/about`,
    });
  }

  goToOrder = () => {
    Taro.navigateTo({
      url: `../Order/order`,
    });
  }

  render() {
    const { addToCart:{ userInfo }  } = this.props;
    const { avatarUrl, nickName } = userInfo;
    return (
      <View className="user-warp">
        <View className="info-warp">
          <AtAvatar className="user-avatar" image={`${avatarUrl || 'https://jdc.jd.com/img/200'}`}></AtAvatar>
          <Text className="user-name">{nickName}</Text>
        </View>
        <View className="order-warp" onClick={this.goToOrder}>
          <Image src={orderImg} className="order-img" />
          <Text className="text">我的订单</Text>
          <View className="arrow-right"></View>
        </View>
        <View className="order-warp" onClick={this.goToAbout}>
          <Image src={aboutImg} className="order-img" />
          <Text className="text">关于我们</Text>
          <View className="arrow-right"></View>
        </View>
        <View className="zw">

        </View>
      </View>
    );
  }
}

export default UserPage;
