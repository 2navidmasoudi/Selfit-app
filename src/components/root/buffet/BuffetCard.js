import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';

export default class BuffetCard extends Component {
  onPressHandle(buffet) {
    Actions.buffetMenu(buffet);
    console.log(buffet);
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
              <Text style={{
                marginRight: 10,
                textAlign: 'right',
                fontFamily: 'IRANSansMobile'
              }}
              >
                بوفه {buffet.namebuffet}
              </Text>
              <Text
                style={{ marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile' }}
                numberOfLines={1}
                ellipsizeMode="tail"
                note
              >{buffet.addressgym}
              </Text>
              <View style={{ justifyContent: 'flex-end' }}>
                <Button transparent textStyle={{ color: '#87838B' }}>
                  <Icon name="md-star" />
                  <Text>امتیاز: 5/{buffet.RateNumber}</Text>
                </Button>
              </View>
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
