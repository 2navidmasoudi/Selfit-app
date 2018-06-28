import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-elements';
import { Text } from '../../Kit';

export default class GymCard extends Component {
  onPressHandle(gym) {
    Actions.gymDetail(gym);
  }
  render() {
    const { gym } = this.props;
    const m = gym.datesave ? moment(`${gym.datesave}`, 'YYYY/MM/DDTHH:mm:ss') : moment();
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${gym.httpserver}${gym.pathserver}${ImgYear}/${ImgMonth}/${gym.picgym}`;
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressHandle(gym)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <Thumbnail square large source={{ uri: ImgSrc }} />
            </Left>
            <Right style={{ flex: 2 }}>
              <Text style={{ marginRight: 10 }}>
                باشگاه {gym.namegym}
              </Text>
              <Text
                style={{ marginRight: 10 }}
                numberOfLines={1}
                ellipsizeMode="tail"
                type="light"
              >
                {gym.addressgym}
              </Text>
              <Rating
                readonly
                fractions={1}
                startingValue={gym.RateNumber}
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
