import React, { Component } from 'react';
import { View, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import BaseLightBox from './BaseLightBox';
import { SignStyle } from '../../assets/styles/sign';
import { setTokenmember } from '../../redux/actions';
import { putCodeLogin } from '../../services';
import { Text } from '../Kit';

@connect(state => ({ user: state.user }), { setTokenmember })
export default class AuthLightBox extends Component {
  state = {
    tokenPhoneInput: '',
    tokenPhoneError: ''
  };
  changeTokenPhone(text) {
    this.setState({
      tokenPhoneInput: text
    });
  }
  async checkTokenPhone() {
    try {
      const { tokenPhoneInput } = await this.state;
      if (tokenPhoneInput.length !== 5) {
        this.setState({
          tokenPhoneError: 'کد باید یک عدد 5 رقمی باشد'
        });
        return;
      } else if (tokenPhoneInput.length === 5) {
        this.setState({
          tokenPhoneError: ''
        });
        const { phone, tokenapi } = await this.props.user;
        const Method = await this.props.method;
        console.log(Method);
        const json = await putCodeLogin(Method, phone, tokenPhoneInput, tokenapi);
        if (json) {
          await this.props.setTokenmember(json);
          console.log('Token for this member added as:', this.props.user.tokenmember);
          Actions.login({ authSuccess: true });
        } else {
          console.log('error in code');
        }
      }
    } catch (err) {
      Alert('کد نامعتبر است! لطفا مجدد تلاش کنید');
    }
  }
  render() {
    const { tokenPhoneError } = this.state;
    const {
      authBox, authTitle, labelRedText,
      authInput, signButtonImg, reAuth, signButtonStyle
    } = SignStyle;
    return (
      <BaseLightBox verticalPercent={0.90} horizontalPercent={0.55}>
        <View style={authBox}>
          <Text style={authTitle}>کد تایید</Text>
          <Text style={labelRedText}>لطفا کد ارسال شده به تلفن همراه خود را وارد کنید</Text>
          <TextInput
            style={authInput}
            placeholder="xxxxx"
            autoFocus
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            maxLength={5}
            onChangeText={text => this.changeTokenPhone(text)}
          />
          <View style={{ alignItems: 'center' }}>
            <Text style={labelRedText}>{tokenPhoneError}</Text>
            <TouchableOpacity onPress={(this.checkTokenPhone.bind(this))}>
              <ImageBackground
                imageStyle={signButtonStyle}
                source={require('../../assets/S_Logo.png')}
                style={signButtonImg}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={reAuth}>ارسال مجدد کد</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BaseLightBox>
    );
  }
}
