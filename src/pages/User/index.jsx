import Taro, { Component, scanCode } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtAvatar } from "taro-ui";
import { getAllCommodityData_server } from '../../servers/servers'
import "./user.less";

const orderImg = require("../../assets/static/order.png");
const aboutImg = require("../../assets/static/About.png");
const scanning = require("../../assets/static/scaning.png");
@connect(
  ({ Home }) => ({ Home }),
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

  handleScanCode = async () => {
    Taro.navigateTo({
      url: '../Entry/index'
    })
  }

  render() {
    const { Home:{ userInfo }  } = this.props;
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
        <View className="order-warp" onClick={this.handleScanCode}>
          <Image src={scanning} className="order-img" />
          <Text className="text">录入</Text>
          <View className="arrow-right"></View>
        </View>
        <Button open-type='getUserInfo'  bindgetuserinfo='userinfo'>点击获取</Button>
      </View>
    );
  }
}

export default UserPage;
