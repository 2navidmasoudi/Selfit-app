import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Body, Button, Card, CardItem, Right } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment-jalaali';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { errorColor, mainColor, white } from '../../../assets/variables/colors';
import { putCheckout } from '../../../services/orders';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}))
export default class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkout: props.order.checkout,
      // checkout: 0,
    };
  }
  onPressHandle(order) {
    Actions.orderDetail({ order });
  }
  async checkout() {
    const { tokenmember } = await this.props.user;
    const { tokenapi } = await this.props;
    try {
      const result = await putCheckout(this.props.order.idfactorbuffet, tokenmember, tokenapi);
      if (result === 1) {
        this.setState({
          checkout: 1
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { order } = this.props;
    const m = moment(`${order.datesavefactorbuffet}`, 'YYYY/MM/DDTHH:mm:ss').format('jYYYY/jMM/jDD HH:mm');
    const notcheckout =
      (order.acceptfactor && order.idstatepayed === 1 && this.state.checkout === 0);
    const checkouted =
      (order.acceptfactor && order.idstatepayed === 1 && this.state.checkout === 1);
    const statePayed = order.idstatepayed === 2 ?
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
      ) :
      (
        <Text>
          <Text style={{ color: mainColor }}>
        تایید شده
          </Text>
          {' '}و{' '}
          <Text style={{ color: mainColor }}>
        پرداخت شده، سفارش را آماده کنید!
          </Text>
        </Text>
      );
    const stateFactor = order.acceptfactor ? statePayed :
      (<Text style={{ color: errorColor }}>
        منتظر تایید.
       </Text>);
    const checkoutBtn = (
      <CardItem cardBody>
        <Button
          full
          style={{ flex: 1, backgroundColor: mainColor }}
          onPress={() => this.checkout()}
        >
          <Text style={{ color: white }}>
            درخواست تسویه حساب این فاکتور
          </Text>
        </Button>
      </CardItem>
    );
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressHandle(order)}>
        <Card>
          <CardItem bordered>
            <Body style={{ flex: 1 }}>
              <Text>شماره: {persianNumber(order.idfactorbuffet)}</Text>
            </Body>
            <Right style={{ flex: 3, flexDirection: 'column', marginRight: 10 }}>
              <Text>
                {order.namefamilymember}
              </Text>
              <Text
                numberOfLines={1}
                type="light"
              >
                {persianNumber(order.finalpricefactorbuffet.toLocaleString())} تومان
              </Text>
              <Text>تاریخ: {persianNumber(m)}</Text>
            </Right>
          </CardItem>
          <CardItem bordered>
            <Text style={{ flex: 1, textAlign: 'center' }}>
              وضعیت فاکتور: {stateFactor}
            </Text>
          </CardItem>
          {!notcheckout &&
          <CardItem bordered style={{ flexDirection: 'column' }}>
            <Text style={{ flex: 1, textAlign: 'center' }}>برای مشاهده سفارش کلیک کنید!</Text>
            {checkouted &&
            <Text style={{ flex: 1, textAlign: 'center', color: mainColor }}>
              (درخواست تسویه این فاکتور ارسال شده)
            </Text>}
          </CardItem>}
          {notcheckout && checkoutBtn}
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
