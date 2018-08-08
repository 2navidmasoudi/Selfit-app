import React, { Component } from 'react';
import { Alert, ImageBackground, View } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { copilot, CopilotStep } from '@okgrow/react-native-copilot';
import { styles } from './style';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import MyGym from '../../Main/MyGym';
import Coach from '../../Main/Coach';
import { logError } from '../../../services/log';
import { selectGym, tokenGym } from '../../../redux/actions';
import { getSingleIDMemberGym } from '../../../services/gym';
import Buffet from '../../Main/Buffet';
import { HelpStyle, HelpView, TipNumber, Tooltip } from '../../ToolTip';
import { helpDoneGym } from '../../../redux/actions/help';
import Federation from '../../Main/Federation';
import CoachPic from '../../../assets/Coach.jpg';

@connect(state => ({
  user: state.user,
  gymid: state.gym.gymid,
  tokenapi: state.gym.tokenapi,
  help: state.help.mainGym,
}), {
  tokenGym,
  selectGym,
  helpDoneGym
})
@copilot({
  tooltipComponent: Tooltip,
  stepNumberComponent: TipNumber
})
export default class GymGrid extends Component {
  componentDidMount() {
    this.setInfo();
    this.help();
  }
  async setInfo() {
    await this.props.tokenGym('selfit.gym');
    await this.getSingleIDMember();
    if (!this.props.gymid) {
      Alert.alert(
        'اخطار',
        'باشگاه ی شما هنوز مشخص نشده، لطفا با پشتیبانی تماس بگیرید.',
        [
          { text: 'بازگشت', },
          { text: 'پشتیبانی', onPress: () => Actions.support() },
        ], {
          cancelable: false,
        }
      );
    }
  }
  async getSingleIDMember() {
    try {
      const { tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const gymInfo = await getSingleIDMemberGym(tokenmember, tokenapi);
      console.log(gymInfo);
      console.log('gymInfo');
      await this.props.selectGym(gymInfo.idgym);
      console.log('gym for this user:', gymInfo.namegym, 'gymid from props:', this.props.gymid);
    } catch (error) {
      console.log(error);
      logError(error, '_getSingleIDMember', 'GymGrid', 'getSingleIDMember');
    }
  }
  async help() {
    await this.props.copilotEvents.on('stepChange', this.handleStepChange);
    if (!this.props.help) {
      this.props.start();
      this.props.helpDoneGym();
    }
  }
  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  };
  render() {
    return (
      <Container>
        <View style={styles.mainContainer}>
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <CopilotStep text="با زدن این دکمه میتونی هر چی برای رژیم نیاز داری سفارش بدی." order={2} name="Buffet">
                <HelpView style={HelpStyle.main}>
                  <Buffet />
                </HelpView>
              </CopilotStep>
            </View>
            <View style={styles.wrapper}>
              <CopilotStep text="در این قسمت می تونید کلیه اطلاعات باشگاه خودتو ویرایش کنید." order={1} name="Gym">
                <HelpView style={HelpStyle.main}>
                  <MyGym />
                </HelpView>
              </CopilotStep>
            </View>
          </View>
          <View style={styles.mainRowWrapper}>
            <ImageBackground
              source={CoachPic}
              style={styles.wrapper}
              imageStyle={styles.background}
            >
              <View style={styles.wrapper}>
                <CopilotStep
                  text="با زدن این دکمه میتونی مربی مناسب خودتو پیدا کنی و باهاش مستقیم در تماس باشی."
                  order={4}
                  name="Coach"
                >
                  <HelpView style={HelpStyle.main}>
                    <Coach />
                  </HelpView>
                </CopilotStep>
              </View>
              <View style={styles.wrapper}>
                <CopilotStep
                  text="با زدن این دکمه می تونی با فدراسیون هر ورزش آشنا بشی و راه ارتباطی مستقیمش رو ببینی."
                  order={6}
                  name="Federation"
                >
                  <HelpView style={HelpStyle.main}>
                    <Federation />
                  </HelpView>
                </CopilotStep>
              </View>
            </ImageBackground>
            <View style={styles.wrapper}>
              <View style={styles.wrapper}>
                <CopilotStep
                  text="فروشگاه قراره بهترین هارو با بهترین قیمت و ارسال رایگان در اختیارت بذاره، با زدن این دکمه میتونی لوازم ورزشی و مواد غذایی رو با بهترین قیمت و کیفیت به همراه ارسال رایگان بخری."
                  order={3}
                  name="Store"
                >
                  <HelpView style={HelpStyle.main}>
                    <Store />
                  </HelpView>
                </CopilotStep>
              </View>
              <View style={styles.wrapper}>
                <CopilotStep text="با زدن این دکمه می تونی کلی موزیک جدید و تخصصی برای ورزش گوش کنی." order={5} name="Music">
                  <HelpView style={HelpStyle.main}>
                    <Music />
                  </HelpView>
                </CopilotStep>
              </View>
            </View>
          </View >
        </View>
      </Container>
    );
  }
}
