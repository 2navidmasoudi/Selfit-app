import React, { Component } from 'react';
import {Image, View, TouchableWithoutFeedback, ScrollView, Share, Alert} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Left,
  Body, Right,
} from 'native-base';
import { Rating } from 'react-native-elements';
import moment from 'moment-jalaali';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { form } from '../../../assets/styles/index';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { htmlStyle } from '../../../assets/styles/html';
import { mainColor, white } from '../../../assets/variables/colors';
import { postRateCoach } from '../../../services/coach';

@connect(state => ({
  user: state.user,
  tokenapi: state.gym.tokenapi,
}))
export default class CoachDetail extends Component {
  state = {
    rate: null,
    disableRate: false,
  };
  ratingCompleted(rate) {
    console.log(`Rating is: ${rate}`);
    this.setState({ rate });
  }
  async submitRate() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, coach } = await this.props;
      let { rate } = await this.state;
      rate = await Number(rate);
      const result = await postRateCoach(coach.idcoach, rate, tokenmember, tokenapi);
      console.log(result, 'postRateGym');
      if (result === 1) {
        this.setState({ disableRate: true });
        Alert.alert(
          'ثبت امتیاز',
          'امتیاز شما ثبت شد. با تشکر!',
          [
            { text: 'بازگشت' },
          ]
        );
      }
      this.setState({ disableRate: true });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { coach } = this.props;
    const m = moment(`${coach.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${coach.httpserver}${coach.pathserver}${ImgYear}/${ImgMonth}/${coach.piccoach}`;
    const html = coach.desccoach ? persianNumber(coach.desccoach.replace(/(\\r\\n|\\n|\\r)/gm, '')) : null;
    const htmlContent = html ? `<div>${html}</div>` : '<p>فاقد توضیحات.</p>';

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
                  stylesheet={htmlStyle}
                />
              </ScrollView>
            </CardItem>
            <CardItem>
              <Left style={{ flex: 1 }} />
              <Right style={{ flex: 1 }}>
                <Rating
                  ratingCount={5}
                  fractions={2}
                  startingValue={coach.RateNumber}
                  imageSize={30}
                  onFinishRating={this.ratingCompleted.bind(this)}
                  style={{ paddingVertical: 10 }}
                />
                <Button
                  block
                  disabled={this.state.disableRate}
                  style={{ backgroundColor: mainColor }}
                  onPress={this.submitRate.bind(this)}
                >
                  <Text style={{ color: white }}>
                    ثبت امتیاز
                  </Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
