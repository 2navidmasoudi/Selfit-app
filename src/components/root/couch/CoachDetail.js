import React from 'react';
import { Image, View, TouchableWithoutFeedback, ScrollView, Share } from 'react-native';
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
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { form } from '../../../assets/styles/index';
import { Text } from '../../Kit';

export default ({ coach }) => {
  const m = moment(`${coach.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
  const jM = m.format('jYYYY/jMM');
  const ImgYear = m.jYear();
  const ImgMonth = m.jMonth() + 1;
  const ImgSrc = `${coach.httpserver}${coach.pathserver}${ImgYear}/${ImgMonth}/${coach.piccoach}`;
  const htmlContent = coach.desccoach;
  return (
    <Container>
      <AppHeader rightTitle="مربیان" backButton="flex" />
      <Content padder>
        <Card>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <Body>
              <Text style={{ marginRight: 10 }}>
                {coach.namecoach}
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
                stylesheet={{ flex: 1, fontFamily: 'IRANSansMobile' }}
              />
            </ScrollView>
          </CardItem>
        </Card>
      </Content>
      <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
        <Button
          block
          style={[form.submitButton, { margin: 10, marginBottom: 20 }]}
        >
          <Text style={{ color: '#FFF' }}>تماس با مربی</Text>
        </Button>
      </View>
    </Container>
  );
};