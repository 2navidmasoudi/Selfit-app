import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {Body, Card, CardItem, Left, Right} from 'native-base';
import { Actions } from 'react-native-router-flux';
import moment from 'moment-jalaali';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { errorColor, mainColor } from '../../../assets/variables/colors';

export default class OrderCard extends Component {
  onPressHandle(order) {
    Actions.orderDetail({ order });
  }
  render() {
    const { order } = this.props;
    const m = moment(`${order.datesavefactorbuffet}`, 'YYYY/MM/DDTHH:mm:ss').format('jYYYY/jMM/jDD HH:mm');
    const statePayed = order.idstatepayed === 2 ?
      (<Text>
        <Text style={{ color: mainColor }}>
        تایید شده
        </Text>
        {' '}و{' '}
        <Text style={{ color: errorColor }}>
        منتظر پرداخت
        </Text>
      </Text>)
      :
      (<Text>
        <Text style={{ color: mainColor }}>
        تایید شده
        </Text>
        {' '}و{' '}
        <Text style={{ color: mainColor }}>
        پرداخت شده، سفارش را آماده کنید!
        </Text>
      </Text>);
    const stateFactor = order.acceptfactor ? statePayed :
      (<Text style={{ color: errorColor }}>
        منتظر تایید.
       </Text>);
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
          <CardItem bordered>
            <Text style={{ flex: 1, textAlign: 'center' }}>برای مشاهده سفارش کلیک کنید!</Text>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
