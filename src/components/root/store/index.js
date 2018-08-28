import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Icon,
  Left,
  Right,
} from 'native-base';
import { connect } from 'react-redux';
import listToTree from 'list-to-tree-lite';
import { Actions } from 'react-native-router-flux';
import { Image, View } from 'react-native';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { tokenStore } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { getAllCategoryProduct } from '../../../services/categoryProduct';
import { persianNumber } from '../../../utils/persian';
import { Text } from '../../Kit';
import { mainColor, white } from '../../../assets/variables/colors';
import Loader from '../../loader';

const MaterialSource = 'https://selfit.ir/Resource/Material/';
@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
  Count: state.basket.productBasketCount,
}), {
  tokenStore,
})
export default class Store extends Component {
  constructor() {
    super();
    this.state = {
      productCategory: [],
      loading: true,
    };
    this.onItemPress = (item) => {
      Actions.categoryChildren({
        productCategory: item.children,
        categoryTitle: item.namecategory,
        idcategory: item.idcategory
      });
      console.log(item);
    };
  }
  componentWillMount() {
    this.setInfo();
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
  }

  async setInfo() {
    await this.props.tokenStore('selfit.store');
    await this.getCategoryProduct();
    await this.listToTree();
  }
  async getCategoryProduct() {
    try {
      this.setState({ loading: true });
      const { tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const productCategory =
        await getAllCategoryProduct(tokenmember, tokenapi, 150, 0, null);
      this.setState({
        productCategory
      });
    } catch (error) {
      this.setState({ loading: false });
      logError(error, 'getAllCategoryProduct', 'root/store', 'getCategoryProduct');
      console.log(error);
    }
  }
  async listToTree() {
    const { productCategory } = await this.state;
    const Tree = await listToTree(productCategory, {
      idKey: 'idcategory',
      parentKey: 'parentidcategory',
    });
    this.setState({ productCategory: Tree, loading: false });
  }
  render() {
    const FooterComponent = this.props.Count === 0 ? null : (
      <Footer>
        <FooterTab>
          <Button
            badge
            full
            style={{
              paddingTop: 15,
              backgroundColor: mainColor
            }}
            onPress={() => Actions.productBasket()}
          >
            <Badge style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: white }}>
                {persianNumber((this.props.Count).toLocaleString())}
              </Text>
            </Badge>
            <Icon name="basket" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>
              سبد سفارش
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
    return (
      <Container>
        <AppHeader rightTitle="فروشگاه" />
        <Content padder>
          <Card style={{ flex: 0 }}>
            <CardItem style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} header bordered>
              <Left style={{ flex: 1 }} />
              <Text
                type="bold"
                style={{ flex: 5, textAlign: 'center' }}
              >
                دسته بندی فروشگاه
              </Text>
              <Icon active name="cart" style={{ flex: 1 }} />
            </CardItem>
            {this.state.productCategory.map(c => (
              <CardItem
                button
                key={c.idcategory}
                bordered
                cardBody
                onPress={() => this.onItemPress(c)}
              >
                <Image
                  source={{ uri: `${MaterialSource}${c.piccategory}` }}
                  style={{ width: 50, height: 50, marginHorizontal: 10 }}
                />
                <Text style={{ flex: 5 }}>{c.namecategory}</Text>
                <Right style={{ flex: 1, alignItems: 'center' }}>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            ))}
          </Card>
          {this.state.loading &&
          <Loader loading={this.state.loading} />}
          <View style={{ margin: 20 }}>
            <Text>
              {'\u25c0 '}به فروشگاه سلفیت خوش آمدید.
              در کادر بالا دسته بندی هایی وجود دارد که با زدن هر کدوم از اونها محصول
              مورد نظر خودت رو میتونی فیلتر کنی.
            </Text>
            <Text>
              {'\n'}
            </Text>
            <Text>
              {'\u25c0 '}بطور مثال بر روی دسته بندی مواد غذایی کلیک کن تا فیلتر های بیشتری
              بهت نمایش داده بشه.
            </Text>
            <Text>
              {'\n'}
            </Text>
            <Text>
              {'\u25c0 '}فروشگاه سلفیت در سراسر تهران ظرف مدت یک روز با پیک رایگان
              سفارشت رو بهت تحویل میده.
              ضمانت کیفیت و سلامت سفارش بدون قید و شرط!
            </Text>
          </View>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
