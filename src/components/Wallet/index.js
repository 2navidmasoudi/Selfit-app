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
import {getSingleToken} from "../../services";

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
      Wallet: null
    };
  }
  componentWillMount() {
    this.getWallet();
  }
  async getWallet() {
    const { tokenmember, tokenapi } = await this.props.user;
    const {  Wallet } = await getSingleToken(tokenmember, tokenapi, true);
    console.log('Wallet Amount');
    console.log(Wallet);
    if(!Wallet) return;
    this.setState({ Wallet });
  }
  async PaymentDirect() {
    const { AddWallet } = await this.state;
    if (!AddWallet) {
      Alert.alert('خطا', 'فیلد افزایش اعتبار نباید خالی باشد.', [{ text: 'باشه' }]);
      return;
    }
    const { tokenmember } = await this.props.user;
    const result = await requestWallet(AddWallet, tokenmember);
    if (!result) {
      Alert.alert('خطا', 'مشکلی در درگاه پرداخت پیش آمده لطفا مجددا تلاش کنید', [{ text: 'باشه' }]);
    }
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="کیف پول" />
        <Content padder>
          <Text style={{ textAlign: 'center' }}>مبلغ موجودی: {`${persianNumber(this.state.Wallet || '0')}`} ریال</Text>
          <TextInput
            onChangeText={AddWallet => this.setState({ AddWallet })}
            label="مبلغ افزایش اعتبار"
            value={this.state.AddWallet}
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
          <Text style={{ color: white }} type="bold">
            افزایش اعتبار {this.state.AddWallet ? `${persianNumber(this.state.AddWallet)} ریال` : ''}
          </Text>
        </Button>
      </Container>
    );
  }
}
