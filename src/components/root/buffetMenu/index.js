import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, Container, CardItem, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { selectBuffet, tokenBuffet } from '../../../redux/actions/index';
import { logError } from '../../../services/log';
import { putCheckToken } from '../../../services';
import { getSingleIDMemberBuffet } from '../../../services/buffet';
import { Text } from '../../Kit';
import { darkColor, mainColor } from '../../../assets/variables/colors';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
  naembuffet: state.buffet.namebuffet,
}), {
  tokenBuffet,
  selectBuffet,
})
export default class FoodList extends Component {
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.setInfo();
  }
  async setInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    const buffetInfo = await this.getSingleIDMember();
    await this.props.selectBuffet(buffetInfo.idbuffet, buffetInfo.namebuffet);
    console.log('buffet for this user:', buffetInfo.namebuffet, 'buffetid from props:', this.props.buffetid);
  }
  async getSingleIDMember() {
    try {
      const { tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      return await getSingleIDMemberBuffet(tokenmember, tokenapi);
    } catch (error) {
      console.log(error);
      logError(error, 'getSingleIDMember', 'BuffetMenu/index', 'getSingleIDMember');
    }
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="منو بوفه" backButton="flex" />
        <View style={{ flex: 1 }}>
          <Card style={{ flex: 1 }}>
            <CardItem>
              <Right style={{ flex: 1 }}>
                <Text>
                  {'\u25c0 '}با زدن دکمه منو انتخابی میتونید از مواد اولیه به منو انتخابی خودتون اضافه کنید.
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Right style={{flex: 1}}>
                <Text>
                  {'\u25c0 '}با زدن دکمه وضعیت غذاهای منو میتونید غذا های منو خودتون رو روشن یا خاموش کنید.
                </Text>
              </Right>
            </CardItem>
          </Card>
          <Card style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flex: 1, display: this.props.user.typememberid === 1 ? 'flex' : 'none' }}
              onPress={() => Actions.addFood()}
            >
              <View style={{
                flex: 1,
                backgroundColor: mainColor,
                borderRadius: 10,
                borderWidth: 4,
                margin: 10,

                borderColor: darkColor,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <Text style={{ color: 'white', textAlign: 'center', padding: 20 }}>
                  ویرایش منو غذاهای آماده
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => Actions.addMaterial()}
            >
              <View style={{
              flex: 1,
              backgroundColor: mainColor,
              borderRadius: 10,
              borderWidth: 4,
              borderColor: darkColor,
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
              >
                <Text style={{ color: 'white', textAlign: 'center', padding: 20 }}>
                  ویرایش منو غداهای انتخابی
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
          <Card style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => Actions.listMaterial()}
            >
              <View style={{
                flex: 1,
                backgroundColor: mainColor,
                borderRadius: 10,
                borderWidth: 4,
                borderColor: darkColor,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <Text style={{ color: 'white', textAlign: 'center', padding: 20 }}>
                  وضعیت غذا های انتخابی منو
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => Actions.listFood()}
            >
              <View style={{
                flex: 1,
                backgroundColor: mainColor,
                borderRadius: 10,
                borderWidth: 4,
                borderColor: darkColor,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <Text style={{ color: 'white', textAlign: 'center', padding: 20 }}>
                  وضعیت غذا های آماده منو
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </Container>
    );
  }
}
