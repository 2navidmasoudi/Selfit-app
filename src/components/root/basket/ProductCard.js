import React, { Component } from 'react';
import { Button, Card, CardItem, Icon, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import { reBasketProduct, setProductPriceAll } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { deleteBasketProduct, getBasketProduct } from '../../../services/orderProduct';
import { getPayment } from '../../../services/payment';
import { persianNumber } from '../../../utils/persian';
import { Text } from '../../Kit';

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
}), {
  reBasketProduct,
  setProductPriceAll,
})
export default class ProductCard extends Component {
  async _getPayment() {
    let totalPrice = await getPayment(2, this.props.user.tokenmember, 'selfit.member');
    if (!totalPrice) totalPrice = 0;
    this.props.setProductPriceAll(totalPrice);
  }
  async handleRemove() {
    try {
      const { product, tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const deletedOrder = await deleteBasketProduct(product.idbasket, tokenmember, tokenapi);
      console.log(deletedOrder, 'deleted?');
      const Basket = await getBasketProduct(true, tokenmember, tokenapi, 30, 0);
      this.props.reBasketProduct(Basket, Basket.length);
      this._getPayment();
    } catch (error) {
      console.log(error);
      logError(error, 'handleRemove', 'basket/ProductCard', 'deleteBasketProduct');
    }
  }
  render() {
    const { product } = this.props;
    const totalPrice = (product.priceproduct * product.numberbasket).toLocaleString();
    return (
      <Card>
        <CardItem>
          <Text style={{ flex: 1, textAlign: 'center' }}>{persianNumber(product.titleproduct)}</Text>
        </CardItem>
        <CardItem>
          <Left style={{ flex: 1 }}>
            <Button danger bordered onPress={this.handleRemove.bind(this)}>
              <Icon name="close" />
            </Button>
          </Left>
          <Text style={{ flex: 1, textAlign: 'center' }}>
            تعداد:{' '}{persianNumber(product.numberbasket)}
          </Text>
          <Right style={{ flex: 1 }}>
            <Text>
              قیمت کل:{' '}{persianNumber(totalPrice)}
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
