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
      keyCodeH: 0
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
  componentDidMount() {}

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
    console.log(e.detail);
  }

  onScrollToUpper = e => {
      console.log(e, '_________')
  }

  testFocus =(e) => {
    console.log(e.detail, '_________')
    this.setState({
        keyCodeH: e.detail.height
    })
  }

  render() {
    const { roomName } = this.$router.params;
    const { msg, keyCodeH } = this.state;
    const {
      message: { msgList },
    } = this.props;
    const scrollTop = 0;
    const Threshold = 20;
    console.log(keyCodeH)
    return (
      <View>
        <ScrollView
          className="scrollview buff-scroll"
          scrollY
          scrollWithAnimation
          scrollTop={scrollTop}
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
          onScrollToUpper={this.onScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
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
            //   scrollIntoView={`${msgList[msgList.length-1].id}`}
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
