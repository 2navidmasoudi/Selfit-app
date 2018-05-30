import React, { Component } from 'react';
import { Button, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { mainColor, white } from '../../../assets/variables/colors';
import { Text } from '../../Kit';
import { tokenBuffet } from '../../../redux/actions';
import { getRequestPayment } from '../../../services/payment';


@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  tokenBuffet
})
export default class PayButton extends Component {
  render() {
    return (
      <CardItem cardBody>
        <Button
          full
          style={{ flex: 1, backgroundColor: mainColor }}
          onPress={() => {
          getRequestPayment(1, this.props.user.tokenmember);
          Actions.reset('root');
        }}
        >
          <Text style={{ color: white }}>
          پرداخت فاکتور
          </Text>
        </Button>
      </CardItem>
    );
  }
}

