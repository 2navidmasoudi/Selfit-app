import React, { Component } from 'react';
import { Container, Header, Left, Right, Switch } from 'native-base';
import { Alert, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { getOrderBuffet, tokenBuffet } from '../../../redux/actions';
import { getSingleBuffet, putActiveBuffet } from '../../../services/buffet';
import { logError } from '../../../services/log';
import { getOrderBuffetAll } from '../../../services/orderBuffet';
import OrderCard from './orderCard';
import { Text } from '../../Kit';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
  idOrderBuffet: state.basket.idOrderBuffet,
  idOrderMaterial: state.basket.idOrderMaterial,
  orderList: state.basket.orderBuffet,
}), {
  tokenBuffet,
  getOrderBuffet,
})
export default class BuffetKeeper extends Component {
  state = {
    Active: true,
    order: [],
    refreshing: true,
    refresh: true,
  };
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.setInfo();
  }
  async componentWillReceiveProps() {
    await this.setState({ refresh: true });
    console.log('GetProps!');
    if (this.state.refresh) { this._getOrderBuffet(); }
  }
  async setInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.checkActiveBuffet();
    await this._getOrderBuffet();
  }
  async _getSingleBuffet() {
    try {
      const { tokenapi, buffetid } = await this.props;
      const { tokenmember } = await this.props.user;
      return await getSingleBuffet(buffetid, tokenmember, tokenapi);
    } catch (err) {
      console.log(err);
      logError(err, 'getSingleBuffet', 'root/buffetKeeper/index', '_getSingleBuffet');
    }
  }
  async _getOrderBuffet() {
    try {
      this.setState({ refreshing: true });
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const order = await getOrderBuffetAll(0, 0, 0, buffetid, tokenmember, tokenapi, 30, 0, true, 0);
      console.log(order);
      this.props.getOrderBuffet(order);
      this.setState({ refreshing: false, refresh: false });
    } catch (e) {
      console.log(e);
      this.setState({ refreshing: false, refresh: false });
    }
  }
  async checkActiveBuffet() {
    try {
      const buffetInformation = await this._getSingleBuffet();
      const Active = await buffetInformation.activebuffet;
      this.setState({ Active });
    } catch (err) {
      console.log(err);
      logError(err, 'putActiveBuffet', 'root/buffetKeeper/index', '_putActiveBuffet77');
    }
  }
  // TODO: BUFFET IS NOT ACTIVATED IN FIRST TIME!
  async _putActiveBuffet(Active) {
    try {
      const { tokenapi, buffetid } = await this.props;
      const { tokenmember } = await this.props.user;
      const result = await putActiveBuffet(buffetid, Active, tokenmember, tokenapi);
      if (result === 1) {
        const buffetInformation = await this._getSingleBuffet();
        const { activebuffet } = await buffetInformation;
        if (activebuffet) {
          Alert.alert('فعالیت بوفه', 'بوفه فعال شد.', [{ text: 'باشه' }]);
        } else {
          Alert.alert('فعالیت بوفه', 'بوفه تعطیل شد.', [{ text: 'باشه' }]);
        }
        this.setState({ Active: activebuffet });
      } else {
        alert('خطا در ارتباط با سرور');
      }
    } catch (err) {
      console.log(err);
      logError(err, 'putActiveBuffet', 'root/buffetKeeper/index', '_putActiveBuffet77');
    }
  }
  renderItem({ item }) {
    return <OrderCard order={item} />;
  }
  render() {
    const YesOrNo = this.state.Active ? ' بله (سفارش می پذیرم)' : ' خیر (بوفه تعطیل است)';
    const color = this.state.Active ? 'blue' : 'red';
    return (
      <Container>
        <AppHeader rightTitle="دریافت سفارش" backButton="flex" />
        <Header
          style={{ justifyContent: 'center', backgroundColor: '#0F9D7A' }}
          androidStatusBarColor="#313131"
          iosBarStyle="light-content"
        >
          <Left style={{ flex: 1, justifyContent: 'center' }}>
            <Switch
              onTintColor="#313131"
              thumbTintColor="#313131"
              value={this.state.Active}
              onValueChange={this._putActiveBuffet.bind(this)}
            />
          </Left>
          <Right style={{ flex: 3, justifyContent: 'center' }}>
            <Text style={{ color: 'white' }}>
                فعالیت بوفه:
              <Text style={{ color }}>
                {YesOrNo}
              </Text>
            </Text>
          </Right>
        </Header>
        <View style={{ flex: 1, padding: 10 }}>
          <FlatList
            data={this.props.orderList}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.idfactorbuffet}
            onRefresh={this._getOrderBuffet.bind(this)}
            refreshing={this.state.refreshing}
            ListEmptyComponent={<Text style={{ flex: 1 }}>هیچ سفارشی دریافت نشد!</Text>}
          />
        </View>
      </Container>
    );
  }
}
