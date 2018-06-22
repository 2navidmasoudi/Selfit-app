import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import BaseLightBox from './BaseLightBox';
import { SignStyle } from '../../assets/styles/sign';
import { setTokenmember } from '../../redux/actions';
import { putCodeLogin } from '../../services';
import { Text, TextInput } from '../Kit';
import { darkColor, white } from '../../assets/variables/colors';
import { persianNumber } from '../../utils/persian';

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
        const { method } = await this.props;
        console.log(method);
        const json = await putCodeLogin(method, phone, tokenPhoneInput, tokenapi);
        if (json) {
          await this.props.setTokenmember(json);
          console.log('Token for this member added as:', this.props.user.tokenmember);
          Actions.waiting();
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
      authBox, labelRedText,
      authInput,
    } = SignStyle;
    return (
      <BaseLightBox verticalPercent={0.90}>
        <View style={authBox}>
          <Text type="bold" style={{ color: white, textAlign: 'center', marginBottom: 5 }}>
            کد تایید
          </Text>
          <Text style={{ color: white, textAlign: 'center' }}>
            کد دریافت شده را وارد کنید.
          </Text>
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
            <Text style={[labelRedText, { display: tokenPhoneError ? 'flex' : 'none' }]}>
              {persianNumber(tokenPhoneError)}
            </Text>
            <Button
              block
              style={{ backgroundColor: darkColor }}
              onPress={(this.checkTokenPhone.bind(this))}
            >
              <Text style={{ color: white }}>
                تايید
              </Text>
            </Button>
            {/* <TouchableOpacity> */}
            {/* <Text style={reAuth}>ارسال مجدد کد</Text> */}
            {/* </TouchableOpacity> */}
          </View>
        </View>
      </BaseLightBox>
    );
  }
}
