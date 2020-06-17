import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtAvatar, AtSearchBar, AtFab } from "taro-ui";
import { connect } from "@tarojs/redux";
import { addCommodity, reduceCommodity, saveUserInfo } from "../../actions/home";
import "./index.less";

const dataList = [
  "热搜推荐",
  "食品酒水",
  "个护清洁",
  //   '生鲜果蔬',
  //   '美妆护肤',
  //   '精品男装',
  //   '精品女装',
  //   '内衣配饰',
  //   '鞋靴箱包',
  //   '手机数码',
  //   '家用电器',
  //   '电脑办公',
  //   '运动户外',
  //   '汽车生活',
  //   '母婴童装',
  //   '玩具乐器',
  //   '家具厨具',
  //   '计生情趣',
  //   '医药保健',
  //   '图书音像',
  //   '钟表珠宝',
  //   '奢侈品',
  //   '京东国际',
  //   '家具建材',
  //   '宠物园艺',
  //   '礼品鲜花'
];

@connect(
  ({ addToCart }) => ({ addToCart }),
  (dispatch) => ({
    addCommodity(payload) {
      dispatch(addCommodity(payload));
    },
    reduceCommodity(payload) {
      dispatch(reduceCommodity(payload));
    },
    saveUserInfo(payload){
      dispatch(saveUserInfo(payload));
    }
  })
)
class Home extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      typeContent: "热搜推荐",
    };
  }

  componentWillMount() {}

  componentDidMount() {
    console.log(this.props, 'PPPPP')
    let _this = this
    Taro.getUserInfo({
      success: function(res) {
        console.log(res, '______')
        console.log(_this.props, '|||||')
        _this.props.saveUserInfo(res.userInfo)
        // var userInfo = res.userInfo
        // var nickName = userInfo.nickName
        // var avatarUrl = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country
      }
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "小卖部",
  };

  handleTypeClick(item) {
    this.setState({
      typeContent: item,
    });
  }

  renderScrollList = (data, scrollItem) => {
    const { typeContent } = this.state
    if (data.length) {
      return data.map((item) => {
        return (
          <View
            onClick={() => this.handleTypeClick(item)}
            style={scrollItem}
            key={item}
            className={typeContent === item ? 'active': ''}
          >
            {item}
          </View>
        );
      });
    }
    return <View style={scrollItem}>null</View>;
  };

  handlImgClick(item) {
    console.log(item);
  }

  addItem(item, index, type) {
    console.log(item.name, type, "添加一个商品");
    let obj = {
      name: item.name,
      type,
      index,
      item,
    };
    this.props.addCommodity(obj);
  }
  reduceItem(item, index, type) {
    console.log(item.name, type, "去掉一个商品");
    let obj = {
      name: item.name,
      type,
      index,
      item,
    };
    this.props.reduceCommodity(obj);
  }

  goToDetail = (obj) => {
    console.log(obj);
    let newObj = JSON.stringify(obj);
    Taro.navigateTo({
      url: `../commodityDetail/index?params=${newObj}`,
    });
  };

  renderTypeDetail = (str, img) => {
    const { typeContent } = this.state;
    const { addToCart } = this.props;
    const { commodityList } = addToCart;
    let data = commodityList[typeContent] || commodityList[str];
    if (data.length) {
      return data.map((item, index) => {
        return (
          <View key={item.id} className="every-last">
            <View className="every-img" onClick={() => this.goToDetail(item)}>
              <View style={img}></View>
            </View>
            <View className="every-title">
              <View className="title">
                <View> 名称： {item.name}</View>
                <View> 价格： {item.price}</View>
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
          </View>
        );
      });
    }
    return <Text>null</Text>;
  };

  render() {
    const { typeContent } = this.state;
    console.log(this.props, "render");
    const scrollItem = {
      height: "30px",
      "font-size": "12px",
      padding: "3px",
      'line-height': '30px'
    };
    const img = {
      width: "100%",
      height: "100%",
      "background-image": "url(https://source.unsplash.com/random)",
      "background-size": "100%",
      "background-repeat": "no-repeat",
    };
    return (
      <View className="home-warp">
        <View className="search-warp">
          {/* <Input type="text" className="search" placeholder="搜索商品" /> */}
          <AtSearchBar
            // value={this.state.value}
            // onChange={this.onChange.bind(this)}
          />
        </View>
        <View className="content-warp">
          <View className="type">
            {this.renderScrollList(dataList, scrollItem)}
          </View>
          <View className="type-detail">
            {this.renderTypeDetail("热搜推荐", img)}
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
