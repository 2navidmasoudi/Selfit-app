import React, { Component } from 'react';
import { Alert, ImageBackground, View } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import MyGym from '../../Main/MyGym';
import Coach from '../../Main/Coach';
import { logError } from '../../../services/log';
import { selectGym, tokenGym } from '../../../redux/actions';
import { getSingleIDMemberGym } from '../../../services/gym';

@connect(state => ({
  user: state.user,
  gymid: state.gym.gymid
}), {
  tokenGym,
  selectGym
})
export default class GymGrid extends Component {
  componentDidMount() {
    this.setInfo();
    // TODO: BACKGROUND TIMER ON IOS
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
      console.log('gym for this user:', gymInfo.namegym, 'gymid from props:', this.props.gymid);
    }
  }
  async getSingleIDMember() {
    try {
      const { tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const gymInfo = await getSingleIDMemberGym(tokenmember, tokenapi);
      await this.props.selectGym(gymInfo.idgym);
    } catch (error) {
      console.log(error);
      logError(error, '_getSingleIDMember', 'BuffetMenu/index', 'getSingleIDMember');
    }
  }
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../../../assets/GymGrid.jpeg')}
          imageStyle={styles.background}
          style={styles.mainContainer}
        >
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <MyGym />
            </View>
            <View style={styles.wrapper}>
              <Coach />
            </View>
          </View>
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <Store />
            </View>
            <View style={styles.wrapper}>
              <Music />
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
