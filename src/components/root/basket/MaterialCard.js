import React, { Component } from 'react';
import { Button, Card, CardItem, Icon, Left, Right, Text } from 'native-base';
import { connect } from 'react-redux';
import {
  deleteMixMaterial,
  getAllMixMaterial,
} from '../../../services/orderMaterial';
import { reBasketMaterial } from '../../../redux/actions';

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
    // const ImgSrc = `http://selfit.ir/Resource/Material/${Material.picmaterial}`;
    return (
      <Card>
        <CardItem header style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>{food.namematerial}</Text>
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Left style={{ flex: 1 }}>
            <Button onPress={this.handleRemove.bind(this)}>
              <Icon name="close" />
            </Button>
          </Left>
          <Text
            style={{ textAlign: 'center' }}
          >تعداد: {food.numbermaterial.toLocaleString('fa')}
          </Text>
          <Right style={{ flex: 1 }}>
            <Text
              style={{ textAlign: 'right' }}
            >قیمت: {food.pricematerial.toLocaleString('fa')}
            </Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
