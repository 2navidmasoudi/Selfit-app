import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Container, Card } from 'native-base';
import { connect } from 'react-redux';
import { Base64 } from 'js-base64';
import PropTypes from 'prop-types';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { form } from '../../assets/styles/index';
import AppHeader from '../header';
import { getSingleToken } from '../../services';
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
  };
  componentWillMount() {
    this.getSingleToken();
  }
  async getSingleToken() {
    const { tokenmember, tokenapi } = this.props.user;
    const MemberSingleToken = await getSingleToken(tokenmember, tokenapi);
    await this.props.setUser(MemberSingleToken);
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
    const Age = birthdaymember === null ? '?' : moment(birthdaymember, 'YYYY/MM/DD').toNow(true);
    const Birth = birthdaymember === null ? '' : moment(birthdaymember, 'YYYY/MM/DD').format('jYYYY/jMM/jDD');
    return (
      <Container>
        <AppHeader rightTitle="پروفایل" />
        <View style={{ flex: 6, padding: 15 }}>
          <Card style={{ flex: 7 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Image
                  source={{ uri: ImgSrc }}
                  style={{ flex: 1, height: 200, width: 350 }}
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={{ flex: 1, margin: 10 }}>
              <View style={{ flex: 1 }}>
                <Text>
                          نام:
                </Text>
                <Text style={{ color: mainColor, textAlign: 'center' }} type="bold">
                  {name}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                    شماره موبایل:
                </Text>
                <Text style={{ color: mainColor, textAlign: 'center' }} type="bold">
                  {persianNumber(ph)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                    ایمیل:
                </Text>
                <Text style={{ color: mainColor, textAlign: 'center' }} type="bold">
                  {mail}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                    تاریخ تولد (سن):
                </Text>
                <Text style={{ color: mainColor, textAlign: 'center' }} type="bold">
                  {`(${persianNumber(Age)}) ${Birth}`}
                </Text>
              </View>
            </View>
          </Card>
        </View>
        <View style={{ flex: 1, marginHorizontal: 15 }}>
          <Button
            block
            onPress={() => Actions.editProfile()}
            style={form.submitButton}
          >
            <Text style={{ color: white }}>ویرایش حساب کاربری</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
