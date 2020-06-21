import Taro, { Component } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";

export default class Chat extends Component {
  constructor() {
    super(...arguments);
    this.state={
      typeContent: ''
    }
  }

  componentWillMount() {}

  componentDidMount() {

    Taro.connectSocket({
      url: 'ws://echo.websocket.org/echo',
      success: function () {
        console.log('connect success')
      }
    }).then(task => {
      task.onOpen(function () {
        console.log('onOpen')
        task.send({ data: 'xxx' })
      })
      task.onMessage(function (msg) {
        console.log('onMessage: ', msg)
        task.close()
      })
      task.onError(function () {
        console.log('onError')
      })
      task.onClose(function (e) {
        console.log('onClose: ', e)
      })
    })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "聊天室",
  };

  render() {
    
    return (
      <View className="home">
          ChatPage
      </View>
    );
  }
}
