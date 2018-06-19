import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { Text } from '../../Kit';

export default class FederationCard extends Component {
  onPressHandle(FED) {
    Actions.federationDetail({ FED });
    console.log(FED);
  }
  render() {
    const { FED } = this.props;
    const m = moment(`${FED.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${FED.httpserver}${FED.pathserver}${ImgYear}/${ImgMonth}/${FED.picdoctor}`;
    return (
      <TouchableOpacity onPress={() => this.onPressHandle(FED)}>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <Thumbnail square large source={{ uri: ImgSrc }} />
            </Left>
            <Right style={{ flex: 2 }}>
              <Text style={{ marginRight: 10, marginBottom: 15 }}>{FED.namedoctor}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
