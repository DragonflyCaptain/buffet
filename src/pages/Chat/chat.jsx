// import Taro, { Component } from "@tarojs/taro";
// import { View, Text, ScrollView } from "@tarojs/components";
// import './chat.less'

// export default class Chat extends Component {
//   constructor() {
//     super(...arguments);
//     this.state={
//       typeContent: ''
//     }
//   }

//   componentWillMount() {}

//   componentDidMount() {

//   }

//   componentWillUnmount() {}

//   componentDidShow() {}

//   componentDidHide() {}

//   config = {
//     navigationBarTitleText: "聊天室",
//   };

//   goToRoom (roomTitle) {
//     Taro.navigateTo({
//       url: `./component/room?roomName=${roomTitle}`
//     })
//   }

//   renderChatList = data => {
//     return data.map(item=>{
//       return(
//         <View className="item-room" key={item.title} onClick={()=>this.goToRoom(item.title)}>
//           {item.title}
//         </View>
//       )
//     })
//   }

//   render() {
//     const List = [
//       {
//         title: '官路'
//       },{
//         title: '郭河'
//       }, {
//         title: '协伟'
//       }, {
//         title: '官伟'
//       }
//     ]
//     return (
//       <View className="chat-warp">
//           {/* ChatPage */}
//         <View className="chat-list-warp">
//           {this.renderChatList(List)}
//         </View>
//       </View>
//     );
//   }
// }

import Taro, { Component } from "@tarojs/taro";
import { AtActivityIndicator } from "taro-ui";
import { View } from "@tarojs/components";

// i用来判断是第几页，主要用来控制一页显示的数据
let i = 1;
class DemoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 控制活动指示器，也就是加载的小圆圈的显示隐藏，默认隐藏，上拉加载的
      //时候显示出来设置为true，加载完成后隐藏设置为false
      showActivity: false,
    };
  }
  componentDidMount() {
    this.getData();
  }
  // 监听下拉刷新
  onPullDownRefresh() {
    i = 1;
    this.getData();
  }
  // 监听上拉触底
  onReachBottom() {
    i++;
    this.setState({
      showActivity: true,
    });
    this.getData();
    console.log("*****************");
  }

  // 配置项
  config = {
    navigationBarTitleText: "列表",
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
    onReachBottomDistance: 50,
  };
  // 从服务器获取列表数据，要看具体的业务逻辑
  getData() {
    const { dispatchLoadList } = this.props;
    // let newBoy = [
    //   "pageindex=" + page,
    //   "pagesize=" + i * 10, // 通过i计算出pagesize大小
    // ];
    // dispatchLoadList(newBoy).then((json) => {
    //   if (requestSuccessNoT(json)) {
    //     // 这里是成功的业务逻辑
    //     // ......
    //     // 加载成功 设置showActivity为false
    //     this.setState({ showActivity: false });
    //   } else {
    //     // 这里是失败的业务逻辑
    //   }
    // });
  }
  /**
   * 活动指示器
   * 这里用Taro UI的活动指示器来实现上拉加载的动画效果
   */
  ActivityIndicator() {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <AtActivityIndicator></AtActivityIndicator>
      </View>
    );
  }
  render() {
    console.log(i, "++++++++");
    const { showActivity } = this.state;
    return (
      <View>
        <View>//这里是你的列表</View>
        {showActivity && this.ActivityIndicator()}
      </View>
    );
  }
}
// const mapDispatchToProps = (dispatch) => ({
//   dispatchLoadList: (values) => dispatch(shopList(values)),
// });

export default DemoList;
