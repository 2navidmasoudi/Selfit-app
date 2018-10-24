import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button, Container, Content, View } from 'native-base';
import { connect } from 'react-redux';
import AppHeader from '../header';
import { setUser } from '../../redux/actions';
import requestWallet from '../../services/Wallet';
import { Text, TextInput } from '../Kit';
import { darkColor, mainColor, white } from '../../assets/variables/colors';
import { persianNumber } from '../../utils/persian';

@connect(state => ({
  user: state.user,
}), {
  setUser,
})
export default class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      AddWallet: null,
    };
  }
  async PaymentDirect() {
    const { AddWallet } = await this.state;
    if (!AddWallet) {
      Alert.alert('خطا', 'فیلد افزایش اعتبار نباید خالی باشد.', [{ text: 'باشه' }]);
      return;
    }
    const { token } = await this.props.user;
    const result = await requestWallet(AddWallet, token);
    if (!result) {
      Alert.alert('خطا', 'مشکلی در درگاه پرداخت پیش آمده لطفا مجددا تلاش کنید', [{ text: 'باشه' }]);
    }
  }
  render() {
    const addWallet =
      this.state.AddWallet
        ? persianNumber(this.state.AddWallet.toLocaleString('fa'))
        : persianNumber('0');
    return (
      <Container>
        <AppHeader rightTitle="کیف پول" />
        <Content padder>
          <Text style={{ textAlign: 'center' }}>مبلغ موجودی: 4000 ریال</Text>
          <TextInput
            onChangeText={AddWallet => this.setState({ AddWallet })}
            label="مبلغ افزایش اعتبار"
            value={this.state.AddWallet && this.state.AddWallet.toLocaleString('fa')}
            placeholder="مبلغ افزایش اعتبار (به ریال)"
            required
            keyboardType="numeric"
            placeholderTextColor={darkColor}
            blurOnSubmit={false}
          />
        </Content>
        <Button
          block
          onPress={() => this.PaymentDirect()}
          style={{ backgroundColor: mainColor }}
        >
          <Text style={{ color: white }} type="bold">{`شارژ حساب: ${addWallet.toLocaleString('fa')}‍ ریال`}</Text>
        </Button>
      </Container>
    );
  }
}
