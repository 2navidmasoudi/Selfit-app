import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Card, CardItem, Left, Right, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class OrderCard extends Component {
  onPressHandle(order) {
    console.log(order);
    Actions.orderDetail({ order });
  }
  render() {
    const { order } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressHandle(order)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }} />
            <Right style={{ flex: 1 }}>
              <Text style={{
                marginRight: 10,
                textAlign: 'right',
                fontFamily: 'IRANSansMobile'
              }}
              >
                {order.namefamilymember}
              </Text>
              <Text
                style={{ marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile' }}
                numberOfLines={1}
                note
              >
                {order.finalpricefactorbuffet.toLocaleString('fa')} تومان
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Text>برای مشاهده سفارش کلیک کنید!</Text>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
