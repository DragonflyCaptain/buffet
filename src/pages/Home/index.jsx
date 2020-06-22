import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtAvatar, AtSearchBar, AtFab } from "taro-ui";
import { connect } from "@tarojs/redux";
import {
  addCommodity,
  reduceCommodity,
  saveUserInfo,
  saveTypeData
} from "../../actions/home";
import { dataList } from '../../common/config'
import * as api from "../../servers/servers";
import "./index.less";

const CartImg = require('../../assets/tab-bar/cart.png') 

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
      dispatch( saveTypeData(payload) )
    }
  })
)
class Home extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      typeContent: "热搜推荐",
      searchVal: "",
      selected: [],
    };
  }

  componentWillMount() { }

  requestHomeData = async (params, text=this.state.typeContent) =>{
    Taro.showLoading({
      title: "loading",
      mask: true,
    })
    const {code, data} = await api.clickTypeRequest(params)
    if(code === 0){
      data.forEach(item=>{
        item['selected'] = 0
      })
      const obj = {
        text,
        data: data
      }
      this.props.saveTypeData(obj)
      Taro.hideLoading();
    }
  }

  componentDidMount() {
    const { typeContent } = this.state
    console.log('切换tab执行一次')
    this.requestHomeData( { category: typeContent } )
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "首页",
  };

  handleTypeClick(item) {
    let arr = this.state.selected;
    if(!arr.includes(item)){
      arr.push(item)
      let params = {
        category: item
      }
      this.setState({
        selected: arr
      });
      this.requestHomeData(params, item)
    }
    this.setState({
      typeContent: item
    })
  }

  onChange = (value) => {
    this.setState({
      searchVal: value,
    });
  };

  renderScrollList = (data, scrollItem) => {
    const { typeContent } = this.state;
    if (data.length) {
      return data.map((item) => {
        return (
          <View
            onClick={() => this.handleTypeClick(item)}
            style={scrollItem}
            key={item}
            className={typeContent === item ? "active" : ""}
          >
            {item}
          </View>
        );
      });
    }
    // return <View style={scrollItem}></View>;
  };

  handlImgClick(item) {
    console.log(item);
  }

  addItem(item, index, type) {
    console.log('首页增加商品数量')
    this.props.addCommodity({
      name: item.title,
      type,
      index,
      item,
    });
  }
  reduceItem(item, index, type) {
    console.log('首页减少商品数量')
    this.props.reduceCommodity({
      name: item.title,
      type,
      index,
      item,
    });
  }

  goToDetail = (obj) => {
    let newObj = JSON.stringify(obj);
    Taro.navigateTo({
      url: `../commodityDetail/index?params=${newObj}`,
    });
  };

  renderTypeDetail = (str, img) => {
    const { typeContent } = this.state;
    const { Home } = this.props;
    const { commodityList } = Home;
    let data = commodityList[typeContent] || [];
    if (data.length) {
      return data.map((item, index) => {
        return (
          <View key={item.id} className="every-last">
            <View className="every-img" onClick={() => this.goToDetail(item)}>
              <View style={img}></View>
            </View>
            <View className="every-title">
              <View className="title">
                <View> 名称： {item.title}</View>
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
    // return <Text>null</Text>;
  };

  goToCart = () => {
    Taro.switchTab({
      url: '../Cart/index'
    })
  }

  render() {
    const { typeContent, searchVal, selected } = this.state;
    const scrollItem = {
      height: "30px",
      "font-size": "12px",
      padding: "3px",
      "line-height": "30px",
    };
    const img = {
      width: "100%",
      height: "100%",
      "background-image": "url(https://source.unsplash.com/random)",
      "background-size": "100% 100%",
      "background-repeat": "no-repeat",
    };
    return (
      <View className="home-warp">
        <View className="search-warp">
          <AtSearchBar value={searchVal} onChange={this.onChange} />
        </View>
        <View className="content-warp">
          <View className="type">
            {this.renderScrollList(dataList, scrollItem)}
          </View>
          <View className="type-detail">
            {this.renderTypeDetail("热搜推荐", img)}
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
