import React, { Component } from 'react';
import { View, Platform, StyleSheet, Alert } from 'react-native';
import { Button, Container, Spinner } from 'native-base';
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
      loading: false,
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
    this.setState({ loading: true });
    const { phoneNumber } = await this.state;
    if (phoneNumber.value.length !== 11) {
      this.setState({
        phoneNumber: {
          value: phoneNumber.value,
          error: 'لطفا شماره تلفن خود را چک کنید'
        }
      });
      this.setState({ loading: false });
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
    try {
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
    } catch (e) {
      logError(e, 'requestMemberLogin', 'Login', 'putMemberLogin');
    }
    this.setState({ loading: false });
  }
  async postMember() {
    const { phone, tokenapi } = await this.props.user;
    const result = await postMember(phone, tokenapi);
    if (result === 1) {
      this.putActivePhone();
    } else {
      Alert.alert('خطا', 'خطایی در ثبت نام رخ داده', [{ text: 'باشه' }]);
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
              {!this.state.loading &&
              <Button
                block
                style={{ backgroundColor: darkColor }}
                onPress={this.onPress}
              >
                <Text style={styles.txt}>تايید</Text>
              </Button>}
              {this.state.loading &&
              <Spinner color={darkColor} />}
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
