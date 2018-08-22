import React, { Component } from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import moment from 'moment-jalaali';
import { connect } from 'react-redux';
import { Rating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Text } from '../../Kit';
import { mainColor, white } from '../../../assets/variables/colors';
import { postRateCoach } from '../../../services/coach';

@connect(state => ({
  user: state.user,
  tokenapi: state.gym.tokenapi,
}))
export default class CoachCard extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     Btn: false,
  //   };
  // }
  onPressHandle(coach) {
    Actions.coachDetail({ coach });
    console.log(coach);
  }
  // ratingCompleted(rate) {
  //   console.log(`Rating is: ${rate}`);
  //   this.setState({ rate, Btn: true });
  // }
  // async submitRate() {
  //   try {
  //     const { tokenmember } = await this.props.user;
  //     const { tokenapi, coach } = await this.props;
  //     let { rate } = await this.state;
  //     rate = await Number(rate);
  //     const result = await postRateCoach(coach.idcoach, rate, tokenmember, tokenapi);
  //     console.log(result, 'postRateGym');
  //     if (result === 1) {
  //       this.setState({ disableRate: true, Btn: false });
  //       Alert.alert(
  //         'ثبت امتیاز',
  //         'امتیاز شما ثبت شد. با تشکر!',
  //         [
  //           { text: 'بازگشت' },
  //         ]
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  render() {
    const { coach } = this.props;
    const m = moment(`${coach.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
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
              <Text
                style={{ marginRight: 10, marginBottom: 5 }}
                type="bold"
              >
                {coach.namecoach}
              </Text>
              {/* <Rating */}
              {/* fractions={1} */}
              {/* startingValue={coach.RateNumber} */}
              {/* imageSize={20} */}
              {/* style={{ marginRight: 10 }} */}
              {/* onFinishRating={this.ratingCompleted.bind(this)} */}
              {/* /> */}
              {/* {this.state.Btn && */}
              {/* <Button */}
              {/* disabled={this.state.disableRate} */}
              {/* style={{ backgroundColor: mainColor, marginRight: 10, paddingHorizontal: 20 }} */}
              {/* onPress={this.submitRate.bind(this)} */}
              {/* > */}
              {/* <Text style={{ color: white }}> */}
              {/* ثبت امتیاز */}
              {/* </Text> */}
              {/* </Button>} */}
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}
