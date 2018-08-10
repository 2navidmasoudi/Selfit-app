import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import PropTypes from 'prop-types';
import BaseLightBox from './BaseLightBox';
import { SignStyle } from '../../assets/styles/sign';
import { setTokenmember } from '../../redux/actions';
import { putCodeLogin } from '../../services';
import { Text, TextInput } from '../Kit';
import { darkColor, white } from '../../assets/variables/colors';
import { persianNumber } from '../../utils/persian';
import { logError } from '../../services/log';

let tokenPhoneInput = '';
@connect(state => ({ user: state.user }), { setTokenmember })
export default class AuthLightBox extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    setTokenmember: PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {
      tokenPhoneError: ''
    };
    this.onPress = this.onPress.bind(this);
  }
  async onPress() {
    if (tokenPhoneInput.length !== 5) {
      this.setState({
        tokenPhoneError: 'کد باید یک عدد 5 رقمی باشد'
      });
    } else if (tokenPhoneInput.length === 5) {
      this.setState({
        tokenPhoneError: ''
      });
      const { phone, tokenapi } = await this.props.user;
      const { method } = await this.props;
      const json = await putCodeLogin(method, phone, tokenPhoneInput, tokenapi);
      if (!json) {
        Alert.alert('خطا', 'کد نامعتبر است! لطفا مجدد تلاش کنید', [{ text: 'باشه' }]);
        return;
      }
      if (json.tokenmember) {
        await this.props.setTokenmember(json);
        Actions.waiting();
      } else {
        logError('error in TokenMember', 'onPress', 'authBox', 'checkTokenPhone');
      }
    }
  }
  render() {
    const { tokenPhoneError } = this.state;
    const { authBox, labelRedText, authInput } = SignStyle;
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
            onChangeText={(text) => { tokenPhoneInput = text; }}
          />
          <View style={{ alignItems: 'center' }}>
            <Text style={[labelRedText, { display: tokenPhoneError ? 'flex' : 'none' }]}>
              {persianNumber(tokenPhoneError)}
            </Text>
            <Button
              block
              style={{ backgroundColor: darkColor }}
              onPress={this.onPress}
            >
              <Text style={{ color: white }}>
                تايید
              </Text>
            </Button>
          </View>
        </View>
      </BaseLightBox>
    );
  }
}
