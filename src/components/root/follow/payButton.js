import React, { Component } from 'react';
import { Button, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { mainColor, white } from '../../../assets/variables/colors';
import { Text } from '../../Kit';
import { tokenBuffet } from '../../../redux/actions';
import { getRequestPayment } from '../../../services/payment';
import {Linking} from "react-native";

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
          onPress={async () => {
          const url = await getRequestPayment(1, this.props.user.tokenmember, this.props.sendPrice);
          Linking.canOpenURL(url).then((supported) => {
            if (!supported) {
              console.log(`Can't handle url: ${url}`);
            } else {
              Linking.openURL(url);
            }
          });
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

