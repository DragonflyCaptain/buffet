import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtMessage } from "taro-ui";
import { addCommodity } from "../../actions/home";
import "./index.less";

@connect(
  ({ Home }) => ({ Home }),
  (dispatch) => ({
    addCommodity(payload) {
      dispatch(addCommodity(payload));
    },
  })
)
class Detail extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      detail: {},
    };
  }

  componentWillMount() {}

  componentDidMount() {
    const { params } = this.$router.params;
    // console.log(params, "{{{{{lll{");
    let obj = JSON.parse(params);
    this.setState({
      detail: obj,
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "商品详情",
  };

  addCart = () => {
    const { cartSum } = this.props.Home;
    const { detail } = this.state;
    const isExist = cartSum.filter((item) => item.title === detail.name);
    if (isExist.length) {
      return Taro.atMessage({
        message: "已经在购物车了",
      });
    }
    this.props.addCommodity(this.state.detail);
  };

  render() {
    const {
      detail: { item },
    } = this.state;
    const classe = {
      width: "100%",
      height: "100%",
      "background-image": "url(https://source.unsplash.com/random)",
      "background-size": "100%",
      "background-repeat": "no-repeat",
    };
    return (
      <View>
        <AtMessage />
        <View className="detail-warp">
          <View className="big-pic">
            {/* <View style={classe}></View> */}
            <Image style={classe} src={item.url} />
          </View>
          <View className="content-warp">
            <View style={{ color: "red" }}>
              <Text>¥</Text>
              <Text style={{ fontSize: "20px" }}>{item.price || 20}</Text>
            </View>
            <View>{item.title || "测试商品名称"}</View>
          </View>
          <View className="detail-menu">
            <View className="btn-right pay public ">立即购买</View>
            <View className="btn-right cart public" onClick={this.addCart}>
              加入购物车
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Detail;
