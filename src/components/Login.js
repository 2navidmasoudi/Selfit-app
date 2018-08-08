import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Button, Container } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPhone, setTokenapi, setUser } from '../redux/actions';
import { postMember, putMemberLogin } from '../services';
import Status from './status';
import { Text, TextInput } from './Kit';
import { darkColor, errorColor, mainColor, white } from '../assets/variables/colors';
import { logError } from '../services/log';

const isIOS = Platform.OS === 'ios';
@connect(state => ({ user: state.user }), { setUser, setPhone, setTokenapi })
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    setPhone: PropTypes.func.isRequired,
    setTokenapi: PropTypes.func.isRequired,
  };
  constructor() {
    super();
    this.state = {
      phoneNumber: {
        value: '',
        error: '',
      },
      disabled: false,
    };
    this.putActivePhone = () => {
      Actions.authLightBox({ method: 'PutActivephone' });
    };
    this.putCheckLogin = () => {
      Actions.authLightBox({ method: 'PutCheckLogin' });
    };
    this.onPress = this.onPress.bind(this);
  }
  async onPress() {
    const { phoneNumber } = await this.state;
    if (phoneNumber.value.length !== 11) {
      this.setState({
        phoneNumber: {
          value: phoneNumber.value,
          error: 'لطفا شماره تلفن خود را چک کنید'
        }
      });
    } else if (phoneNumber.value.length === 11) {
      this.setState({
        phoneNumber: {
          value: phoneNumber.value,
          error: ''
        }
      });
      await this.props.setPhone({ phone: phoneNumber.value });
      await this.requestMemberLogin();
    }
  }
  async requestMemberLogin() {
    await this.props.setTokenapi({ tokenapi: 'selfit.member' });
    const { phone, tokenapi } = await this.props.user;
    const json = await putMemberLogin(phone, tokenapi);
    switch (json) {
      case -4:
      case -8:
        this.postMember();
        break;
      case -9:
        this.putActivePhone();
        break;
      case 1:
        this.putCheckLogin();
        break;
      default:
        logError('putMemberLogin', `json: ${json}`, 'Login', 'no match for this code');
        break;
    }
    this.setState(
      { disabled: true },
      () => setTimeout(() => this.setState({ disabled: false }), 3000)
    );
  }
  async postMember() {
    const { phone, tokenapi } = await this.props.user;
    await postMember(phone, tokenapi);
    this.putActivePhone();
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
    return (
      <Container>
        <Status />
        <LinearGradient
          colors={[darkColor, darkColor, mainColor]}
          style={styles.linear}
        >
          <View style={styles.loginBox}>
            <Text style={styles.loginText}>ورود</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.txt}>شماره موبایل :</Text>
              <TextInput
                style={styles.inputText}
                placeholder="09xxxxxxxxx"
                underlineColorAndroid="transparent"
                keyboardType="numeric"
                autoFocus
                dataDetectorTypes="phoneNumber"
                maxLength={11}
                onChangeText={text => this.changeMobileNumber(text)}
              />
              <Text
                style={[styles.labelRedText, { display: phoneNumberError ? 'flex' : 'none' }]}
              >
                {phoneNumberError}
              </Text>
              <Button
                block
                disabled={this.state.disabled}
                style={{ backgroundColor: this.state.disabled ? mainColor : darkColor }}
                onPress={this.onPress}
              >
                <Text style={styles.txt}>تايید</Text>
              </Button>
            </View>
          </View>
        </LinearGradient>
        {isIOS && <KeyboardSpacer />}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  linear: { flex: 1, justifyContent: 'center' },
  loginBox: {
    backgroundColor: mainColor,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    padding: 5,
  },
  loginText: { color: white, textAlign: 'center' },
  inputGroup: {
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  txt: { color: white },
  inputText: {
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 2,
  },
  labelRedText: {
    textAlign: 'center',
    marginVertical: 5,
    color: errorColor,
  },
});
