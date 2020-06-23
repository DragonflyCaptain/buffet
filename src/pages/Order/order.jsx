import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import {
  AtTabs,
  AtTabsPane,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
} from "taro-ui";
import "./index.less";

const NULLIMG = require("../../assets/static/null.jpg");

export default class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      isShow: false
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "我的订单",
  };

  handleClick = (value) => {
    console.log(value);
    this.setState({
      current: value,
    });
  };

  handleDelete = () => {
    console.log("我要删除这个订单");
    this.setState({
      isShow: true
    })
  };

  handleCancel = () => {
    this.setState({
      isShow: false
    })
  }

  handleConfirm = () => {
    this.setState({
      isShow: false
    })
  }

  goToEvaluation = () => {
    console.log("我要去评价页面");
  };

  renderAll = () => {
    return (
      <View className="com-all-warp">
        <View className="com-detail">
          <View className="com-title">
            <View className="fo-l mg-l">店名</View>
            <View className="fo-r mg-r">状态</View>
          </View>
          <View className="com-img">查看更多</View>
          <View className="com-price">
            <View className="fo-r mg-r">实付 ¥740.70</View>
          </View>
        </View>
        <View className="com-btn">
          <View className="order-btn mg-r" onClick={this.handleDelete}>
            删除
          </View>
          <View className="order-btn mg-r" onClick={this.goToEvaluation}>
            去评价
          </View>
          <View className="order-btn repeat-btn">再次购买</View>
        </View>
      </View>
    );
  };

  render() {
    const tabList = [
      { title: "全部" },
      { title: "待付款" },
      { title: "待送达" },
      { title: "已送达" },
      { title: "待评价" },
    ];
    const { current, isShow } = this.state;
    return (
      <View className="order-warp">
        <AtTabs
          current={current}
          tabList={tabList}
          swipeable={false}
          onClick={this.handleClick}
        >
          <AtTabsPane current={current} index={0}>
            {/* <View style="padding: 60px 10px;text-align: center;">
              <Image src={NULLIMG}/>
            </View> */}
            <View style="background-color: #FAFBFC;">{this.renderAll()}</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View style="padding: 60px 10px;background-color: #FAFBFC;text-align: center;">
              <Image src={NULLIMG} />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View style="padding: 60px 10px;background-color: #FAFBFC;text-align: center;">
              <Image src={NULLIMG} />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={3}>
            <View style="padding: 60px 10px;background-color: #FAFBFC;text-align: center;">
              <Image src={NULLIMG} />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={4}>
            <View style="padding: 60px 10px;background-color: #FAFBFC;text-align: center;">
              <Image src={NULLIMG} />
            </View>
          </AtTabsPane>
        </AtTabs>
        <AtModal
          isOpened = {isShow}
          // title=""
          cancelText="取消"
          confirmText="删除"
          // onClose={this.handleClose}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content="您确认要删除该订单?"
        />
      </View>
    );
  }
}
