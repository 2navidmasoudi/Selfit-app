import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Base64 } from 'js-base64';
import { Card, CardItem, Icon, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { activeAddress } from '../../../services';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';

@connect(state => ({
  user: state.user,
  roadTo: state.basket.roadTo,
}))
export default class AddressCard extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    roadTo: PropTypes.string,
  };
  static defaultProps = {
    roadTo: 'Store'
  };
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
            <Right style={{ flex: 5 }}>
              <Text style={{ marginRight: 10 }}>
                {address.titleaddressmember ? Base64.decode(address.titleaddressmember) : 'نام وارد نشده.'}
                {': '}
                {address.descaddressmember}
                {' (طبقه '}
                {persianNumber(address.plaque)}
                {' واحد '}
                {persianNumber(address.floor)}
                {')'}
              </Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
