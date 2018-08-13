import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, CardItem, Left, Right, Thumbnail, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logError } from '../../../services/log';
import { deleteBuffetMaterial, getAllBuffetMaterial, postBuffetMaterial } from '../../../services/orderMaterial';
import { Text } from '../../Kit';
import {persianNumber} from "../../../utils/persian";

@connect(state => ({
  user: state.user,
  tokenmember: state.user.tokenmember,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}))
export default class MaterialCard extends Component {
  state = {
    disableAddButton: false,
    disableRemoveButton: false,

  };

  async RemoveButton() {
    const { food } = this.props;
    const result = await this._deleteBuffetMaterial(food);
    if (result === 1) {
      this.setState({ disableRemoveButton: true, disableAddButton: false });
      Toast.show({ text: `${food.namematerial} از لیست حذف شد.` });
    } else if (result === -6) {
      this.setState({ disableRemoveButton: true, disableAddButton: false });
      Toast.show({ text: `${food.namematerial} قبلا از لیست حذف شده.` });
    }
  }

  async AddButton() {
    const { food } = this.props;
    const result = await this._postBuffetMaterial(food);
    if (result == 1) {
      this.setState({ disableAddButton: true, disableRemoveButton: false });
      Toast.show({ text: `${food.namematerial} به لیست اضافه شد.` });
    } else if (result == -6) {
      this.setState({ disableAddButton: true, disableRemoveButton: false });
      Toast.show({ text: `${food.namematerial} قبلا به لیست اضافه شده.` });
    }
  }

  async _postBuffetMaterial(food) {
    try {
      const { tokenapi, buffetid, tokenmember } = this.props;
      const result =
        await postBuffetMaterial(food.idmaterial, buffetid, true, 0, tokenmember, tokenapi);
      return result;
    } catch (error) {
      logError(error, '_postBuffetMaterial', 'BuffetMenu/MaterialCard', 'PostBuffetMaterial');
    }
  }

  async _deleteBuffetMaterial(food) {
    const { tokenapi, buffetid, tokenmember } = this.props;
    let result = null;
    try {
      const MaterialList =
        await getAllBuffetMaterial(buffetid, false, tokenmember, tokenapi, 120, 0);
      for (let i = 0; i < MaterialList.length; i++) {
        if (food.idmaterial === MaterialList[i].idmaterial) {
          console.log('this is it:', MaterialList);
          result =
            await deleteBuffetMaterial(MaterialList[i].idmaterial_buffet, tokenmember, tokenapi);
          return result;
        }
      }
    } catch (error) {
      logError(error, '_deleteBuffetMaterial', 'BuffetMenu/MaterialCard', 'DeleteBuffetMaterial');
    }
    return -6;
  }

  render() {
    const { food } = this.props;
    const ImgSrc = `http://selfit.ir/Resource/Material/${food.picmaterial}`;
    return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
              <Thumbnail
                square
                large
                source={{ uri: ImgSrc }}
                onPress={() => Actions.showImage({ uri: ImgSrc })}
              />
            </TouchableWithoutFeedback>
          </Left>
          <Right style={{ flex: 1 }}>
            <Text
              style={{ marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile' }}
            >{persianNumber(food.namematerial)}
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
    );
  }
}
