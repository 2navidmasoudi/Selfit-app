import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Card, CardItem, Left, Right, Switch, Text, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logError } from '../../../services/log';
import { putActiveBuffetMaterial } from '../../../services/orderMaterial';

@connect(state => ({
  user: state.user,
  tokenmember: state.user.tokenmember,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}))
export default class ActiveMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Active: this.props.food.active_material_buffet,
    };
  }
  onPressHandle(food) {
    console.log(food);
  }
  async handleSwitch(value) {
    const result = await this._activeBuffetMaterial(value);
    console.log('handleSwitch:', result);
    if (result == 1) { this.setState({ Active: value }); }
  }
  async _activeBuffetMaterial(active) {
    try {
      const { tokenapi, buffetid, tokenmember } = await this.props;
      const { idmaterial_buffet } = await this.props.food;
      const result = await putActiveBuffetMaterial(buffetid, idmaterial_buffet, active, tokenmember, tokenapi);
      console.log('putActiveBuffetMaterial:', result);

      if (result == 1) return 1;
    } catch (error) {
      console.log(error);
      logError(error, 'putActiveBuffetMaterial', 'BuffetMenu/activeMaterial', '_activeBuffetMaterial');
    }
  }

  render() {
    const { food } = this.props;
    const ImgSrc = `http://selfit.ir/Resource/Material/${food.picmaterial}`;
    const YesOrNo = this.state.Active ? 'فعال در منو' : 'غیر فعال در منو';
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressHandle(food)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Thumbnail square small source={{ uri: ImgSrc }} onPress={() => Actions.showImage({ uri: ImgSrc })} />
              </TouchableWithoutFeedback>
              <Switch
                value={this.state.Active}
                onValueChange={value => this.handleSwitch(value)}
              />
              <Text>{YesOrNo}</Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <Text
                style={{ marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile' }}
              >{food.namematerial}
              </Text>
              <Text
                style={{ marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile' }}
                numberOfLines={1}
                ellipsizeMode="tail"
                note
              >{food.pricematerial.toLocaleString('fa')} تومان
              </Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
