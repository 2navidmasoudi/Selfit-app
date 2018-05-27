import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Card, CardItem, Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { errorColor, mainColor } from '../../../assets/variables/colors';

export default class OrderCard extends Component {
  onPressHandle(order) {
    Actions.orderDetail({ order });
  }
  render() {
    const { order } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressHandle(order)}>
        <Card>
          <CardItem>
            <Left style={{ flex: 1 }} />
            <Right style={{ flex: 1 }}>
              <Text style={{ marginRight: 10, }}>
                {order.namefamilymember}
              </Text>
              <Text
                style={{ marginRight: 10 }}
                numberOfLines={1}
                type="light"
              >
                {persianNumber(order.finalpricefactorbuffet.toLocaleString())} تومان
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Text
              style={{
                flex: 1,
                color: order.idstatepayed === 2 ? errorColor : mainColor
              }}
            >
              {order.namestatepayed}
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{ flex: 1, textAlign: 'center' }}>برای مشاهده سفارش کلیک کنید!</Text>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
