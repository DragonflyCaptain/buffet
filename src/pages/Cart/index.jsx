import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtButton, AtCard, AtSwipeAction, AtList } from "taro-ui";
import { addSelect, reduceSelect, saveUserInfo } from "../../actions/home";

import "./index.less";

const NOCART = require('../../assets/static/nocart.png');

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
    let obj = {
      name: item.title,
      index,
      item,
    };
    this.props.add(obj);
  };

  cartReduce = (item, index) => {
    let obj = {
      name: item.title,
      index,
      item,
    };
    this.props.dec(obj);
  };

  renderSelectedCart = (data, img) => {
    console.log('最后渲染的是什么', data)
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
      Home: { cartSum },
    } = this.props;
    Taro.getSetting().then((res) => {
      if (res.authSetting["scope.userInfo"]) {
        let sum = 0;
        cartSum.forEach((item) => {
          sum += item.price * item.selected;
        });
        Taro.navigateTo({
          url: `../orderPay/index?sum=${sum}`,
        });
      } else {
        this.props.saveUserInfo({})
        Taro.switchTab({
          url: "../User/index",
        });
      }
    });
  };

  render() {
    const {
      Home: { cartSum },
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
          extra={`已选择${cartSum.length}件商品`}
          title="购物车"
          thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
        >
          {
            cartSum.length? this.renderSelectedCart(cartSum, img):<Image src={NOCART} />
          }
        </AtCard>
        {cartSum.length ? (
          <View className="goToPay">
            <View className="goToPayBtn" onClick={this.goToPayPage}>
              去结算({cartSum.length})
            </View>
          </View>
        ) : null}
        <View className="place"></View>
      </View>
    );
  }
}

export default Cart;
