import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtButton } from "taro-ui";
import { add, minus, asyncAdd } from "../../actions/count";
import "./index.less";

@connect(
  ({ count, addToCart }) => ({
    count,
    addToCart,
  }),
  (dispatch) => ({
    add(num) {
      dispatch(add(num));
    },
    dec(num) {
      dispatch(minus(num));
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

  handleAdd = () => {
    this.props.add(5);
  };

  handleDec = () => {
    this.props.dec(4);
  };

  renderSelectedCart = (data) => {
    return (
      data &&
      data.length &&
      data.map((item) => {
        console.log(item, item.price, '))))______')
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
                  onClick={() => this.addItem(item, index, typeContent)}
                ></View>
                {item.selected !== 0 ? (
                  <View className="test itemNum">{item.selected}</View>
                ) : null}
                {item.selected ? (
                  <View
                    className="test reduceImg "
                    onClick={() => this.reduceItem(item, index, typeContent)}
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
        {/* CartPage
        <AtButton type="primary" onClick={this.handleAdd}>
          加
        </AtButton>
        <Text>{num}</Text>
        <AtButton type="primary" onClick={this.handleDec}>
          >减
        </AtButton> */}
        {this.renderSelectedCart(cartSum)}
      </View>
    );
  }
}

export default Cart;
