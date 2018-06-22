import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Button, Container } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import { SignStyle } from '../assets/styles/sign';
import { setPhone, setTokenapi, setUser } from '../redux/actions';
import { postMember, putMemberLogin } from '../services';
import Status from './status';
import { Text, TextInput } from './Kit';
import { darkColor, mainColor, white } from '../assets/variables/colors';

const isIOS = Platform.OS === 'ios';
@connect(state => ({ user: state.user }), { setUser, setPhone, setTokenapi })
export default class Login extends Component {
  state = {
    phoneNumber: {
      value: '',
      error: '',
    },
  };
  async login() {
    const { phoneNumber } = await this.state;
    if (phoneNumber.value.length !== 11) {
      this.setState({
        phoneNumber: {
          value: phoneNumber.value,
          error: 'لطفا شماره تلفن خود را چک کنید'
        }
      });
      console.log(this.state);
    } else if (phoneNumber.value.length === 11) {
      this.setState({
        phoneNumber: {
          value: phoneNumber.value,
          error: ''
        }
      });
      console.log(this.state);
      await this.props.setPhone({ phone: phoneNumber.value });
      await this.requestMemberLogin();
    }
  }
  async requestMemberLogin() {
    try {
      await this.props.setTokenapi({ tokenapi: 'selfit.member' });
      const { phone, tokenapi } = await this.props.user;
      const json = await putMemberLogin(phone, tokenapi);
      console.log(json, 'putMemberLogin');
      if (json === -4 || json === -8) {
        console.log('user not found, Error code:', json);
        this.postMember();
        return;
      } else if (json === -9) {
        console.log('user should activate phone, Error code:', json);
        this.putActivePhone();
        return;
      } else if (json === 1) {
        this.putCheckLogin();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async postMember() {
    try {
      const { phone, tokenapi } = await this.props.user;
      const json = await postMember(phone, tokenapi);
      console.log(json, 'postMember');
      this.putActivePhone();
    } catch (err) {
      console.log(err);
    }
  }
  putActivePhone() {
    try {
      Actions.authLightBox({ method: 'PutActivephone' });
    } catch (error) {
      console.log(error);
    }
  }
  putCheckLogin() {
    try {
      Actions.authLightBox({ method: 'PutCheckLogin' });
    } catch (error) {
      console.log(error);
    }
  }
  changeMobileNumber(text) {
    this.setState({
      phoneNumber: {
        value: text,
        error: this.state.phoneNumber.error,
      }
    });
  }
  render() {
    const phoneNumberError = this.state.phoneNumber.error;
    const {
      loginBox, inputGroup,
      inputText, labelRedText
    } = SignStyle;
    return (
      <Container>
        <Status />
        <LinearGradient
          colors={[darkColor, darkColor, mainColor]}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <View style={loginBox}>
            <Text style={{ color: white, textAlign: 'center' }}>ورود</Text>
            <View style={inputGroup}>
              <Text style={{ color: white }}>شماره موبایل :</Text>
              <TextInput
                style={inputText}
                placeholder="09xxxxxxxxx"
                underlineColorAndroid="transparent"
                keyboardType="numeric"
                autoFocus
                dataDetectorTypes="phoneNumber"
                maxLength={11}
                onChangeText={text => this.changeMobileNumber(text)}
              />
              <Text
                style={[labelRedText, { display: phoneNumberError ? 'flex' : 'none' }]}
              >
                {phoneNumberError}
              </Text>
              <Button
                block
                style={{ backgroundColor: darkColor }}
                onPress={this.login.bind(this)}
              >
                <Text style={{ color: white }}>
                    تايید
                </Text>
              </Button>
            </View>
          </View>
        </LinearGradient>
        {isIOS && <KeyboardSpacer />}
      </Container>
    );
  }
}
