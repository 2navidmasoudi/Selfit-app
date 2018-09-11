import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import { Rating } from 'react-native-elements';
import PropTypes from 'prop-types';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { Text } from '../../Kit';

export default class BuffetCard extends Component {
  static propTypes = {
    buffet: PropTypes.node.isRequired,
  }
  onPressHandle = (buffet) => {
    Actions.buffetMenu(buffet);
  }
  render() {
    const { buffet } = this.props;
    const m = moment(`${buffet.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${buffet.httpserver}${buffet.pathserver}${ImgYear}/${ImgMonth}/${buffet.picbuffet}`;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPressHandle(buffet)}
      >
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <Thumbnail square large source={{ uri: ImgSrc }} />
            </Left>
            <Right style={{ flex: 1 }}>
              <Text style={{ marginRight: 10 }}>
                بوفه {buffet.namebuffet}
              </Text>
              <Text
                style={{ marginRight: 10 }}
                numberOfLines={1}
                ellipsizeMode="tail"
                note
              >
                {buffet.addressgym}
              </Text>
              <Rating
                readonly
                fractions={1}
                startingValue={buffet.RateNumber}
                imageSize={10}
                style={{ marginRight: 10 }}
              />
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
