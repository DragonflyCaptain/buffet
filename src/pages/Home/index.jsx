import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtLoadMore, AtSearchBar, AtActivityIndicator } from "taro-ui";
import { connect } from "@tarojs/redux";
import {
  addCommodity,
  reduceCommodity,
  saveUserInfo,
  saveTypeData,
  getGoodsList,
  loadMoreGoods,
} from "../../actions/home";
import * as api from "../../servers/servers";
// import GoodsType from "./components/goodsType";
// import Search from "./components/search";
import { GOODSCONFIG } from "../../utils/goodsConfig";
import "./index.less";
import { UPDATE_STATE } from "../../constants/home";

const CartImg = require("../../assets/tab-bar/cart.png");
let i = 1;

@connect(
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
  })
)
class Home extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      typeContent: "1",
      searchVal: "",
      selected: ["1"],
      showActivity: false,
      limit: 10,
      page: 0,
      count: 1,
    };
  }

  componentWillMount() {}

  requestHomeData = async (params, type = this.state.typeContent) => {
    // Taro.showLoading({
    //   title: "loading",
    //   mask: true,
    // });
    const { dispatch } = this.props;
    dispatch(
      getGoodsList({
        params,
        type,
      })
    );
  };

  componentDidMount() {
    const { typeContent, limit, page } = this.state;
    const obj = {
      limit,
      page,
      category: typeContent,
    };
    this.requestHomeData(obj);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "首页",
  };
  handleTypeClick(item) {
    const { selectedCategory } = this.props.Home;
    let arr = selectedCategory;
    if (!selectedCategory.includes(item.key)) {
      arr.push(item.key);
      this.requestHomeData(
        {
          category: item.key,
          limit: 10,
          page: 0,
        },
        item.key
      );
      this.props.dispatch({
        type: UPDATE_STATE,
        payload: {
          selectedCategory: arr,
        },
      });
    }
    this.setState({
      typeContent: item.key,
    });
  }

  onChange = (value) => {
    this.setState({
      searchVal: value,
    });
  };

  renderScrollList = (data, scrollItem) => {
    const { typeContent } = this.state;
    return (
      data &&
      data.length &&
      data.map((item) => {
        return (
          <View
            onClick={() => this.handleTypeClick(item)}
            style={scrollItem}
            key={item.key}
            className={typeContent === item.key ? "active" : "goodsType"}
          >
            {item.title}
          </View>
        );
      })
    );
  };

  handlImgClick(item) {}

  addItem(item, index) {
    // this.props
    let data = this.props.Home.cartList;
    const isHave = data.filter((val) => val._id === item._id);
    debugger;
    if (isHave.length) {
      data.forEach((val) => {
        if (val._id === item._id) {
          val.selected += 1;
        }
      });
    } else {
      data.push({
        ...item,
        selected: 1,
      });
    }
    this.props.dispatch({
      type: UPDATE_STATE,
      payload: {
        cartList: data,
      },
    });
  }
  reduceItem(item, index, type) {
    this.props.reduceCommodity({
      name: item.title,
      type,
      index,
      item,
    });
  }

  goToDetail = (item, index, type) => {
    let newObj = JSON.stringify({
      name: item.title,
      type,
      index,
      item,
    });
    Taro.navigateTo({
      url: `../commodityDetail/index?params=${newObj}`,
    });
  };

  handlLoadMoreClick = () => {
    const { typeContent, limit, page, count } = this.state;
    const { dispatch } = this.props;
    let cnt = count;
    const obj = {
      limit,
      page: cnt++,
      category: typeContent,
    };
    dispatch(loadMoreGoods(typeContent, obj));
    this.setState({
      count: cnt,
    });
  };

  renderTypeDetail = (str, img) => {
    const { typeContent } = this.state;
    const { Home } = this.props;
    const { goodsListInfo } = Home;
    let data = goodsListInfo[typeContent] || [];
    if (data.length) {
      return data.map((item, index) => {
        return (
          <View key={item.id} className="every-last">
            <View
              className="every-img"
              onClick={() => this.goToDetail(item, index, typeContent)}
            >
              <Image src={item.url} style={img} />
            </View>
            <View className="every-title">
              <View className="title">
                <View className="testTitle"> 名称： {item.title}</View>
                <View> 价格： {item.price}</View>
                <View className="addPic">
                  <View
                    className="test addToCart"
                    onClick={() => this.addItem(item, index, typeContent)}
                  ></View>
                </View>
              </View>
            </View>
          </View>
        );
      });
    }
  };

  goToCart = () => {
    Taro.switchTab({
      url: "../Cart/index",
    });
  };

  onActionClick = () => {
    const params = JSON.stringify({
      title: this.state.searchVal,
    });
    Taro.navigateTo({
      url: `../components/searchPage?params=${params}`,
    });
  };
  render() {
    const { searchVal, typeContent } = this.state;
    const {
      Home: { goodsListInfo, loadMore },
    } = this.props;
    console.log(this.props, "_____");
    const scrollItem = {
      height: "30px",
      "font-size": "12px",
      padding: "3px",
      "line-height": "30px",
      background: "#cacaca",
      position: "renative",
    };
    const img = {
      width: "100%",
      height: "100%",
      "background-size": "100% 100%",
      "background-repeat": "no-repeat",
      "border-top-left-radius": "5px",
      "border-bottom-left-radius": "5px",
    };
    return (
      <View className="home-warp">
        <View className="search-warp">
          <AtSearchBar
            showActionButton
            onActionClick={this.onActionClick}
            value={searchVal}
            onChange={this.onChange}
          />
        </View>
        <View className="content-warp">
          <View className="type">
            {this.renderScrollList(GOODSCONFIG, scrollItem)}
          </View>
          <View className="type-detail">
            {this.renderTypeDetail("热搜推荐", img)}
            {goodsListInfo[typeContent] &&
            goodsListInfo[typeContent].length >= 9 ? (
              <AtLoadMore
                moreBtnStyle={{
                  color: "#000",
                  border: "none",
                  fontSize: 11,
                }}
                loadingText="加载中"
                noMoreText="暂无更多"
                onClick={this.handlLoadMoreClick}
                status={loadMore}
              />
            ) : null}
          </View>
        </View>
        <View className="view-cart" onClick={this.goToCart}>
          <Image src={CartImg} className="go-cart" />
        </View>
      </View>
    );
  }
}

export default Home;
