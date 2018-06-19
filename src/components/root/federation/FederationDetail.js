import React, { Component } from 'react';
import { Image, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Left,
  Body,
} from 'native-base';
import moment from 'moment-jalaali';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { htmlStyle } from '../../../assets/styles/html';

@connect(state => ({
  user: state.user,
  tokenapi: state.gym.tokenapi,
}))
export default class FederationDetail extends Component {
  render() {
    const { FED } = this.props;
    const m = moment(`${FED.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${FED.httpserver}${FED.pathserver}${ImgYear}/${ImgMonth}/${FED.picdoctor}`;
    const html = FED.descdoctor ? persianNumber(FED.descdoctor.replace(/(\\r\\n|\\n|\\r)/gm, '')) : null;
    const htmlContent = html ? `<div>${html}</div>` : '<p>فاقد توضیحات.</p>';
    return (
      <Container>
        <AppHeader rightTitle="فدراسیون" />
        <Content padder>
          <Card>
            <CardItem>
              <Left style={{ flex: 1 }}>
                <Body>
                  <Text style={{ marginRight: 10 }}>
                    {FED.namedoctor}
                  </Text>
                </Body>
                <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                  <Thumbnail source={{ uri: ImgSrc }} />
                </TouchableWithoutFeedback>
              </Left>
            </CardItem>
            <CardItem>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Image style={{ flex: 1, height: 220, width: null }} resizeMode="contain" source={{ uri: ImgSrc }} />
              </TouchableWithoutFeedback>
            </CardItem>
            <CardItem>
              <ScrollView style={{ flex: 1 }}>
                <HTMLView
                  value={htmlContent}
                  stylesheet={htmlStyle}
                />
              </ScrollView>
            </CardItem>
          </Card>
        </Content>
        {/* <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}> */}
        {/* <Button */}
        {/* block */}
        {/* style={[form.submitButton, { margin: 10, marginBottom: 20 }]} */}
        {/* > */}
        {/* <Text style={{ color: '#FFF' }}>تماس با مربی</Text> */}
        {/* </Button> */}
        {/* </View> */}
      </Container>
    );
  }
}

