import React, { Component } from 'react';
import { Button, Card, CardItem, Icon, Left, Right, Text } from 'native-base';
import { connect } from 'react-redux';
import { reBasketBuffet } from '../../../redux/actions';
import { deleteOrderBuffet, getAllOrder } from '../../../services/orderBuffet';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid
}), {
  reBasketBuffet,
})
export default class FoodCard extends Component {
  async handleRemove() {
    try {
      const { tokenmember } = this.props.user;
      const { tokenapi } = this.props;
      const { idbasketbuffet } = this.props.food;
      const deletedOrder = await deleteOrderBuffet(idbasketbuffet, tokenmember, tokenapi);
      console.log(deletedOrder, 'deletedOrder?');
      const { Basket, PriceAll } = await getAllOrder(true, false, tokenmember, tokenapi, 30, 0);
      this.props.reBasketBuffet(Basket, Basket.length, PriceAll);
    } catch (e) {
      console.log(e);
      this.props.reBasketBuffet([], 0);
    }
  }
  render() {
    const { food } = this.props;
    return (
      <Card >
        <CardItem header style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>{food.namemenufood}</Text>
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={this.handleRemove.bind(this)}>
              <Icon name="close" />
            </Button>
          </Left>
          <Text
            style={{ textAlign: 'center' }}
          >
            تعداد: {food.numbermenufood.toLocaleString('fa')}
          </Text>
          <Right style={{ flex: 1 }}>
            <Text
              style={{ textAlign: 'right' }}
            >
              قیمت: {food.pricemenufood.toLocaleString('fa')}
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
