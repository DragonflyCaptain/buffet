import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtModal, AtToast } from "taro-ui";
import { connect } from "@tarojs/redux";
import day from "dayjs";
import { deleteOrder, getOrderData } from "../../actions/order";
import "./index.less";
import { UPDATE_STATE } from "../../constants/order";

const NULLIMG = require("../../assets/static/null.jpg");
const format = "YYYY-MM-DD HH:ss";
@connect(({ Order }) => ({
  Order,
}))
class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      isShow: false,
      currentOrder: {},
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.getAllOrder();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "我的订单",
  };

  getAllOrder() {
    this.props.dispatch(
      getOrderData({
        enable: true,
      })
    );
  }

  handleClick = (value) => {
    this.setState({
      current: value,
    });
  };

  handleDelete = (currentOrder) => {
    this.setState({
      isShow: true,
      currentOrder,
    });
  };

  handleCancel = () => {
    this.setState({
      isShow: false,
    });
  };

  handleConfirm = () => {
    const { currentOrder } = this.state;
    this.props.dispatch({
      type: UPDATE_STATE,
      payload: {
        isDeleteTips: true,
      },
    });
    this.props.dispatch(deleteOrder({ id: currentOrder._id }));
    this.setState({
      isShow: false,
    });
  };

  goToEvaluation = () => {
    // console.log("我要去评价页面");
  };

  renderAll = (data) => {
    return (
      data &&
      data.length &&
      data.map((item, index) => {
        console.log(item, "______");
        return (
          <View className="com-all-warp" key={`*${index}`}>
            <View className="com-detail">
              <View className="com-title">
                <View className="fo-l mg-l">
                  {day(item.orderTime).format(format)}
                </View>
                <View className="fo-r mg-r">{item.status}</View>
              </View>
              <View className="com-img">
                {this.renderChild(item.productList)}
              </View>
              <View className="com-price">
                <View className="fo-r mg-r">实付金额 ¥{item.priceTotal}</View>
              </View>
            </View>
            <View className="com-btn">
              <View
                className="order-btn mg-r"
                onClick={() => this.handleDelete(item)}
              >
                删除
              </View>
              <View className="order-btn mg-r" onClick={this.goToEvaluation}>
                去评价
              </View>
              <View className="order-btn repeat-btn">再次购买</View>
            </View>
          </View>
        );
      })
    );
  };

  renderChild = (data) => {
    return (
      data &&
      data.length &&
      data.map((item, index) => {
        if (index < 3) {
          return (
            <Image className="testImage" src={item.url} key={item.title} />
          );
        }
      })
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
    const {
      Order: { orderList, isDeleteTips },
    } = this.props;
    return (
      <View className="order-warp">
        <AtTabs
          current={current}
          tabList={tabList}
          swipeable={false}
          onClick={this.handleClick}
        >
          <AtTabsPane current={current} index={0}>
            {orderList.length ? (
              <View className="orderScroll">
                {this.renderAll(orderList)}
                <View
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  已经没有更多订单了
                </View>
              </View>
            ) : (
              <View style="padding: 60px 10px;text-align: center;">
                <Image src={NULLIMG} />
              </View>
            )}
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
          isOpened={isShow}
          // title=""
          cancelText="取消"
          confirmText="删除"
          // onClose={this.handleClose}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          content="您确认要删除该订单?"
        />
        <AtToast isOpened={isDeleteTips} text="删除成功"></AtToast>
      </View>
    );
  }
}

export default Order;
