import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { errorColor, mainColor } from '../../../assets/variables/colors';
import { persianNumber } from '../../../utils/persian';
import { Text } from '../../Kit';
import { tokenBuffet } from '../../../redux/actions';
import { getSingleBuffet } from '../../../services/buffet';
import { sendPrice } from '../../../services/Alopeyk';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  tokenBuffet
})
export default class FactorBuffet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffetOrder: null,
      materialOrder: null,
      refreshing: true,
      lat: null,
      long: null,
      sendServicePrice: 0,
      buffetInfo: null
    };
    this.followOrder = this.followOrder.bind(this);
  }
  async componentWillMount() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.getSingleBuffet();
    await this.sendPrice();
  }
  async getSingleBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { buffetidfactor } = await this.props.item;
      const buffetInfo = await getSingleBuffet(buffetidfactor, tokenmember, tokenapi);
      console.log('buffetInfo');
      console.log(buffetInfo);
      await this.setState({
        lat: buffetInfo.latgym,
        long: buffetInfo.longgym,
        buffetInfo,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async sendPrice() {
    try {
      const { lataddressmember, longaddressmember } = await this.props.item;
      const { lat, long } = await this.state;
      const sendServicePrice = await sendPrice(lat, long, lataddressmember, longaddressmember);
      console.log(sendServicePrice);
      await this.setState({
        sendServicePrice: sendServicePrice.object.price,
      });
    } catch (e) {
      console.log(e);
    }
  }
  followOrder() {
    if (this.state.sendServicePrice) {
      Actions.followBuffet({
        item: this.props.item,
        sendPrice: this.state.sendServicePrice,
        buffetInfo: this.state.buffetInfo
      });
    }
  }
  render() {
    const { item } = this.props;
    const m = moment(`${item.datesavefactorbuffet}`, 'YYYY/MM/DDTHH:mm:ss').format('jYYYY/jMM/jDD HH:mm');
    const sendPrices = this.state.sendServicePrice * (3 / 5);
    const totalPrice = item.finalpricefactorbuffet + sendPrices;
    const statePayed = item.idstatepayed === 6 ?
      (
        <Text>
          <Text style={{ color: mainColor }}>
          تایید شده
          </Text>
          {' '}و{' '}
          <Text style={{ color: errorColor }}>
          منتظر پرداخت
          </Text>
        </Text>
      )
      :
      (
        <Text>
          <Text style={{ color: mainColor }}>
          پرداخت شده
          </Text>
          {' '}و{' '}
          <Text style={{ color: mainColor }}>
          درحال آماده سازی غذا!
          </Text>
        </Text>
      );
    const stateFactor = item.acceptfactor ? statePayed :
      (
        <Text style={{ color: errorColor }}>
        منتظر تایید توسط بوفه دار.
        </Text>
      );
    const payBtn = (item.acceptfactor && item.idstatepayed === 6 && sendPrices) ?
      (
        <CardItem>
          <Text style={{ textAlign: 'center' }}>
            برای پرداخت و وارد کردن کد تخفیف بر روی فاکتور کلیک کنید.
          </Text>
        </CardItem>
      )
      : null;
    return (
      <TouchableOpacity
        onPress={this.followOrder}
      >
        <Card>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <Text style={{ flex: 1 }}>{persianNumber(m)}</Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <Text style={{ flex: 1 }}>
                فاکتور خرید شماره: {persianNumber(item.idfactorbuffet)}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Right style={{ flex: 1 }}>
              <Text style={{ flex: 1 }}>
              به آدرس: {item.titleaddressmember}
              </Text>
              <Text style={{ flex: 1 }}>
              توضیحات: {item.descfactor || 'ندارد.'}
              </Text>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Text style={{ flex: 1 }}>
              هزینه ارسال: {persianNumber((sendPrices).toLocaleString())} تومان
            </Text>
          </CardItem>
          <CardItem bordered>
            <Text style={{ flex: 1 }}>
            قیمت نهایی فاکتور: {persianNumber((totalPrice).toLocaleString())} تومان
            </Text>
          </CardItem>
          <CardItem bordered>
            <Text style={{ flex: 1, textAlign: 'center' }}>
            وضعیت فاکتور: {stateFactor}
            </Text>
          </CardItem>
          {payBtn}
        </Card>
      </TouchableOpacity>
    );
  }
}
