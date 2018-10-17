import React, { Component } from 'react';
import { View, Alert, Platform, StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
} from 'native-base';
import moment from 'moment-jalaali';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { CheckBox, Divider } from 'react-native-elements';
import { getSingleToken, putMember } from '../services';
import { setUser } from '../redux/actions';
import Status from './status';
import { TextInput, Text } from './Kit';
import { darkColor, mainColor, white } from '../assets/variables/colors';

const isIOS = Platform.OS === 'ios';
let name = null;
let mail = null;
let birthYear = '1373';
let birthMonth = '10';
let birthDay = '08';
let birth = null;
@connect(state => ({ user: state.user }), { setUser })
export default class Register extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    setUser: PropTypes.func.isRequired,
  };
  constructor() {
    super();
    this.state = {
      typememberid: null,
      sexmember: 1,
    };
    this.onSexChange = this.onSexChange.bind(this);
    this.submitButtonPress = this.submitButtonPress.bind(this);
    this.changeAge = (age) => {
      birthYear = age;
    };
    this.changeMonth = (Month) => {
      birthMonth = Month;
    };
    this.changeDay = (Day) => {
      birthDay = Day;
    };
    this.log = () => {
      console.log('birth =');
      console.log(birth);
    };
  }
  onSexChange(value) {
    this.setState({
      sexmember: value
    });
  }
  async submitButtonPress() {
    const { typememberid, sexmember } = await this.state;
    if (birthDay.length !== 2 || birthMonth.length !== 2 || birthYear.length !== 4) {
      Alert.alert(
        'خطا',
        'تاریخ تولد بصورت نادرست وارد شده!',
        [{ text: 'باشه' }]
      );
      return;
    }
    const m = await moment(`${birthYear}/${birthMonth}/${birthDay}`, 'jYYYY/jMM/jDD');
    birth = await m.format('YYYY-MM-DDTHH:mm:ss');
    // TODO: BIRTH FORMAT NOT THE RIGHT ONE WE WANT!!!!
    console.log(m);
    console.log(birth);
    if (name && typememberid && birth) {
      const { phone, tokenapi, tokenmember } = await this.props.user;
      const json = await putMember(
        name,
        mail,
        birth,
        sexmember,
        typememberid,
        phone,
        tokenmember,
        tokenapi
      );
      if (json === 1) {
        const MemberSingleToken = await getSingleToken(tokenmember, tokenapi);
        await this.props.setUser(MemberSingleToken);
        Actions.reset('root');
      }
    } else {
      Alert.alert(
        'خطا',
        'نام، تاریخ تولد و نوع کاربری نباید خالی باشند.',
        [{ text: 'باشه' }]
      );
    }
  }
  render() {
    return (
      <Container>
        <Status />
        <LinearGradient
          colors={[darkColor, darkColor, mainColor]}
          style={styles.linearG}
        >
          <Content>
            <Text style={styles.titleStyle}>
              ثبت نام
            </Text>
            <TextInput
              placeholder="نام و نام خانوادگی"
              placeholderTextColor="#000"
              iconName="contacts"
              onChangeText={(text) => { name = text; }}
            />
            <TextInput
              placeholder="ایمیل (اختیاری)"
              placeholderTextColor="#000"
              keyboardType="email-address"
              iconName="mail"
              onChangeText={(text) => { mail = text; }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TextInput
                placeholder="1373"
                placeholderTextColor="#000"
                keyboardType="numeric"
                onChangeText={this.changeAge}
                style={{ width: 70, maxWidth: 100 }}
              />
              <Text style={{ color: white, marginHorizontal: 5 }}>/</Text>
              <TextInput
                placeholder="10"
                placeholderTextColor="#000"
                keyboardType="numeric"
                onChangeText={this.changeMonth}
              />
              <Text style={{ color: white, marginHorizontal: 5 }}>/</Text>
              <Text>/</Text>
              <TextInput
                placeholder="08"
                placeholderTextColor="#000"
                keyboardType="numeric"
                onChangeText={this.changeDay}
              />
              <Text style={{ color: white, marginHorizontal: 5 }}>تاریخ تولد:{' '}</Text>
            </View>
            <Divider style={{ backgroundColor: darkColor }} />
            <Text style={{ color: white, marginTop: 5 }}>نوع حساب کاربری</Text>
            <CheckBox
              right
              iconRight
              title="ورزشکار"
              fontFamily="IRANSansMobile"
              textStyle={{
                fontFamily: 'IRANSansMobile',
                fontSize: 14,
                fontWeight: 'normal',
              }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor={mainColor}
              checked={this.state.typememberid === 6}
              onPress={() => this.setState({ typememberid: 6 })}
            />
            <CheckBox
              right
              iconRight
              title="بوفه دار"
              fontFamily="IRANSansMobile"
              textStyle={{
                fontFamily: 'IRANSansMobile',
                fontSize: 14,
                fontWeight: 'normal',
              }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor={mainColor}
              checked={this.state.typememberid === 5}
              onPress={() => this.setState({ typememberid: 5 })}
            />
            <CheckBox
              right
              iconRight
              title="باشگاه دار"
              fontFamily="IRANSansMobile"
              textStyle={{
                fontFamily: 'IRANSansMobile',
                fontSize: 14,
                fontWeight: 'normal',
              }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor={mainColor}
              checked={this.state.typememberid === 4}
              onPress={() => this.setState({ typememberid: 4 })}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ color: white, marginTop: 5 }}>جنسیت</Text>
              <CheckBox
                right
                iconRight
                title="مرد"
                fontFamily="IRANSansMobile"
                textStyle={{
                    fontFamily: 'IRANSansMobile',
                    fontSize: 14,
                    fontWeight: 'normal',
                  }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor={mainColor}
                checked={this.state.sexmember === 1}
                onPress={() => this.setState({ sexmember: 1 })}
              />
              <CheckBox
                right
                iconRight
                title="زن"
                fontFamily="IRANSansMobile"
                textStyle={{
                  fontFamily: 'IRANSansMobile',
                  fontSize: 14,
                  fontWeight: 'normal',
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor={mainColor}
                checked={this.state.sexmember === 2}
                onPress={() => this.setState({ sexmember: 2 })}
              />

            </View>
          </Content>
        </LinearGradient>
        <Footer>
          <FooterTab>
            <Button
              full
              onPress={this.submitButtonPress}
              style={{ backgroundColor: mainColor }}
            >
              <Text style={styles.txt}>ثبت نام</Text>
            </Button>
          </FooterTab>
        </Footer>
        {isIOS && <KeyboardSpacer />}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  txt: { color: white },
  linearG: { flex: 1, padding: 20 },
  titleStyle: { textAlign: 'center', fontSize: 20, margin: 10, color: white },
  pickerTxt: { fontFamily: 'IRANSansMobile', color: white },
  PickerItem: { fontFamily: 'IRANSansMobile' },
});
