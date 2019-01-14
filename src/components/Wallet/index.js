import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button, Container, Content, View } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppHeader from '../header';
import { setUser } from '../../redux/actions';
import requestWallet from '../../services/Wallet';
import { Text, TextInput } from '../Kit';
import { darkColor, mainColor, white } from '../../assets/variables/colors';
import { persianNumber } from '../../utils/persian';
import { getSingleToken } from '../../services';
import {Actions} from "react-native-router-flux";

@connect(state => ({
  user: state.user,
}), {
  setUser,
})
export default class Wallet extends Component {
  static propTypes = {
    Amount: PropTypes.number
  };
  static defaultProps = {
    Amount: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      AddWallet: props.Amount,
      Wallet: null
    };
  }
  componentWillMount() {
    this.getWallet();
  }
  async getWallet() {
    const { tokenmember, tokenapi } = await this.props.user;
    const { Wallet } = await getSingleToken(tokenmember, tokenapi, true);
    console.log('Wallet Amount');
    console.log(Wallet);
    if (!Wallet) return;
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
      return;
    }
    Actions.pop();
  }
  render() {
    const AddWallet = this.state.AddWallet.toLocaleString();
    return (
      <Container>
        <AppHeader rightTitle="کیف پول" />
        <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'space-around' }} scrollEnabled={false}>
          <Text type="bold" style={{ textAlign: 'center', fontSize: 22 }}>مبلغ موجودی: {`${persianNumber(this.state.Wallet || '0')}`} تومان</Text>
          <View
            style={{
            flexDirection: 'row-reverse',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignContent: 'center',
            margin: 10,
          }}
          >
            <Button
              light={this.state.selected === 1}
              full
              onPress={() => {
                this.setState({ selected: 1, AddWallet: 5000 });
              }}
              style={{
                margin: 5,
                height: 70,
                width: 100,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: this.state.selected === 1 ? white : darkColor,
                backgroundColor: this.state.selected === 1 ? mainColor : white,
                flexDirection: 'column'
              }}
            >
              <Text
                style={{
                  color: this.state.selected === 1 ? white : '#000',
                }}
              >
                {persianNumber('5,000')} تومان
              </Text>
            </Button>
            <Button
              light={this.state.selected === 2}
              full
              onPress={() => {
                this.setState({ selected: 2, AddWallet: 10000 });
              }}
              style={{
                margin: 5,
                height: 70,
                width: 100,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: this.state.selected === 2 ? white : darkColor,
                backgroundColor: this.state.selected === 2 ? mainColor : white,
                flexDirection: 'column'
              }}
            >
              <Text
                style={{
                  color: this.state.selected === 2 ? white : '#000',
                }}
              >
                {persianNumber('10,000')} تومان
              </Text>
            </Button>
            <Button
              light={this.state.selected === 3}
              full
              onPress={() => {
                this.setState({ selected: 3, AddWallet: 20000 });
              }}
              style={{
                margin: 5,
                height: 70,
                width: 100,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: this.state.selected === 3 ? white : darkColor,
                backgroundColor: this.state.selected === 3 ? mainColor : white,
                flexDirection: 'column'
              }}
            >
              <Text
                style={{
                  color: this.state.selected === 3 ? white : '#000',
                }}
              >
                {persianNumber('20,000')} تومان
              </Text>
            </Button>
            <Button
              light={this.state.selected === 4}
              full
              onPress={() => {
                this.setState({ selected: 4, AddWallet: 50000 });
              }}
              style={{
                margin: 5,
                height: 70,
                width: 100,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: this.state.selected === 4 ? white : darkColor,
                backgroundColor: this.state.selected === 4 ? mainColor : white,
                flexDirection: 'column'
              }}
            >
              <Text
                style={{
                  color: this.state.selected === 4 ? white : '#000',
                }}
              >
                {persianNumber('50,000')} تومان
              </Text>
            </Button>
          </View>
          <TextInput
            onChangeText={(c) => {
              this.setState({ AddWallet: c });
              if (this.state.selected) {
                this.setState({ selected: 0 });
              }
            }}
            label="مبلغ افزایش اعتبار"
            value={`${this.state.AddWallet}`}
            placeholder="مبلغ افزایش اعتبار (به تومان)"
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
            افزایش اعتبار {this.state.AddWallet ? `${persianNumber(AddWallet)} تومان` : ''}
          </Text>
        </Button>
      </Container>
    );
  }
}
