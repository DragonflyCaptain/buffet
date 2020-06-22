import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtModal } from "taro-ui";
import "./index.less";
import { resetCart } from "../../actions/home";

@connect(
  ({ Home }) => ({
    Home,
  }),
  (dispatch) => ({
    resetCart(payload) {
      dispatch(resetCart(payload));
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
              <View style={img}></View>
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
    this.setState({
      isShow: true,
    });
  };

  handleCancel = () => {
    this.setState({
      isShow: false,
    });
  };

  handleConfirm = () => {
    Taro.showLoading({
      title: "付款中",
      mask: true,
    });
    setTimeout(() => {
      Taro.hideLoading();
      this.props.resetCart();
      Taro.navigateBack({ delta: 2 });
      this.setState({
        isShow: false,
      });
    }, 2000);
  };

  handleCartSum = () => {
    const {
      Home: { cartSum },
    } = this.props;
    let sum = "";
    cartSum &&
      cartSum.length &&
      cartSum.forEach((item) => {
        sum += item.price * item.selected;
      });
    console.log(sum, "最后的总价");
    return 0;
  };

  render() {
    const {
      Home: { cartSum },
    } = this.props;
    const { isShow, sum } = this.state;
    const img = {
      width: "100%",
      height: "100%",
      "background-image": "url(https://source.unsplash.com/random)",
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
          <View className="pay-btn" onClick={this.payment}>微信支付</View>
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
