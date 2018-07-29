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
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { tokenStore } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { getAllCategoryProduct } from '../../../services/categoryProduct';
import { persianNumber } from '../../../utils/persian';
import { Text } from '../../Kit';
import { mainColor, white } from '../../../assets/variables/colors';

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
  Count: state.basket.productBasketCount,
}), {
  tokenStore,
})
export default class Store extends Component {
  state = {
    productCategory: [],
    max: 150,
    min: 0,
    ssort: false,
    fsort: 0,
  };
  componentWillMount() {
    this.setInfo();
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
  }
  onItemPress(item) {
    Actions.categoryChildren({
      productCategory: item.children,
      categoryTitle: item.namecategory,
      idcategory: item.idcategory
    });
    console.log(item);
  }
  async setInfo() {
    await this.props.tokenStore('selfit.store');
    await this._getCategoryProduct();
    await this._listToTree();
  }
  async _listToTree() {
    const { productCategory } = await this.state;
    const Tree = await listToTree(productCategory, {
      idKey: 'idcategory',
      parentKey: 'parentidcategory',
      // childrenKey: childrenKey,
    });
    console.log(productCategory, 'productCategory');
    this.setState({ productCategory: Tree });
  }
  async _getCategoryProduct() {
    try {
      const { tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const { max, min, ssort, fsort } = await this.state;
      const productCategory =
        await getAllCategoryProduct(tokenmember, tokenapi, max, min, ssort, fsort);
      console.log(productCategory);
      this.setState({
        productCategory
      });
    } catch (error) {
      logError(error, 'getAllCategoryProduct', 'root/store', '_getCategoryProduct');
      console.log(error);
    }
  }
  render() {
    const FooterComponent = this.props.Count === 0 ? null :
      (<Footer>
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
        <AppHeader rightTitle="فروشگاه" backButton="flex" />
        <Content>
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
                onPress={() => this.onItemPress(c)}
              >
                <Text style={{ flex: 5 }}>{c.namecategory}</Text>
                <Right style={{ flex: 1, alignItems: 'center' }}>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            ))}
          </Card>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
