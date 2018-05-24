import React, { Component } from 'react';
import { Button, Card, CardItem, Icon, Left, Right, Text } from 'native-base';
import { connect } from 'react-redux';
import { reBasketProduct, setProductPriceAll } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { deleteBasketProduct, getBasketProduct } from '../../../services/orderProduct';
import { getPayment } from '../../../services/payment';

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
}), {
  reBasketProduct,
  setProductPriceAll,
})
export default class ProductCard extends Component {
  async _getPayment() {
    const totalPrice = await getPayment(2, this.props.user.tokenmember, 'selfit.member');
    this.props.setProductPriceAll(totalPrice);
  }
  async handleRemove() {
    try {
      const { product, tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const deletedOrder = await deleteBasketProduct(product.idbasket, tokenmember, tokenapi);
      console.log(deletedOrder, 'deleted?');
      const Basket = await getBasketProduct(true, tokenmember, tokenapi, 30, 0, false, 0);
      this.props.reBasketProduct(Basket, Basket.length);
      this._getPayment();
    } catch (error) {
      console.log(error);
      logError(error, 'handleRemove', 'basket/ProductCard', 'deleteBasketProduct');
    }
  }
  render() {
    const { product } = this.props;
    // const m = moment(`${product.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    // const jM = m.format('jYYYY/jMM');
    // const ImgYear = m.jYear();
    // const ImgMonth = m.jMonth() + 1;
    // const ImgSrc = `${product.httpserver}${product.pathserver}${ImgYear}/${ImgMonth}/${product.picproduct}`;
    return (
      <Card>
        <CardItem header style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>{product.titleproduct}</Text>
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={this.handleRemove.bind(this)}>
              <Icon name="close" />
            </Button>
          </Left>
          <Text style={{ textAlign: 'center' }}>
            تعداد: {product.numberbasket.toLocaleString('fa')}
          </Text>
          <Right style={{ flex: 1 }}>
            <Text style={{ textAlign: 'right' }}>
              قیمت:{(product.priceproduct * product.numberbasket).toLocaleString('fa')}
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
