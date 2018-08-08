import React, { Component } from 'react';
import { Alert, Image, TouchableWithoutFeedback } from 'react-native';
import { Button, Container, Content, View } from 'native-base';
import { connect } from 'react-redux';
import { Base64 } from 'js-base64';
import PropTypes from 'prop-types';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { form } from '../../assets/styles/index';
import AppHeader from '../header';
import { getSingleToken, putUserLogout } from '../../services';
import { setUser } from '../../redux/actions';
import { persianNumber } from '../../utils/persian';
import { Text } from '../Kit';
import { mainColor, white } from '../../assets/variables/colors';

moment.loadPersian({ dialect: 'persian-modern' });

@connect(state => ({
  user: state.user,
}), {
  setUser,
})
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    setUser: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.getSingleToken();
  }
  async getSingleToken() {
    const { tokenmember, tokenapi } = this.props.user;
    const json = await getSingleToken(tokenmember, tokenapi);
    await this.props.setUser(json.MemberSingleToken);
  }
  async putUserLogout() {
    const { tokenapi, tokenmember } = await this.props.user;
    const json = await putUserLogout(tokenmember, tokenapi);
    if (json === 1) {
      Actions.reset('sign');
    } else {
      Alert.alert(
        'خطا',
        'خطا در خروج از حساب کاربری!',
        [{ text: 'باشه' }]
      );
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
    const name = Base64.decode(namefamilymember);
    const ph = Base64.decode(phone);
    const mail = Base64.decode(mailmember);
    const jalaliBirthDay = birthdaymember === null ? '?' : moment(birthdaymember, 'YYYY/MM/DD').toNow(true);
    return (
      <Container>
        <AppHeader rightTitle="پروفایل" backButton="flex" />
        <Content padder>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
              <Image
                source={{ uri: ImgSrc }}
                style={{ height: 150, width: 150, borderRadius: 10 }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 1 }}>
            <Text>نام: {name}</Text>
            <Text>شماره موبایل: {persianNumber(ph)}</Text>
            <Text>سن: {persianNumber(jalaliBirthDay)}</Text>
            <Text>ایمیل: {mail}</Text>
          </View>
        </Content>
        <View style={{ margin: 10, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Button
            block
            onPress={() => Actions.editProfile()}
            style={[form.submitButton, { marginTop: 5, marginBottom: 10 }]}
          >
            <Text style={{ color: white }}>ویرایش حساب کاربری</Text>
          </Button>
          <Button
            block
            onPress={() => this.putUserLogout()}
            style={{ marginTop: 5, backgroundColor: mainColor }}
          >
            <Text style={{ color: white }}>خروج از حساب کاربری</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
