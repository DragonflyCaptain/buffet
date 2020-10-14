import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtModal } from "taro-ui";
import { connect } from "@tarojs/redux";
import * as api from '../../servers/servers';
import { saveOrderData } from '../../actions/order'
import "./index.less";

const NULLIMG = require("../../assets/static/null.jpg");
@connect(
  ({ Order }) => ({
    Order,
  }),
  (dispatch) => ({
    saveOrderData(payload) {
      dispatch(saveOrderData(payload))
    }
  })
)
class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      isShow: false,
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.getAllOrder()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "我的订单",
  };

  getAllOrder = async () => {
    const { code, data } = await api.findOrder()
    this.props.saveOrderData(data)
  }

  handleClick = (value) => {
    this.setState({
      current: value,
    });
  };

  handleDelete = () => {
    this.setState({
      isShow: true,
    });
  };

  handleCancel = () => {
    this.setState({
      isShow: false,
    });
  };

  handleConfirm = () => {
    this.setState({
      isShow: false,
    });
  };

  goToEvaluation = () => {
    console.log("我要去评价页面");
  };

  renderAll = (data) => {
    return (
      data &&
      data.length &&
      data.map((item, index) => {
        return (
          <View className="com-all-warp" key={`*${index}`}>
            <View className="com-detail">
              <View className="com-title">
                <View className="fo-l mg-l">店名</View>
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
      })
    );
  };

  renderChild = data => {
    return data && data.length && data.map((item, index)=>{
      if(index<3){
        return <Image className="testImage" src={item.url} key={item.title} />
      }
    })
  }

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
      Order: { orderList },
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
            {/* <View style="padding: 60px 10px;text-align: center;">
              <Image src={NULLIMG}/>
            </View> */}
            {orderList.length ? (
              <View style="background-color: #FAFBFC;">
                {this.renderAll(orderList)}
                <View style={{textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>已经没有更多订单了</View>
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
      </View>
    );
  }
}

export default Order;
