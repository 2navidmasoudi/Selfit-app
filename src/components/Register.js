import React, { Component } from 'react';
import { View, Alert, Platform, StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Picker,
} from 'native-base';
import moment from 'moment';
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
let birth = null;
@connect(state => ({ user: state.user }), { setUser })
export default class Register extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node.isRequired).isRequired,
    setUser: PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {
      typememberid: null,
      city: 'تهران',
      sexmember: 1,
    };
    this.onSexChange = this.onSexChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.submitButtonPress = this.submitButtonPress.bind(this);
    this.changeAge = (age) => {
      const m = moment().subtract(age, 'years');
      birth = m.format('YYYY-MM-DDTHH:mm:ss');
    };
  }
  onSexChange(value) {
    this.setState({
      sexmember: value
    });
  }
  onCityChange(value) {
    this.setState({
      city: value
    });
  }
  async submitButtonPress() {
    const { typememberid, sexmember } = await this.state;
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
        'نام، سن و نوع کاربری نباید خالی باشند.',
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
            <TextInput
              placeholder="سن"
              placeholderTextColor="#000"
              iconName="calendar"
              keyboardType="numeric"
              onChangeText={this.changeAge}
            />
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
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Picker
                placeholder="انتخاب جنسیت"
                iosHeader="انتخاب جنسیت"
                headerBackButtonText="بازگشت"
                mode="dropdown"
                selectedValue={this.state.sexmember}
                onValueChange={this.onSexChange}
                textStyle={{
                  fontFamily: 'IRANSansMobile',
                  fontSize: 14,
                  fontWeight: 'normal',
                  color: white,
                }}
                itemTextStyle={{
                  fontFamily: 'IRANSansMobile',
                  fontSize: 14,
                  fontWeight: 'normal',
                  color: white,
                }}
              >
                <Picker.Item label="مرد" value={1} />
                <Picker.Item label="زن" value={2} />
              </Picker>
              <Text style={styles.txt}>جنسیت:</Text>
              <Picker
                placeholder="استان"
                iosHeader="استان"
                selectedValue={this.state.city}
                onValueChange={this.onCityChange}
                textStyle={{
                  fontFamily: 'IRANSansMobile',
                  fontSize: 14,
                  fontWeight: 'normal',
                }}
                itemTextStyle={{
                fontFamily: 'IRANSansMobile',
                fontSize: 14,
                fontWeight: 'normal',
              }}
              >
                <Picker.Item label="آذربایجان شرقی" value="آذربایجان شرقی" />
                <Picker.Item label="آذربایجان غربی" value="آذربایجان غربی" />
                <Picker.Item label="اردبیل" value="اردبیل" />
                <Picker.Item label="اصفهان" value="اصفهان" />
                <Picker.Item label="البرز" value="البرز" />
                <Picker.Item label="ایلام" value="ایلام" />
                <Picker.Item label="بوشهر" value="بوشهر" />
                <Picker.Item label="تهران" value="تهران" />
                <Picker.Item label="چهارمحال و بختیاری" value="چهارمحال و بختیاری" />
                <Picker.Item label="خراسان جنوبی" value="خراسان جنوبی" />
                <Picker.Item label="خراسان رضوی" value="خراسان رضوی" />
                <Picker.Item label="خراسان شمالی" value="خراسان شمالی" />
                <Picker.Item label="خوزستان" value="خوزستان" />
                <Picker.Item label="زنجان" value="زنجان" />
                <Picker.Item label="سمنان" value="سمنان" />
                <Picker.Item label="سیستان و بلوچستان" value="سیستان و بلوچستان" />
                <Picker.Item label="فارس" value="فارس" />
                <Picker.Item label="قم" value="قم" />
                <Picker.Item label="کرمانشاه" value="کرمانشاه" />
                <Picker.Item label="کهگیلویه و بویراحمد" value="کهگیلویه و بویراحمد" />
                <Picker.Item label="گلستان" value="گلستان" />
                <Picker.Item label="گیلان" value="گیلان" />
                <Picker.Item label="لرستان" value="لرستان" />
                <Picker.Item label="مازندران" value="مازندران" />
                <Picker.Item label="مرکزی" value="مرکزی" />
                <Picker.Item label="هرمزگان" value="هرمزگان" />
                <Picker.Item label="همدان" value="همدان" />
                <Picker.Item label="یزد" value="یزد" />
              </Picker>
              <Text style={styles.txt}>استان:</Text>
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
