import React from "react";
import Taro, { useState } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Image } from "@tarojs/components";
import { addCommodity } from "../../../actions/home";
import "./index.less";

const img = {
  width: "100%",
  height: "100%",
  "background-size": "100% 100%",
  "background-repeat": "no-repeat",
  "border-top-left-radius": "5px",
  "border-bottom-left-radius": "5px",
};

function GoodsTypeDetail(props) {
  // console.log("详情页面", props);
  const { Home, addGoodDispatch } = props;
  const { goodsData } = Home;

  const addGood = (currentGood) => {
    addGoodDispatch(currentGood);
  };

  return goodsData.map((item, index) => {
    // console.log(item, "详情页面渲染组件");
    return (
      <View key={item.key} className="every-last">
        <View
          className="every-img"
          // onClick={() => this.goToDetail(item, index, typeContent)}
        >
          <Image src={item.url} style={img} />
        </View>
        <View className="every-title">
          <View className="title">
            <View className="testTitle"> 名称： {item.title}</View>
            <View> 价格： {item.price}</View>
            <View className="addPic">
              <View
                className="test addImg"
                onClick={() => addGood(item, index)}
              ></View>
              {item.selected !== 0 ? (
                <View className="test itemNum">{item.selected}</View>
              ) : null}
              {item.selected ? (
                <View
                  className="test reduceImg "
                  // onClick={() => this.reduceItem(item, index, typeContent)}
                ></View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  });
}

export default connect(
  ({ Home }) => ({ Home }),
  (dispatch) => ({
    addGoodDispatch(payload) {
      dispatch(addCommodity(payload));
    },
  })
)(GoodsTypeDetail);
