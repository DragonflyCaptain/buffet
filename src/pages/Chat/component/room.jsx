import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Input } from "@tarojs/components";
import { AtInput } from "taro-ui";
import { connect } from "@tarojs/redux";
import { sendMsg } from "../../../actions/message";
import "./room.less";

const sendMessage = require("../../../assets/static/send.png");

@connect(
  ({ message, Home }) => ({
    message,
    Home,
  }),
  (dispatch) => ({
    sendMsg(payload) {
      dispatch(sendMsg(payload));
    },
  })
)
class Chatroom extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      msg: "",
      keyCodeH: 0,
    };
  }

  config = {
    navigationBarTitleText: "",
  };

  componentWillMount() {
    // const { roomName } = this.$router.params;
    // Taro.setNavigationBarTitle({
    //   title: roomName,
    // });
  }
  componentDidMount() {
    // this.scrollMsgBottom();
    // Taro.connectSocket({
    //   url: 'ws://echo.websocket.org/echo',
    //   success: function () {
    //     console.log('connect success')
    //   }
    // }).then(task => {
    //   task.onOpen(function () {
    //     console.log('onOpen')
    //     task.send({ data: 'xxx' })
    //   })
    //   task.onMessage(function (msg) {
    //     console.log('onMessage: ', msg)
    //     task.close()
    //   })
    //   task.onError(function () {
    //     console.log('onError')
    //   })
    //   task.onClose(function (e) {
    //     console.log('onClose: ', e)
    //   })
    // })
  }

  sendMsg = () => {
    if (this.state.msg === "") return;
    let obj = {
      text: this.state.msg,
      Marking: 1,
      id: Math.random(),
      url: "https://source.unsplash.com/random",
    };
    this.props.sendMsg(obj);
    this.setState({
      msg: "",
    });
  };

  handleChange = (e) => {
    let text = e.detail.value;
    this.setState({
      msg: text,
    });
  };

  renderMessage = (data) => {
    return (
      data &&
      data.length &&
      data.map((item) => {
        if (item.Marking === 1) {
          return (
            <View className="message" key={item.id}>
              <View className="msg-img">
                <Image src={item.url} />
              </View>
              <View className="msg-text">{item.text}</View>
            </View>
          );
        }
        return (
          <View className="other-message" key={item.id}>
            <View className="msg-img">
              <Image src={item.url} />
            </View>
            <View className="msg-text">{item.text}</View>
            {/* <View className="msg-img">
              <Image src={sendMessage} />
            </View>
            <View className="msg-text">{item.text}</View> */}
          </View>
        );
      })
    );
  };

  handleConfirm = (e) => {
    let text = e.detail.value;
    if (!text || text === "") return;
    let obj = {
      text,
      Marking: 1,
      id: Math.random(),
      url: "https://source.unsplash.com/random",
    };
    this.props.sendMsg(obj);
    this.setState({
      msg: "",
    });
  };

  onScroll = (e) => {
    // console.log(e.detail, '滚动事件');
  };

  onScrollToUpper = (e) => {
    // console.log(e, "滚动最上面");
  };

  render() {
    const { roomName } = this.$router.params;
    const { msg, keyCodeH } = this.state;
    const {
      message: { msgList },
    } = this.props;
    return (
      <View className="room-warp">
        <ScrollView
          className="scrollview buff-scroll"
          scrollY
          onScroll={this.onScroll}
        >
          {this.renderMessage(msgList)}
        </ScrollView>
        <View className="features">
          <View className="entry-warp">
            <Input
              className="input-msg"
              placeholder="输入消息"
              confirmType="send"
              onConfirm={this.handleConfirm}
              value={msg}
              onInput={this.handleChange}
              confirmHold={true}
              adjustPosition={false}
              onFocus={this.testFocus}
              style="bottom: 367px"
            />
          </View>
          <View className="send-warp">
            <Image src={sendMessage} className="send" onClick={this.sendMsg} />
          </View>
        </View>
      </View>
    );
  }
}

export default Chatroom;
