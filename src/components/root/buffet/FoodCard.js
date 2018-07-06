import React, { Component } from 'react';
import { Image, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, CardItem, Icon, Left, Right } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { reBasketBuffet } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { deleteOrderBuffet, getAllOrder, postOrderBuffet } from '../../../services/orderBuffet';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}), {
  reBasketBuffet,
})
export default class FoodCard extends Component {
  state = {
    numberbuffet: 0,
  };
  async _rebasketBuffet() {
    try {
      const { tokenapi } = await this.props;
      const { tokenmember } = this.props.user;
      const { Basket, PriceAll } = await getAllOrder(true, tokenmember, tokenapi, 50, 0);
      this.props.reBasketBuffet(Basket, Basket.length, PriceAll);
    } catch (error) {
      console.log(error);
    }
  }
  async removeButtonHandle() {
    try {
      this.setState({
        numberbuffet: 0
      });
      const { MenuFood, tokenapi } = await this.props;
      const { tokenmember } = this.props.user;
      let deletedOrder;
      const { Basket, PriceAll } = await getAllOrder(true, tokenmember, tokenapi, 50, 0);
      console.log(Basket, 'asdasdasd');
      for (let i = 0; i < Basket.length; i++) {
        if (MenuFood.menufoodid == Basket[i].menufoodid) {
          deletedOrder = await deleteOrderBuffet(Basket[i].idbasketbuffet, tokenmember, tokenapi);
          console.log('this is it!', Basket[i], 'deleted?', deletedOrder);
          break;
        }
      }
      this._rebasketBuffet();
    } catch (error) {
      console.log(error);
      logError(error, 'removeButtonHandle', 'buffet/FoodCard', 'deleteOrderBuffet');
      this.props.reBasketBuffet([], 0, 0);
    }
  }
  async addButtonHandle() {
    if (!this.props.active) return;
    try {
      const { numberbuffet } = this.state;
      const { MenuFood } = this.props;
      const { tokenmember } = this.props.user;
      const { tokenapi, buffetid } = this.props;
      this.setState({
        numberbuffet: numberbuffet + 1
      });
      const result = await postOrderBuffet(buffetid, MenuFood.menufoodid, numberbuffet + 1, tokenmember, tokenapi);
      console.log('postOrderBuffet for', numberbuffet, MenuFood.menufoodid, MenuFood.pricemenufood, result);
      this._rebasketBuffet();
    } catch (error) {
      console.log(error);
      logError(error, 'addButtonHandle', 'buffet/FoodCard', 'postOrderBuffet');
    }
  }
  render() {
    const { MenuFood } = this.props;
    const m = moment(`${MenuFood.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${MenuFood.httpserver}${MenuFood.pathserver}${ImgYear}/${ImgMonth}/${MenuFood.picmenufood}`;
    return (
      <TouchableOpacity
        disabled={!MenuFood.active}
        onPress={() => this.addButtonHandle()}
        style={{ display: MenuFood.active ? 'flex' : 'none' }}
      >
        <Card>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Image
                  source={{ uri: ImgSrc }}
                  style={{ flex: 1, borderRadius: 10, height: 100, width: null, resizeMode: 'cover' }}
                  onPress={() => Actions.showImage({ uri: ImgSrc })}
                />
              </TouchableWithoutFeedback>
            </Left>
            <Right style={{ flex: 2 }}>
              <Text>
                {MenuFood.namemenufood}
              </Text>
              <Text type="light">
                {persianNumber(MenuFood.pricemenufood.toLocaleString())} تومان
              </Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <Button
                  bordered={this.state.numberbuffet !== 0}
                  style={{ marginLeft: 10, display: this.state.numberbuffet <= 0 ? 'none' : 'flex' }}
                  danger
                  onPress={() => this.removeButtonHandle()}
                >
                  <Icon name="close-circle" />
                </Button>
                <Text style={{
                  paddingHorizontal: 10,
                  textAlign: 'right',
                  fontFamily: 'IRANSansMobile',
                  display: this.state.numberbuffet <= 0 ? 'none' : 'flex'
                }}
                >
                  {persianNumber(this.state.numberbuffet)}
                </Text>
                <Button
                  disabled={!MenuFood.active}
                  success={MenuFood.active}
                  bordered={MenuFood.active}
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
