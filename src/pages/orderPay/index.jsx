import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtModal } from "taro-ui";
import "./index.less";
import { resetCart, resetSelected, submitOrder } from "../../actions/home";
import { createOrder } from "../../actions/order";
import * as api from "../../servers/servers";

@connect(
  ({ Home, Order }) => ({
    Home,
    Order,
  }),
  (dispatch) => ({
    resetCart(payload) {
      dispatch(resetCart(payload));
    },
    resetSelected(payload) {
      dispatch(resetSelected(payload));
    },
    createOrder(payload) {
      dispatch(createOrder(payload));
    },
  })
)
class OrderPay extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      isShow: false,
      sum: 0,
    };
  }

  componentWillMount() {}

  componentDidMount() {
    const { sum } = this.$router.params;
    this.setState({
      sum,
    });
  }

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
    return (
      data &&
      data.length &&
      data.map((item, index) => {
        if (item.selected === 0) return false;
        return (
          <View className="cartItem" key={item.id}>
            <View className="cartImgWarp">
              <Image src={item.url} style={img} />
            </View>
            <View className="cartContent">
              <View>名称：{item.title}</View>
              <View>¥：{`${item.price * item.selected || item.price}`}</View>
              <View>数量：{item.selected}</View>
            </View>
          </View>
        );
      })
    );
  };

  payment = () => {
    const {
      Home: { cartList, userInfo },
      dispatch,
    } = this.props;
    const { sum } = this.state;
    let obj = {
      userInfo,
      productList: cartList,
      phoneNum: "8008208820",
      address: "测试地址",
      consignee: "测试收货人平小北",
      priceTotal: sum,
      remarks: "",
      status: "1", // 0：代付款  1：已完成  2：已取消
      payMethod: "0", // 0: 微信支付  1： 支付宝
      productTotal: cartList.length,
    };

    dispatch(submitOrder(obj));
    // this.setState({
    //   isShow: true,
    // });
  };

  handleCancel = () => {
    this.setState({
      isShow: false,
    });
  };

  handleConfirm = async () => {
    const {
      Home: { cartList, userInfo },
      dispatch,
    } = this.props;
    const { sum } = this.state;
    let obj = {
      userInfo,
      productList: cartList,
      phoneNum: "8008208820",
      address: "测试地址",
      consignee: "测试收货人平小北",
      priceTotal: sum,
      remarks: "",
      status: "1", // 0：代付款  1：已完成  2：已取消
      payMethod: "0", // 0: 微信支付  1： 支付宝
      productTotal: cartList.length,
    };
    dispatch(submitOrder(obj));
  };

  render() {
    const {
      Home: { cartSum },
      Order,
    } = this.props;
    const { isShow, sum } = this.state;
    const img = {
      width: "100%",
      height: "100%",
      "background-size": "100% 100%",
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
        <View className="list">{this.renderSelectedCart(cartSum, img)}</View>
        <View className="pay-warp">
          <View className="price-sum">
            {/* <View>{`合计: ¥${sum}`}</View> */}
            <Text>合计：</Text>
            <Text className="price">{`¥${sum}`}</Text>
            {/* <View></View> */}
          </View>
          <View className="pay-btn" onClick={this.payment}>
            微信支付
          </View>
        </View>
        <AtModal
          isOpened={isShow}
          title="微信支付"
          cancelText="取消"
          confirmText="确认"
          onClose={this.handleClose}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content="微信支付"
        />
      </View>
    );
  }
}
export default OrderPay;
