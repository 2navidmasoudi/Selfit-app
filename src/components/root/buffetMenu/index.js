import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { selectBuffet, tokenBuffet } from '../../../redux/actions/index';
import { logError } from '../../../services/log';
import { putCheckToken } from '../../../services';
import {getSingleIDMember, getSingleIDMemberBuffet} from '../../../services/buffet';
import { Text } from '../../Kit';
import { darkColor, mainColor } from '../../../assets/variables/colors';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
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
    const buffetInfo = await this._getSingleIDMember();
    await this.props.selectBuffet(buffetInfo.idbuffet);
    console.log('buffet for this user:', buffetInfo.namebuffet, 'buffetid from props:', this.props.buffetid);
  }
  async _getSingleIDMember() {
    try {
      const { tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      return await getSingleIDMemberBuffet(tokenmember, tokenapi);
    } catch (error) {
      console.log(error);
      logError(error, '_getSingleIDMember', 'BuffetMenu/index', 'getSingleIDMember');
    }
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="منو بوفه" backButton="flex" />
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => Actions.addFood()}
          >
            <View style={{
              flex: 1,
              backgroundColor: mainColor,
              borderRadius: 10,
              borderWidth: 4,
              borderColor: darkColor,
              margin: 10
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>ویرایش منو غذاهای آماده</Text>
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
              margin: 10
            }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>ویرایش منو غداهای انتخابی</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => Actions.menuList()}
          >
            <View style={{
              flex: 1,
              backgroundColor: mainColor,
              borderRadius: 10,
              borderWidth: 4,
              borderColor: darkColor,
              margin: 10
            }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>وضعیت غذا های منو</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
