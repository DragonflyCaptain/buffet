import Taro, { Component, scanCode } from "@tarojs/taro";
import { View, Camera, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtNoticebar, AtList, AtListItem } from "taro-ui";
import "./index.less";

@connect(
  ({ addToCart }) => ({
    addToCart,
  }),
  (dispatch) => ({
    add(num) {
      dispatch(addSelect(num));
    },
    dec(num) {
      dispatch(reduceSelect(num));
    },
  })
)
class OrderPay extends Component {
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
    navigationBarTitleText: "确认订单",
  };

  goToAddressList = () => {
    Taro.navigateTo({
      url: `../Address/addressList`,
    });
  };

  renderSelectedCart = (data, img) => {
      console.log(data, '}}}}}}')
    return (
      data &&
      data.length &&
      data.map((item, index) => {
        if (item.selected === 0) return false;
        return (
          <View className="cartItem" key={item.id}>
            <View className="cartImgWarp">
              <View style={img}></View>
            </View>
            <View className="cartContent">
              <View>名称：{item.name}</View>
              <View>¥：{`${item.price * item.selected || item.price}`}</View>
            </View>
          </View>
        );
      })
    );
  };

  render() {
      console.log(this.props, '确认订单')
      const {addToCart:{cartSum}} = this.props
      const img = {
        width: "100%",
        height: "100%",
        "background-image": "url(https://source.unsplash.com/random)",
        "background-size": "100%",
        "background-repeat": "no-repeat",
      };
    return (
      <View>
        {/* <AtNoticebar close>疫情期间，请注意防护!</AtNoticebar> */}
        {/* <View className="address-warp" onClick={this.goToAddressList}>
          <Text>朱钰</Text>
          <Text className="mg-l">186****0423</Text>
          <View>湖北仙桃市通海口镇马套村十一组4号</View>
        </View> */}
        <View className="list">
        {this.renderSelectedCart(cartSum, img)}
        </View>
        <View className="pay-warp">
          <View className="pay-btn">微信支付</View>
        </View>
      </View>
    );
  }
}
export default OrderPay;
