import React, { Component } from 'react';
import { Alert, ImageBackground, View } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { copilot, CopilotStep } from '@okgrow/react-native-copilot';
import PropTypes from 'prop-types';
import { styles } from './style';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import BuffetMenu from '../../Main/BuffetMenu';
import BuffetKeeper from '../../Main/BuffetKeeper';
import Coach from '../../Main/Coach';
import { selectBuffet, tokenBuffet } from '../../../redux/actions';
import { getSingleIDMemberBuffet } from '../../../services/buffet';
import { logError } from '../../../services/log';
import { HelpStyle, HelpView, TipNumber, Tooltip } from '../../ToolTip';
import { helpDoneBuffet } from '../../../redux/actions/help';
import Federation from '../../Main/Federation';
import CoachPic from '../../../assets/Coach.jpg';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
  help: state.help.mainBuffet,
}), {
  tokenBuffet,
  selectBuffet,
  helpDoneBuffet,
})
@copilot({
  tooltipComponent: Tooltip,
  stepNumberComponent: TipNumber
})
export default class BuffetGrid extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    buffetid: PropTypes.number,
    help: PropTypes.boolean.isRequired,
    tokenBuffet: PropTypes.func.isRequired,
    selectBuffet: PropTypes.func.isRequired,
    helpDoneBuffet: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired
  };
  static defaultProps = {
    buffetid: null,
  };
  componentDidMount() {
    setTimeout(
      () => this.help(),
      1000
    );
    this.setInfo();
  }
  async setInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.getSingleIDMember();
    if (!this.props.buffetid) {
      Alert.alert(
        'اخطار',
        'بوفه ی شما هنوز مشخص نشده، لطفا با پشتیبانی تماس بگیرید.',
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
      const buffetInfo = await getSingleIDMemberBuffet(tokenmember, tokenapi);
      await this.props.selectBuffet(buffetInfo.idbuffet, buffetInfo.namebuffet);
      // console.log(
      //   'buffet for this user:', buffetInfo.namebuffet,
      //   'buffetid from props:', this.props.buffetid
      // );
    } catch (error) {
      // console.log(error);
      logError(error, '_getSingleIDMember', 'BuffetMenu/index', 'getSingleIDMember');
    }
  }
  async help() {
    try {
      if (!this.props.help) {
        this.props.start();
        this.props.helpDoneBuffet();
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <Container>
        <View style={styles.mainContainer}>
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <CopilotStep text="در این قسمت می توانید سفارش های خود را مدیریت کنید." order={2} name="BuffetKeeper">
                <HelpView style={HelpStyle.main}>
                  <BuffetKeeper />
                </HelpView>
              </CopilotStep>
            </View>
            <View style={styles.wrapper}>
              <CopilotStep text="در این قسمت منو خود رو ویرایش کنید با غذاهای خود را روشن یا خاموش کنید." order={1} name="BuffetMenu">
                <HelpView style={HelpStyle.main}>
                  <BuffetMenu />
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
          </View>
        </View>
      </Container>
    );
  }
}

