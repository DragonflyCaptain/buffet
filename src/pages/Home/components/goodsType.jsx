import React from "react";
import Taro, { useState, useEffect } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";
import { GOODSCONFIG } from "../../../utils/goodsConfig";
import { getFitrstTimeData } from "../../../actions/home";
import { UPDATE_STATE } from "../../../constants/home";
import "./index.less";

function GoodsType(props) {
  const { getFirstData, dispatch, Home } = props;
  const { activeKey } = Home;

  useEffect(() => {
    getFirstData();
  }, []);

  const [current, setCurrent] = useState("1");
  const handleTypeClick = (item) => {
    setCurrent(item.key);
    getFirstData(item.key);
    dispatch({
      type: UPDATE_STATE,
      payload: {
        activeKey: item.key,
      },
    });

    return;
    let arr = this.state.selected;
    if (!arr.includes(item)) {
      arr.push(item);
      let params = {
        category: item,
      };
      this.setState({
        selected: arr,
      });
      this.requestHomeData(params, item);
    }
    this.setState({
      typeContent: item,
    });
  };

  return GOODSCONFIG.map((item) => {
    return (
      <View
        className={`buf_goods_type_item ${
          current === item.key ? "active" : null
        }`}
        key={item.key}
        onClick={() => handleTypeClick(item)}
      >
        {item.title}
      </View>
    );
  });
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(
  ({ Home }) => ({ Home }),
  (dispatch) => ({
    addCommodity(payload) {
      dispatch(addCommodity(payload));
    },
    reduceCommodity(payload) {
      dispatch(reduceCommodity(payload));
    },
    saveUserInfo(payload) {
      dispatch(saveUserInfo(payload));
    },
    saveTypeData(payload) {
      dispatch(saveTypeData(payload));
    },

    getFirstData(params) {
      dispatch(getFitrstTimeData(params));
    },
    update() {
      dispatch({});
    },
  })
)(GoodsType);
