import React, { Component } from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
import { Card, CardItem, Left, Right, Switch, Thumbnail } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logError } from '../../../services/log';
import { putActiveMenuFood } from '../../../services/buffet';
import { persianNumber } from '../../../utils/persian';
import { Text } from '../../Kit';
import {errorColor, mainColor} from '../../../assets/variables/colors';

@connect(state => ({
  user: state.user,
  tokenmember: state.user.tokenmember,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}))
export default class ActiveFood extends Component {
  state = {
    Active: null,
  };
  onPressHandle(food) {
    console.log(food);
  }
  async handleSwitch(value) {
    const result = await this.activeMenuFood(value);
    console.log('handleSwitch:', result);
    if (result === 1) { this.setState({ Active: value }); }
  }
  async activeMenuFood(active) {
    try {
      const { tokenapi, buffetid, tokenmember } = await this.props;
      const { idmenufood_buffet } = await this.props.food;
      const result =
        await putActiveMenuFood(buffetid, idmenufood_buffet, active, tokenmember, tokenapi);
      console.log('_activeMenuFood:', result);
      if (result === 1) return 1;
    } catch (error) {
      console.log(error);
      logError(error, 'putActiveMenuFood', 'BuffetMenu/activeMenuFood', 'activeMenuFood');
    }
    return 0;
  }
  render() {
    const { food } = this.props;
    const m = moment(`${food.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${food.httpserver}${food.pathserver}${ImgYear}/${ImgMonth}/${food.picmenufoodbuffet}`;
    const Active = this.state.Active === null ? food.active : this.state.Active;
    const YesOrNo = Active ? 'فعال در منو' : 'غیر فعال در منو';
    const color = Active ? '#000' : errorColor;
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressHandle(food)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Image
                  source={{ uri: ImgSrc }}
                  style={{ width: 50, height: 50, borderRadius: 5 }}
                  onPress={() => Actions.showImage({ uri: ImgSrc })}
                />
              </TouchableWithoutFeedback>
              <Switch
                value={Active}
                onValueChange={value => this.handleSwitch(value)}
                onTintColor={mainColor}
              />
              <Text style={{ color }}>{YesOrNo}</Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <Text
                style={{ marginRight: 10 }}
                type="bold"
              >{food.namemenufood}
              </Text>
              {food.descmenufoodbuffet &&
              <Text
                style={{ marginRight: 10 }}
              >{food.descmenufoodbuffet}
              </Text>}
              <Text
                type="light"
                style={{ marginRight: 10 }}
              >{persianNumber(food.pricemenufood.toLocaleString())} تومان
              </Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
