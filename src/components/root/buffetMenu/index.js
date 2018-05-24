import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { selectBuffet, tokenBuffet } from '../../../redux/actions/index';
import { logError } from '../../../services/log';
import { putCheckToken } from '../../../services';
import { form } from '../../../assets/styles/index';
import { getSingleIDMember } from '../../../services/buffet';

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
      const BuffetKeeperInfo = await getSingleIDMember(tokenmember, tokenapi);
      return BuffetKeeperInfo;
      // this.props.selectBuffet(BuffetKeeperInfo.idbuffet);
    } catch (error) {
      console.log(error);
      logError(error, '_getSingleIDMember', 'BuffetMenu/index', 'getSingleIDMember');
    }
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="منو بوفه" backButton="flex" />
        <View style={{ flex: 1, padding: 10 }}>
          <View style={{ flex: 3 }} />
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button
              full
              style={[form.submitButton, { marginTop: 10 }]}
              onPress={() => Actions.addFood()}
            >
              <Text style={{ color: 'white', fontSize: 16, fontFamily: 'IRANSansMobile' }}>اضافه به منو آماده</Text>
            </Button>
            <Button
              full
              style={[form.submitButton, { marginTop: 10 }]}
              onPress={() => Actions.addMaterial()}
            >
              <Text style={{ color: 'white', fontSize: 16, fontFamily: 'IRANSansMobile' }}>اضافه به منو انتخابی</Text>
            </Button>
            <Button
              full
              style={[form.submitButton, { marginTop: 10 }]}
              onPress={() => Actions.menuList()}
            >
              <Text style={{ color: 'white', fontSize: 16, fontFamily: 'IRANSansMobile' }}>لیست غذا های بوفه</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}
