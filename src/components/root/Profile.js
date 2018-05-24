import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { Button, Container, Text, View } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import { Base64 } from 'js-base64';
import { Actions } from 'react-native-router-flux';
import { form } from '../../assets/styles/index';
import AppHeader from '../header';

import { getSingleToken, putUserLogout } from '../../services';
import { setUser } from '../../redux/actions';
import { logError } from '../../services/log';

moment.loadPersian({ dialect: 'persian-modern' });

@connect(state => ({
  user: state.user,
}), {
  setUser,
})
export default class Profile extends Component {
  componentWillMount() {
    this._getSingleToken();
  }
  async _getSingleToken() {
    try {
      const { tokenmember, tokenapi } = this.props.user;
      const json = await getSingleToken(tokenmember, tokenapi);
      await this.props.setUser(json.MemberSingleToken);
    } catch (error) {
      console.log(error);
      logError(error, '_getSingleToken', 'root/Profile', 'getSingleToken');
    }
  }
  async _putUserLogout() {
    try {
      const { tokenapi, tokenmember } = await this.props.user;
      const json = await putUserLogout(tokenmember, tokenapi);
      if (json === 1) {
        Actions.reset('sign');
      } else {
        alert('خطا در خروج از حساب کاربری!');
      }
    } catch (error) {
      console.log(error);
      logError(error, '_putUserLogout', 'root/Profile', 'putUserLogout');
    }
  }
  render() {
    const {
      namefamilymember, mailmember, birthdaymember, phone,
      datesave, httpserver, pathserver, picmember
    } = this.props.user;
    const m = moment(`${datesave}`, 'YYYY-MM-DDTHH:mm:ss');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${Base64.decode(httpserver)}${Base64.decode(pathserver)}${ImgYear}/${ImgMonth}/${picmember}`;
    const jalaliBirthDay = birthdaymember === null ? '?' : moment(birthdaymember, 'YYYY/MM/DD').toNow(true);
    return (
      <Container>
        <AppHeader rightTitle="پروفایل" backButton="flex" />
        <View style={{ flex: 1, padding: 20 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
              <Image
                source={{ uri: ImgSrc }}
                style={{ height: 150, width: 150, borderRadius: 10 }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={form.submitText}>نام: {Base64.decode(namefamilymember)}</Text>
            <Text style={form.submitText}>شماره موبایل: {Base64.decode(phone)}</Text>
            <Text style={form.submitText}>سن: {jalaliBirthDay}</Text>
            <Text style={form.submitText}>ایمیل: {Base64.decode(mailmember)}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Button
              full
              onPress={() => Actions.editProfile()}
              style={[form.submitButton, { marginTop: 5, marginBottom: 10 }]}
            >
              <Text style={form.submitText}>ویرایش حساب کاربری</Text>
            </Button>
            <Button
              full
              onPress={() => this._putUserLogout()}
              style={[form.submitButton, { marginTop: 5 }]}
            >
              <Text style={form.submitText}>خروج از حساب کاربری</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}
