import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Card, CardItem, Left, Right, Switch, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logError } from '../../../services/log';
import { putActiveBuffetMaterial } from '../../../services/orderMaterial';
import { persianNumber } from '../../../utils/persian';
import {errorColor, mainColor} from '../../../assets/variables/colors';
import { Text } from '../../Kit';

@connect(state => ({
  user: state.user,
  tokenmember: state.user.tokenmember,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}))
export default class ActiveMaterial extends Component {
  state = {
    Active: null
  };
  onPressHandle(food) {
    console.log(food);
  }
  async handleSwitch(value) {
    const result = await this._activeBuffetMaterial(value);
    if (result === 1) { this.setState({ Active: value }); }
  }
  async _activeBuffetMaterial(active) {
    try {
      const { tokenapi, buffetid, tokenmember } = await this.props;
      const { idmaterial_buffet } = await this.props.food;
      const result =
        await putActiveBuffetMaterial(buffetid, idmaterial_buffet, active, tokenmember, tokenapi);
      if (result === 1) return 1;
    } catch (error) {
      console.log(error);
      logError(error, 'putActiveBuffetMaterial', 'BuffetMenu/activeMaterial', '_activeBuffetMaterial');
    }
    return 0;
  }

  render() {
    const { food } = this.props;
    const ImgSrc = `http://selfit.ir/Resource/Material/${food.picmaterial}`;
    const Active = this.state.Active === null ? food.active_material_buffet : this.state.Active;
    const YesOrNo = Active ? 'فعال در منو' : 'غیر فعال در منو';
    const color = Active ? '#000' : errorColor;
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressHandle(food)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Thumbnail
                  square
                  small
                  source={{ uri: ImgSrc }}
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
              >{persianNumber(food.namematerial)}
              </Text>
              <Text
                style={{ marginRight: 10 }}
                numberOfLines={1}
                ellipsizeMode="tail"
                note
              >{persianNumber(food.pricematerial.toLocaleString())} تومان
              </Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
