import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Form,
  Picker,
} from 'native-base';
import moment from 'moment';
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

@connect(state => ({ user: state.user }), { setUser })
export default class Register extends Component {
  state = {
    namefamilymember: null,
    typememberid: null,
    city: 'تهران',
    sexmember: 1,
    mailmember: null,
    birthdaymember: null,
  };

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
  async changeAge(age) {
    const date = await moment().subtract(age, 'years');
    const birthdaymember = await date.format('YYYY-MM-DDTHH:mm:ss');
    await this.setState({ birthdaymember });
  }
  async submitButtonPress() {
    const {
      namefamilymember, mailmember,
      typememberid, sexmember, birthdaymember
    } = await this.state;
    if (namefamilymember && typememberid && birthdaymember) {
      try {
        const { phone, tokenapi, tokenmember } = await this.props.user;
        const json = await putMember(
          namefamilymember,
          mailmember,
          birthdaymember,
          sexmember,
          typememberid,
          phone,
          tokenmember,
          tokenapi
        );
        if (json === 1) {
          const jsonInfo = await getSingleToken(tokenmember, tokenapi);
          console.log(jsonInfo, 'JsonInfo');
          await this.props.setUser(jsonInfo.MemberSingleToken);
          Actions.reset('root');
        } else {
          console.log('PUT member response:', json);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert(
        'خطا',
        'نام، سن و نوع کاربری نباید خالی باشند.',
        [
          { text: 'باشه' }
        ]
      );
    }
  }

  render() {
    return (
      <Container>
        <Status />
        <LinearGradient
          colors={[darkColor, darkColor, mainColor]}
          // locations={[0.6, 1]}
          style={{ flex: 1, padding: 20 }}
        >
          <Content>
            <Text style={{ textAlign: 'center', fontSize: 20, margin: 10, color: white }}>
              ثبت نام
            </Text>
            <TextInput
              placeholder="نام و نام خانوادگی"
              placeholderTextColor="#000"
              iconName="contacts"
              onChangeText={text => this.setState({ namefamilymember: text })}
            />
            <TextInput
              placeholder="ایمیل (اختیاری)"
              placeholderTextColor="#000"
              keyboardType="email-address"
              iconName="mail"
              onChangeText={text => this.setState({ mailmember: text })}
            />
            <TextInput
              placeholder="سن"
              placeholderTextColor="#000"
              iconName="calendar"
              keyboardType="numeric"
              onChangeText={text => this.changeAge(text)}
            />
            <Divider style={{ backgroundColor: darkColor }} />
            <Text style={{ color: white, marginTop: 5 }}>نوع کاربر</Text>
            <CheckBox
              right
              iconRight
              title="ورزشکار"
              fontFamily="IRANSansMobile"
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
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor={mainColor}
              checked={this.state.typememberid === 4}
              onPress={() => this.setState({ typememberid: 4 })}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Form style={{ flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
                <Picker
                  placeholder="انتخاب جنسیت"
                  iosHeader="انتخاب جنسیت"
                  headerBackButtonText="بازگشت"
                  mode="dropdown"
                  selectedValue={this.state.sexmember}
                  onValueChange={this.onSexChange.bind(this)}
                  textStyle={{ fontFamily: 'IRANSansMobile', color: white }}
                  itemTextStyle={{ fontFamily: 'IRANSansMobile', color: white }}
                >
                  <Picker.Item label="مرد" value={1} />
                  <Picker.Item label="زن" value={2} />
                </Picker>
                <Text style={{ color: white }}>جنسیت:</Text>
              </Form>
              <Form style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 5 }}>
                <Picker
                  placeholder="استان"
                  iosHeader="استان"
                  mode="dropdown"
                  selectedValue={this.state.city}
                  onValueChange={this.onCityChange.bind(this)}
                  textStyle={{ fontFamily: 'IRANSansMobile', color: white }}
                  itemTextStyle={{ fontFamily: 'IRANSansMobile', color: white }}
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
                <Text style={{ color: white }}>استان:</Text>
              </Form>
            </View>
          </Content>
        </LinearGradient>
        <Footer>
          <FooterTab>
            <Button
              full
              onPress={this.submitButtonPress.bind(this)}
              style={{ backgroundColor: mainColor }}
            >
              <Text style={{ color: white }}>ثبت نام</Text>
            </Button>
          </FooterTab>
        </Footer>
        <KeyboardSpacer />
      </Container>
    );
  }
}
