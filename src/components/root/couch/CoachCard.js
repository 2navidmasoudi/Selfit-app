import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, CardItem, Icon, Left, Right, Text, Thumbnail } from 'native-base';
import moment from 'moment-jalaali';

export default class CoachCard extends Component {
  onPressHandle(coach) {
    // TODO: create a detail page for couch
    // Actions.gymDetail(coach);
    // console.log(coach);
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
            <Right style={{ flex: 1 }}>
              <Text style={{ marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile' }}>{coach.namecoach}</Text>
              <Text
                style={{ marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile' }}
                numberOfLines={1}
                ellipsizeMode="tail"
                note
              />
              <View style={{ justifyContent: 'flex-end' }}>
                <Button transparent textStyle={{ color: '#87838B' }}>
                  <Icon name="md-star" />
                  <Text>امتیاز: 5/{coach.RateNumber}</Text>
                </Button>
              </View>
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
