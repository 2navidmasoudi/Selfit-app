import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import moment from 'moment-jalaali';
import { Rating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Text } from '../../Kit';

export default class CoachCard extends Component {
  onPressHandle(coach) {
    Actions.coachDetail({ coach });
    console.log(coach);
  }
  render() {
    const { coach } = this.props;
    const m = moment(`${coach.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${coach.httpserver}${coach.pathserver}${ImgYear}/${ImgMonth}/${coach.piccoach}`;
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressHandle(coach)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <Thumbnail square large source={{ uri: ImgSrc }} />
            </Left>
            <Right style={{ flex: 2 }}>
              <Text style={{ marginRight: 10, marginBottom: 15 }}>{coach.namecoach}</Text>
              <Rating
                readonly
                fractions={1}
                startingValue={coach.RateNumber}
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
