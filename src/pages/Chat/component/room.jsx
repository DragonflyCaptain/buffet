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
    };
  }

  config = {
    navigationBarTitleText: "",
  };

  componentWillMount() {
    const { roomName } = this.$router.params;
    Taro.setNavigationBarTitle({
      title: roomName,
    });
  }
  componentDidMount() {}

  sendMsg = () => {
    if (this.state.msg === "") return;
    let obj = {
      text: this.state.msg,
      Marking: 1,
      id: Math.random(),
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
        return (
          <View className="message" key={item.id}>
            <View className="msg-text">{item.text}</View>
            {/* <View>{item.text}</View> */}
            <View className="msg-img">
              <Image src={sendMessage} />
            </View>
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
    };
    this.props.sendMsg(obj);
    this.setState({
      msg: "",
    });
  };

  render() {
    const { roomName } = this.$router.params;
    const { msg } = this.state;
    const {
      message: { msgList },
    } = this.props;
    return (
      <View className="room-warp">
        <View className="message-warp">{this.renderMessage(msgList)}</View>
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
              // adjustPosition={false}
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
