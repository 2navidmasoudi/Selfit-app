import React, { Component } from 'react';
import { Button, Card, CardItem, Icon, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import { reBasketBuffet } from '../../../redux/actions';
import { deleteOrderBuffet, getAllOrder } from '../../../services/orderBuffet';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid
}), {
  reBasketBuffet,
})
export default class FoodCard extends Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
  }
  async handleRemove() {
    try {
      const { tokenmember } = this.props.user;
      const { tokenapi } = this.props;
      const { idbasketbuffet } = this.props.food;
      const deletedOrder = await deleteOrderBuffet(idbasketbuffet, tokenmember, tokenapi);
      console.log(deletedOrder, 'deletedOrder?');
      const { Basket, PriceAll } = await getAllOrder(true, tokenmember, tokenapi, 30, 0);
      this.props.reBasketBuffet(Basket, Basket.length, PriceAll);
    } catch (e) {
      console.log(e);
      this.props.reBasketBuffet([], 0, 0);
    }
  }
  render() {
    const { food } = this.props;
    return (
      <Card>
        <Text style={{ flex: 1, textAlign: 'center', marginTop: 5 }}>{food.namemenufood}</Text>
        <CardItem>
          <Left style={{ flex: 1 }}>
            <Button bordered danger onPress={this.handleRemove}>
              <Icon name="close" />
            </Button>
          </Left>
          <Text style={{ flex: 1, textAlign: 'center' }}>
            تعداد: {persianNumber(food.numbermenufood)}
          </Text>
          <Right style={{ flex: 1 }}>
            <Text>
              قیمت کل: {persianNumber(food.pricemenufood.toLocaleString())}
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
