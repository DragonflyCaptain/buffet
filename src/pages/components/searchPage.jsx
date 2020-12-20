import Taro, { Component, useState } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { Image, View } from "@tarojs/components";
import { AtNavBar } from "taro-ui";
import { getSearchValueData } from "../../actions/home";
import { ADD_COMMODITY } from "../../constants/home";
import "./index.less";

@connect(({ Home }) => ({ Home }))
class SearchPage extends Component {
  config = {
    navigationBarTitleText: "结果页",
    // navigationStyle: "custom",
  };
  componentDidMount() {
    const { params } = this.$router.params;
    console.log("我传的参数是啥", params);
    this.props.dispatch(getSearchValueData(JSON.parse(params)));
  }

  handleAddGoodToCart(currentGood, index) {
    console.log(currentGood);
    this.props.dispatch({
      type: ADD_COMMODITY,
      payload: {
        name: currentGood.title,
        type: currentGood.key,
        index,
        item: currentGood,
      },
    });
  }
  render() {
    const { searchResultData } = this.props.Home;
    return (
      <View>
        {/* <View>
          <AtNavBar
            // onClickRgIconSt={this.handleClick}
            // onClickRgIconNd={this.handleClick}
            // onClickLeftIcon={this.handleClick}
            color="#000"
            title="NavBar 导航栏示例"
            leftText="返回"
            rightFirstIconType="bullet-list"
            rightSecondIconType="user"
          />
        </View> */}
        <View>
          {searchResultData.map((item, index) => {
            return (
              <View key={item._id} className="sch_goods_item">
                <View className="sch_img_warp">
                  <Image className="sch_img" src={item.url} />
                </View>
                <View className="sch_text_warp">
                  <View className="sch_text">{item.title}</View>
                  <View
                    className="sch_paycar"
                    onClick={() => this.handleAddGoodToCart(item, index)}
                  ></View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default SearchPage;
