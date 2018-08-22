import React, { Component } from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import { Button, Card, CardItem, Left, Right, Toast } from 'native-base';
import moment from 'moment-jalaali';
import { connect } from 'react-redux';
import { deleteMenuFood, getMenuFood, postMenuFoodBuffet } from '../../../services/buffet';
import { logError } from '../../../services/log';
import { persianNumber } from '../../../utils/persian';
import { Text } from '../../Kit';

@connect(state => ({
  user: state.user,
  tokenmember: state.user.tokenmember,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}))
export default class FoodCard extends Component {
  state = {
    disableAddButton: false,
    disableRemoveButton: false,
  };
  onPressHandle(food) {
    console.log(food);
  }
  async RemoveButton() {
    const { food } = this.props;
    const result = await this._deleteMenuFood(food);
    if (result === 1) {
      this.setState({ disableRemoveButton: true, disableAddButton: false });
      Toast.show({ text: `${food.namemenufood} از لیست حذف شد.` });
    } else if (result === -6) {
      this.setState({ disableRemoveButton: true, disableAddButton: false });
      Toast.show({ text: `${food.namemenufood} قبلا از لیست حذف شده.` });
    }
  }
  async AddButton() {
    const { food } = this.props;
    const result = await this._postMenuFood(food);
    if (result === 1) {
      this.setState({ disableAddButton: true, disableRemoveButton: false });
      Toast.show({ text: `${food.namemenufood} به لیست اضافه شد.` });
    } else if (result === -6) {
      this.setState({ disableAddButton: true, disableRemoveButton: false });
      Toast.show({ text: `${food.namemenufood} قبلا به لیست اضافه شده.` });
    }
  }
  async _postMenuFood(food) {
    try {
      const { tokenapi, buffetid, tokenmember } = this.props;
      const result = await postMenuFoodBuffet(buffetid, food.idmenufood, true, tokenmember, tokenapi);
      console.log(result);
      return result;
    } catch (error) {
      logError(error, '_postMenuFood', 'BuffetMenu/FoodCard', 'postMenuFoodBuffet');
    }
  }
  async _deleteMenuFood(food) {
    try {
      const { tokenapi, buffetid, tokenmember } = this.props;
      const MenuFoodList = await getMenuFood(buffetid, 0, tokenmember, tokenapi, 50, 0, false, 0);
      console.log(MenuFoodList);
      for (let i = 0; i < MenuFoodList.length; i++) {
        if (food.idmenufood === MenuFoodList[i].idmenufood) {
          console.log('this is it:', MenuFoodList[i]);
          const result =
            await deleteMenuFood(MenuFoodList[i].idmenufood_buffet, tokenmember, tokenapi);
          console.log(result);
          return result;
        }
      }
      return -6;
    } catch (error) {
      console.log(error);
      logError(error, '_deleteMenuFood', 'BuffetMenu/FoodCard', 'DeleteBuffetMaterial');
    }
  }
  render() {
    const { food } = this.props;
    const m = moment(`${food.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${food.httpserver}${food.pathserver}${ImgYear}/${ImgMonth}/${food.picmenufood}`;
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressHandle(food)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <Image source={{ uri: ImgSrc }} style={{ width: 75, height: 75, borderRadius: 7 }} />
            </Left>
            <Right style={{ flex: 1 }}>
              <Text
                style={{ marginRight: 10 }}
                type="bold"
              >{food.namemenufood}
              </Text>
              <Text
                style={{ marginRight: 10 }}
              >{persianNumber(food.pricemenufood.toLocaleString())} تومان
              </Text>
            </Right>
          </CardItem>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Button
              danger
              disabled={this.state.disableRemoveButton}
              style={{ flex: 1, margin: 5 }}
              onPress={this.RemoveButton.bind(this)}
            >
              <Text style={{ flex: 1, textAlign: 'center', color: '#FFF' }}>حذف از لیست</Text>
            </Button>
            <Button
              success
              disabled={this.state.disableAddButton}
              style={{ flex: 1, margin: 5 }}
              onPress={this.AddButton.bind(this)}
            >
              <Text style={{ flex: 1, textAlign: 'center', color: '#FFF' }}>افزودن به لیست</Text>
            </Button>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
