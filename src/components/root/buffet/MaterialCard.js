import React, { Component } from 'react';
import { Image, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, CardItem, Icon, Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logError } from '../../../services/log';
import { deleteMixMaterial, getAllMixMaterial, postMixMaterial } from '../../../services/orderMaterial';
import { reBasketMaterial } from '../../../redux/actions';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
  idbasket: state.basket.idbasket,
  materialBasket: state.basket.materialBasket,
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
  async removeButtonHandle() {
    try {
      this.setState({
        numberbuffet: 0
      });
      const { Material, tokenapi, idbasket } = await this.props;
      const { tokenmember } = await this.props.user;
      const { max, min, ssort, fsort, state } = await this.state;
      let deletedOrder;
      // let FoodOrdered = await getAllMixMaterial(0,state, tokenmember, tokenapi, max, min, ssort, fsort);
      const FoodOrdered = await this.props.materialBasket;
      console.log(FoodOrdered);
      for (i = 0; i < FoodOrdered.length; i++) {
        if (Material.idmaterial == FoodOrdered[i].idmaterial) {
          // TODO: DeleteMixMaterial
          deletedOrder = await deleteMixMaterial(FoodOrdered[i].idmixmaterial, tokenmember, tokenapi);
          console.log('this is it!', FoodOrdered[i], 'deleted?', deletedOrder);
          break;
        }
      }
      const {
        Basket,
        PriceAll
      } = await getAllMixMaterial(0, state, tokenmember, tokenapi, max, min, ssort, fsort);
      this.props.reBasketMaterial(Basket, Basket.length, PriceAll);
    } catch (error) {
      console.log(error);
      logError(error, 'removeButtonHandle', 'buffet/MaterialCard', 'deleteOrderBuffet');
    }
  }
  async addButtonHandle() {
    try {
      const { numberbuffet } = this.state;
      this.setState({
        numberbuffet: numberbuffet + 1
      });
      const { Material, idbasket, tokenapi, } = await this.props;
      const { tokenmember } = await this.props.user;
      const { max, min, ssort, fsort, state } = await this.state;
      const result = await postMixMaterial(idbasket, Material.idmaterial, numberbuffet + 1, tokenmember, tokenapi);
      console.log('postOrderBuffet for', numberbuffet, Material.idmaterial, Material.pricematerial, result);
      const { Basket, PriceAll } = await getAllMixMaterial(0, state, tokenmember, tokenapi, max, min, ssort, fsort);
      this.props.reBasketMaterial(Basket, Basket.length, PriceAll);
    } catch (error) {
      console.log(error);
      logError(error, 'addButtonHandle', 'buffet/MaterialCard', 'postMixMaterial');
    }
  }
  render() {
    const { Material } = this.props;
    const ImgSrc = `http://selfit.ir/Resource/Material/${Material.picmaterial}`;
    return (
      <TouchableOpacity
        disabled={!Material.active_material_buffet}
        onPress={() => this.addButtonHandle()}
        style={{ display: Material.active_material_buffet ? 'flex' : 'none' }}
      >
        <Card>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Image
                  source={{ uri: ImgSrc }}
                  style={{ flex: 1, height: 100, width: null, resizeMode: 'cover' }}
                  onPress={() => Actions.showImage({ uri: ImgSrc })}
                />
              </TouchableWithoutFeedback>
            </Left>
            <Right style={{ flex: 2 }}>
              <Text>
                {Material.namematerial}
              </Text>
              <Text type="light">
                {persianNumber(Material.pricematerial.toLocaleString())} تومان
              </Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <Button
                  bordered={this.state.numberbuffet !== 0}
                  style={{
                          marginLeft: 10,
                          display: this.state.numberbuffet <= 0 ? 'none' : 'flex'
                        }}
                  danger
                  onPress={() => this.removeButtonHandle()}
                >
                  <Icon name="close-circle" />
                </Button>
                <Text style={{
                  paddingHorizontal: 10,
                  display: this.state.numberbuffet <= 0 ? 'none' : 'flex'
                }}
                >
                  {persianNumber(this.state.numberbuffet)}
                </Text>
                <Button
                  disabled={!Material.active_material_buffet}
                  success={Material.active_material_buffet}
                  bordered={Material.active_material_buffet}
                  onPress={() => this.addButtonHandle()}
                >
                  <Icon name="add-circle" />
                </Button>
              </View>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
