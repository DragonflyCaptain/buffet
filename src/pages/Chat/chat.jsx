import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import './chat.less'

export default class Chat extends Component {
  constructor() {
    super(...arguments);
    this.state={
      typeContent: ''
    }
  }

  componentWillMount() {}

  componentDidMount() {

    
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "聊天室",
  };

  goToRoom (roomTitle) {
    Taro.navigateTo({
      url: `./component/room?roomName=${roomTitle}`
    })
  }

  renderChatList = data => {
    return data.map(item=>{
      return(
        <View className="item-room" key={item.title} onClick={()=>this.goToRoom(item.title)}>
          {item.title}
        </View>
      )
    })
  }

  render() {
    const List = [
      {
        title: '官路'
      },{
        title: '郭河'
      }, {
        title: '协伟'
      }, {
        title: '官伟'
      }
    ]
    return (
      <View className="chat-warp">
          {/* ChatPage */}
        <View className="chat-list-warp">
          {this.renderChatList(List)}
        </View>
      </View>
    );
  }
}
