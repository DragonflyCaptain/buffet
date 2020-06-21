import Taro, { Component } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { AtInput, AtButton, AtList, AtListItem } from "taro-ui";
import { categoryList } from "../../common/category";
import * as api from "../../servers/servers";

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      formData: {
        title: "", // 名字
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
    console.log(value, field);
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
      console.log(code);
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

  render() {
    const { formData, selector } = this.state;
    const { title, stock, price, category, url } = formData;
    console.log(formData);
    return (
      <View>
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
        <AtButton onClick={this.onSubmit}>提交</AtButton>
      </View>
    );
  }
}
