import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtButton, AtCard } from "taro-ui";
import { addSelect, reduceSelect } from "../../actions/home";

import "./index.less";

@connect(
  ({ count, addToCart }) => ({
    count,
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
      name: item.name,
      index,
      item,
    };
    this.props.add(obj);
    console.log("购物车增加", this.props);
  };

  cartReduce = (item, index) => {
    let obj = {
      name: item.name,
      index,
      item,
    };
    this.props.dec(obj);
    console.log("购物车减少");
  };

  renderSelectedCart = (data) => {
    return (
      data &&
      data.length &&
      data.map((item, index) => {
        console.log(item, item.price, "))))______");
        if (item.selected === 0) return false;
        return (
          <View className="cartItem" key={item.id}>
            <View className="cartImgWarp">
              <View className="cartImg"></View>
            </View>
            <View className="cartContent">
              <View>名称：{item.name}</View>
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

  render() {
    console.log(this.props, "LLLLL");
    const {
      count: { num },
      add,
      dec,
      addToCart: { cartSum },
    } = this.props;
    return (
      <View className="home">
        <AtCard
          // note="小Tips"
          extra={`已选择${cartSum.length}件商品`}
          title="购物车"
          thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
        >
          {this.renderSelectedCart(cartSum)}
        </AtCard>
        <View className="goToPay">
          <View className="goToPayBtn">
            去结算({cartSum.length})
          </View>
        </View>
      </View>
    );
  }
}

export default Cart;
