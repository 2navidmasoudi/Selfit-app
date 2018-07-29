import React, { Component } from 'react';
import { Alert, ImageBackground, View } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { copilot, CopilotStep } from '@okgrow/react-native-copilot';
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
  componentDidMount() {
    this.setInfo();
    this.help();
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
      await this.props.selectBuffet(buffetInfo.idbuffet);
      console.log('buffet for this user:', buffetInfo.namebuffet, 'buffetid from props:', this.props.buffetid);
    } catch (error) {
      console.log(error);
      logError(error, '_getSingleIDMember', 'BuffetMenu/index', 'getSingleIDMember');
    }
  }
  async help() {
    await this.props.copilotEvents.on('stepChange', this.handleStepChange);
    if (!this.props.help) {
      this.props.start();
      this.props.helpDoneBuffet();
    }
  }
  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  };
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../../../assets/BuffetGrid.jpeg')}
          imageStyle={styles.background}
          style={styles.mainContainer}
        >
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <CopilotStep text="بوفه آنلاین خیلی خوبه" order={1} name="BuffetKeeper">
                <HelpView style={HelpStyle.main}>
                  <BuffetKeeper />
                </HelpView>
              </CopilotStep>
            </View>
            <View style={styles.wrapper}>
              <CopilotStep text="بوفه آنلاین خیلی خوبه" order={2} name="BuffetMenu">
                <HelpView style={HelpStyle.main}>
                  <BuffetMenu />
                </HelpView>
              </CopilotStep>
            </View>
          </View>
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <CopilotStep text="مربی نمیخوایییی؟ خسته نشدیییی؟" order={3} name="Coach">
                <HelpView style={HelpStyle.main}>
                  <Coach />
                </HelpView>
              </CopilotStep>
            </View>
            <View style={styles.wrapper}>
              <View style={styles.wrapper}>
                <CopilotStep text="بخر دیگه" order={4} name="Store">
                  <HelpView style={HelpStyle.main}>
                    <Store />
                  </HelpView>
                </CopilotStep>
              </View>
              <View style={styles.wrapper}>
                <CopilotStep text="گوش بده ببین چی میگه" order={5} name="Music">
                  <HelpView style={HelpStyle.main}>
                    <Music />
                  </HelpView>
                </CopilotStep>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

