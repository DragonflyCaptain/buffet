import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";

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

  render() {
    const { detail } = this.state;
    const classe = {
      width: "100%",
      height: "100%",
      "background-image": "url(https://source.unsplash.com/random)",
      "background-size": "100%",
      "background-repeat": "no-repeat",
    };
    return (
      <View className="detail-warp">
        <View className="big-pic">
          <View style={classe}></View>
        </View>
        <View className="content-warp">
          <View style={{color: 'red'}}>
              <Text>¥</Text>
              <Text style={{fontSize: '20px'}}>{detail.price}</Text>
          </View>
          <View>{detail.name}</View>
        </View>
      </View>
    );
  }
}

export default Detail;
