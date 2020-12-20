import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtButton, AtCard, AtSwipeAction, AtList } from "taro-ui";
import { addSelect, reduceSelect, saveUserInfo } from "../../actions/home";

import "./index.less";
import { UPDATE_STATE } from "../../constants/home";

const NOCART = require("../../assets/static/nocart.png");

@connect(
  ({ count, Home }) => ({
    count,
    Home,
  }),
  (dispatch) => ({
    add(payload) {
      dispatch(addSelect(payload));
    },
    dec(payload) {
      dispatch(reduceSelect(payload));
    },
    saveUserInfo(payload) {
      dispatch(saveUserInfo(payload));
    },
  })
)
class Cart extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      typeContent: "",
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "购物车",
  };

  cartAdd = (item, index) => {
    const {
      dispatch,
      Home: { cartList },
    } = this.props;
    let data = cartList;
    data[index].selected += 1;
    dispatch({
      type: UPDATE_STATE,
      payload: {
        cartList: data,
      },
    });
  };

  cartReduce = (item, index) => {
    const {
      dispatch,
      Home: { cartList },
    } = this.props;
    let data = cartList;
    data[index].selected -= 1;
    if (data[index].selected < 1) {
      data.splice(index, 1);
    }
    dispatch({
      type: UPDATE_STATE,
      payload: {
        cartList: data,
      },
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
              <View className="addPic">
                <View
                  className="test addImg"
                  onClick={() => this.cartAdd(item, index)}
                ></View>
                {item.selected !== 0 ? (
                  <View className="test itemNum">{item.selected}</View>
                ) : null}
                {item.selected ? (
                  <View
                    className="test reduceImg "
                    onClick={() => this.cartReduce(item, index)}
                  ></View>
                ) : null}
              </View>
            </View>
          </View>
        );
      })
    );
  };

  goToPayPage = () => {
    // console.log('去结算了')
    const {
      Home: { cartList },
    } = this.props;
    Taro.getSetting().then((res) => {
      if (res.authSetting["scope.userInfo"]) {
        let sum = 0;
        cartList.forEach((item) => {
          sum += item.price * item.selected;
        });
        Taro.navigateTo({
          url: `../orderPay/index?sum=${sum}`,
        });
      } else {
        this.props.saveUserInfo({});
        Taro.switchTab({
          url: "../User/index",
        });
      }
    });
  };

  calculationPriceSum = (data) => {
    if (!data.length) return;
    const sumData = data.map((item) => item.price * item.selected);
    const priceSum = sumData.reduce((pre, next) => pre + next);
    return priceSum;
  };

  render() {
    const {
      Home: { cartList },
    } = this.props;
    const img = {
      width: "100%",
      height: "100%",
      "background-size": "100% 100%",
      "background-repeat": "no-repeat",
    };
    return (
      <View className="home">
        <AtCard
          // note="小Tips"
          extra={`已选择${cartList.length}件商品`}
          title="购物车"
          thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
        >
          {cartList.length ? (
            this.renderSelectedCart(cartList, img)
          ) : (
            <Image src={NOCART} />
          )}
        </AtCard>
        {cartList.length ? (
          <View className="goToPay">
            <View className="price_sum">
              总计: {this.calculationPriceSum(cartList)}
            </View>
            <View className="goToPayBtn" onClick={this.goToPayPage}>
              去结算({cartList.length})
            </View>
          </View>
        ) : null}
        <View className="place"></View>
      </View>
    );
  }
}

export default Cart;
