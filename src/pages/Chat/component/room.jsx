import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Input } from "@tarojs/components";
import { AtInput } from "taro-ui";
import { connect } from "@tarojs/redux";
import { sendMsg } from "../../../actions/message";
import "./room.less";

const sendMessage = require("../../../assets/static/send.png");

@connect(
  ({ message }) => ({
    message,
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
    console.log("我发送一条消息");
    this.props.sendMsg(this.state.msg)
    this.setState({
        msg: ''
    })
  };

  handleChange = (value) => {
    console.log(value);
    this.setState({
      msg: value,
    });
  };

  renderMessage = (data) => {
    return (
      data &&
      data.length &&
      data.map((item) => {
        return <View key={item}>{item}</View>;
      })
    );
  };

  render() {
    const { roomName } = this.$router.params;
    const { msg } = this.state;
    const {
      message: { msgList },
    } = this.props;
    console.log(msg, "_____");
    return (
      <View className="room-warp">
        <View className="message-warp">
          {this.renderMessage(msgList)}
        </View>
        <View className="features">
          <View className="entry-warp">
            <AtInput
              type="text"
              placeholder="输入消息"
              onChange={this.handleChange}
              className="input-msg"
              value={msg}
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
