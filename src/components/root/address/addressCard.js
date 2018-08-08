import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Base64 } from 'js-base64';
import { Card, CardItem, Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { activeAddress } from '../../../services';
import { Text } from '../../Kit';

@connect(state => ({
  user: state.user,
  roadTo: state.basket.roadTo,
}))
export default class AddressCard extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    roadTo: PropTypes.string.isRequired,
    address: PropTypes.objectOf(PropTypes.node).isRequired,
  }
  async onPressHandle(address) {
    const { tokenmember, tokenapi } = await this.props.user;
    const result = await activeAddress(address.idaddressmember, tokenmember, tokenapi);
    if (result === 1) {
      if (this.props.roadTo === 'Store') {
        Actions.factorProduct({ address });
      } else {
        Actions.factorBuffet({ address });
      }
    }
  }
  render() {
    const { address } = this.props;
    return (
      <TouchableOpacity onPress={() => this.onPressHandle(address)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }} >
              <Icon name="pin" />
            </Left>
            <Body style={{ flex: 1 }} />
            <Right style={{ flex: 1 }}>
              <Text style={{ marginRight: 10 }}>
                {address.titleaddressmember ? Base64.decode(address.titleaddressmember) : 'نام وارد نشده.'}
              </Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
