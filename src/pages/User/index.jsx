import Taro, { Component, scanCode } from "@tarojs/taro";
import { View, Camera, Text } from "@tarojs/components";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      typeContent: "",
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "我的",
  };

  handleScanCode () {
      console.log(123123)
      scanCode(params).then(res=>{
          console.log(res)
      })
    //   console.log(scanCode, '111')
  }

  render() {
    return (
      <View className="home">
        UserPage
        <Button onclick={()=>this.handleScanCode()}>
            扫描
        </Button>
        {/* <Camera
        //   className="scan-camera"
          mode="scanCode"
          onError={this.handleScanError}
          onScanCode={this.handleScanCode}
          frameSize="small"
          resolution="high"
        ></Camera> */}
      </View>
    );
  }
}

