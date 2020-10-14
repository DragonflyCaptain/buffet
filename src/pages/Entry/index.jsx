import Taro, { Component, scanCode } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { AtInput, AtButton, AtList, AtListItem, AtMessage } from "taro-ui";
import { categoryList } from "../../common/category";
import * as api from "../../servers/servers";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      formData: {
        title: '', // 名字
        stock: 100,
        url: "https://source.unsplash.com/random",
        price: 0,
        category: "",
      },
      selector: categoryList,
      selectorChecked: "",
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "录入数据",
  };

  handleChange(value, field) {
    let obj = this.state.formData;
    obj[field] = value;
    if (field === "category") {
      let text = value.detail.value;
      obj[field] = categoryList[text];
    }
    this.setState({
      formData: obj,
    });
  }
  onSubmit = async () => {
    let obj = this.state.formData;
    if(!obj.title || obj.title === ''){
      return Taro.atMessage({
        'message': '输入必填项后提交',
        duration: 1000
      })
    }
    Taro.showLoading({
      title: "loading",
      mask: true,
    });
    Object.keys(obj).forEach((item) => {
      if (item === "stock" || item === "price") {
        obj[item] = parseInt(obj[item]);
      }
    });
    const { code } = await api.enterData_server(obj);
    if (code === 0) {
      this.setState({
        formData: {
          title: "", // 名字
          stock: 100,
          url: "https://source.unsplash.com/random",
          price: 0,
          category: "",
        },
      });
      Taro.hideLoading();
    }
  };

  onScanning = () => {
    scanCode({
      success: async res => {
        console.log(res, '_______')
        const { result } = res;
        const response = await api.scanningTwo(result, 'scanning')
        console.log(response, 'responseresponse')
        this.setState({
          formData: {
            title: response.result.goodsName , // 名字
            stock: 100,
            url: response.result.img,
            price: response.result.price,
            category: "",
          },
        })
      }
    })
  }

  render() {
    const { formData, selector } = this.state;
    const { title, stock, price, category, url } = formData;
    return (
      <View>
        <AtMessage />
        <AtInput
          name="title"
          title="名称"
          type="text"
          placeholder="商品名称"
          value={title}
          onChange={(value) => this.handleChange(value, "title")}
        />
        <AtInput
          name="stock"
          title="库存"
          type="text"
          placeholder="商品库存"
          value={stock}
          onChange={(value) => this.handleChange(value, "stock")}
        />
        <AtInput
          name="price"
          title="价格"
          type="text"
          placeholder="商品价格"
          value={price}
          onChange={(value) => this.handleChange(value, "price")}
        />
        <Picker
          name="category"
          mode="selector"
          range={selector}
          onChange={(e) => this.handleChange(e, "category")}
        >
          <AtList>
            <AtListItem title="类目" extraText={category} />
          </AtList>
        </Picker>
        <AtInput
          name="url"
          title="图片"
          type="text"
          placeholder="商品图片"
          value={url}
          onChange={(value) => this.handleChange(value, "url")}
        />
        <View>
          <AtButton style={{}} onClick={this.onScanning}>扫描</AtButton>
        </View>
        <AtButton onClick={this.onSubmit}>提交</AtButton>

      </View>
    );
  }
}
