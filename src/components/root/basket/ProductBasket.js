import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Footer, FooterTab } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getBasketProduct } from '../../../services/orderProduct';
import AppHeader from '../../header';
import { reBasketProduct, setProductPriceAll, setRoad, tokenStore } from '../../../redux/actions';
import { logError } from '../../../services/log';
import ProductCard from './ProductCard';
import { getPayment } from '../../../services/payment';

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
  productBasket: state.basket.productBasket,
  Count: state.basket.productBasketCount,
  totalPrice: state.basket.PriceAllProduct,
}), {
  tokenStore,
  reBasketProduct,
  setRoad,
  setProductPriceAll,
})
export default class ProductBasket extends Component {
  state = {
    active: true,
    min: 0,
    max: 30,
    fsort: 0,
    ssort: false,
  };
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenStore('selfit.store');
    await this._getPayment();
    await this._getBasketProduct();
    await this.props.setRoad('Store');
  }
  async _getPayment() {
    const totalPrice = await getPayment(2, this.props.user.tokenmember, 'selfit.member');
    this.props.setProductPriceAll(totalPrice);
  }
  async _getBasketProduct() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { active, max, min, fsort, ssort } = await this.state;
      const Basket = await getBasketProduct(active, tokenmember, tokenapi, max, min, ssort, fsort);
      console.log(Basket, 'basket for Product!');
      this.props.reBasketProduct(Basket, Basket.length);
    } catch (e) {
      console.log(e);
      logError(e, '_getBasketProduct', 'DrawerLayout/index', 'getBasketProduct');
    }
  }
  renderProduct({ item }) {
    return <ProductCard product={item} />;
  }
  render() {
    const FooterComponent = (this.props.Count) === 0 ? null :
      (<Footer>
        <FooterTab>
          <Button
            style={{
              // paddingTop: 10,
              backgroundColor: '#0F9D7A'
            }}
            onPress={() => Actions.timeStore({ LeadFrom: 'Store' })}
          >
            {/* <Badge><Text>{(this.props.Count1 + this.props.Count2).toLocaleString('fa')}</Text></Badge> */}
            {/* <Icon name="basket" style={{color: 'white'}}/> */}
            <Text style={{
              fontFamily: 'IRANSansMobile',
              // fontSize: 18,
              color: 'white',
              // paddingTop: 12
            }}
            >انتخاب زمان
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
    return (
      <Container>
        <AppHeader rightTitle="سبد محصول" backButton="flex" />
        <Content padder>
          <Text style={{ textAlign: 'center' }}>سبد خرید</Text>
          <FlatList
            data={this.props.productBasket}
            renderItem={item => this.renderProduct(item)}
            keyExtractor={item => item.idproduct}
            scrollEnabled={false}
          />
          {/* <Button block onPress={this._getPayment.bind(this)}> */}
          {/* <Text>get</Text> */}
          {/* </Button> */}
          <Text>کل: {this.props.totalPrice}</Text>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
