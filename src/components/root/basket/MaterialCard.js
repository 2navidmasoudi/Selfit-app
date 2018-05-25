import React, { Component } from 'react';
import { Button, Card, CardItem, Icon, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import {
  deleteMixMaterial,
  getAllMixMaterial,
} from '../../../services/orderMaterial';
import { reBasketMaterial } from '../../../redux/actions';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
  idbasket: state.basket.idbasket,
}), {
  reBasketMaterial,
})
export default class MaterialCard extends Component {
  state = {
    ssort: false,
    fsort: 0,
    max: 30,
    min: 0,
    state: false,
    numberbuffet: 0,
  };
  // TODO: ADD AND REMOVE NOT WORKING FOR MATERIAL
  async handleRemove() {
    try {
      const { tokenmember } = this.props.user;
      const { tokenapi, food } = this.props;
      const { idbasketbuffet } = this.props.food;
      const { max, min, ssort, fsort, state } = await this.state;
      const deletedOrder = await deleteMixMaterial(food.idmixmaterial, tokenmember, tokenapi);
      console.log(deletedOrder, 'deletedOrder?');
      const {
        Basket,
        PriceAll
      } = await getAllMixMaterial(0, state, tokenmember, tokenapi, max, min, ssort, fsort);
      this.props.reBasketMaterial(Basket, Basket.length, PriceAll);
    } catch (e) {
      console.log(e);
      this.props.reBasketMaterial([], 0);
    }
  }
  render() {
    const { food } = this.props;
    return (
      <Card>
        <Text style={{ flex: 1, textAlign: 'center', marginTop: 5 }}>{food.namematerial}</Text>
        <CardItem>
          <Left style={{ flex: 1 }}>
            <Button bordered danger onPress={this.handleRemove.bind(this)}>
              <Icon name="close" />
            </Button>
          </Left>
          <Text style={{ flex: 1, textAlign: 'center' }}>
            تعداد: {persianNumber(food.numbermaterial)}
          </Text>
          <Right style={{ flex: 1 }}>
            <Text>
              قیمت کل: {persianNumber(food.pricematerial.toLocaleString())}
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
