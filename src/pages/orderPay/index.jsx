import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import "./index.less";
import { resetCart } from "../../actions/home";

@connect(
  ({ addToCart }) => ({
    addToCart,
  }),
  (dispatch) => ({
    resetCart(payload) {
      dispatch(resetCart(payload))
    }
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

  payment = () => {
    // Taro.atMessage({
    //   message: 'hhhhh',
    //   type: 'success'
    // })
    Taro.showLoading({
      title: 'loading',
      mask: true
    })
    setTimeout(()=>{
      Taro.hideLoading()
      this.props.resetCart()
      Taro.navigateBack({ delta: 2 })
    }, 2000)

  }

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

        {/* <AtMessage /> */}


        {/* <AtNoticebar close>疫情期间，请注意防护!</AtNoticebar> */}
        {/* <View className="address-warp" onClick={this.goToAddressList}>
          <Text>朱钰</Text>
          <Text className="mg-l">186****0423</Text>
          <View>湖北仙桃市通海口镇马套村十一组4号</View>
        </View> */}
        <View className="list">
        {this.renderSelectedCart(cartSum, img)}
        </View>
        <View className="pay-warp" onClick={ this.payment }>
          <View className="pay-btn">微信支付</View>
        </View>
      </View>
    );
  }
}
export default OrderPay;
