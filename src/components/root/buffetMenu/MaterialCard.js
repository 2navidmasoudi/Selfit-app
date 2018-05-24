import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Button, Card, CardItem, Grid, Left, Right, Row, Text, Thumbnail, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logError } from '../../../services/log';
import { deleteBuffetMaterial, getAllBuffetMaterial, postBuffetMaterial } from '../../../services/orderMaterial';

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
  onPressHandle(food) {
    console.log(food);
  }
  async RemoveButton() {
    const { food } = this.props;
    const result = await this._deleteBuffetMaterial(food);
    if (result == 1) {
      this.setState({ disableRemoveButton: true, disableAddButton: false });
      Toast.show({ text: `${food.namematerial} از لیست حذف شد.` });
    } else if (result == -6) {
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
      const result = await postBuffetMaterial(food.idmaterial, buffetid, true, 0, tokenmember, tokenapi);
      return result;
    } catch (error) {
      logError(error, '_postBuffetMaterial', 'BuffetMenu/MaterialCard', 'PostBuffetMaterial');
    }
  }
  async _deleteBuffetMaterial(food) {
    try {
      const { tokenapi, buffetid, tokenmember } = this.props;
      const MaterialList = await getAllBuffetMaterial(buffetid, false, tokenmember, tokenapi, 30, 0, false, 0);
      for (i = 0; i < MaterialList.length; i++) {
        if (food.idmaterial == MaterialList[i].idmaterial) {
          console.log('this is it:', MaterialList);
          const result = await deleteBuffetMaterial(MaterialList[i].idmaterial_buffet, tokenmember, tokenapi);
          return result;
        }
      }
      return -6;
    } catch (error) {
      logError(error, '_deleteBuffetMaterial', 'BuffetMenu/MaterialCard', 'DeleteBuffetMaterial');
    }
  }
  render() {
    const { food } = this.props;
    const ImgSrc = `http://selfit.ir/Resource/Material/${food.picmaterial}`;
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressHandle(food)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Thumbnail square large source={{ uri: ImgSrc }} onPress={() => Actions.showImage({ uri: ImgSrc })} />
              </TouchableWithoutFeedback>
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
          <CardItem>
            <Grid>
              <Row>
                <Button
                  danger
                  disabled={this.state.disableRemoveButton}
                  style={{ flex: 1, marginRight: 5 }}
                  onPress={this.RemoveButton.bind(this)}
                >
                  <Text style={{ flex: 1, textAlign: 'center' }}>حذف از لیست</Text>
                </Button>
                <Button
                  success
                  disabled={this.state.disableAddButton}
                  style={{ flex: 1, marginLeft: 5 }}
                  onPress={this.AddButton.bind(this)}
                >
                  <Text style={{ flex: 1, textAlign: 'center' }}>اضافه به لیست!</Text>
                </Button>
              </Row>
            </Grid>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
