import React, { Component } from 'react';
import { Alert, ImageBackground, View } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
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

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}), {
  tokenBuffet,
  selectBuffet,
})
export default class BuffetGrid extends Component {
  // static propTypes = {
  //   user: PropTypes.node.isRequired,
  //   buffetid: PropTypes.node.isRequired,
  //   tokenBuffet: PropTypes.func.isRequired,
  //   selectBuffet: PropTypes.func.isRequired,
  // };
  componentDidMount() {
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
      await this.props.selectBuffet(buffetInfo.idbuffet);
      console.log('buffet for this user:', buffetInfo.namebuffet, 'buffetid from props:', this.props.buffetid);
    } catch (error) {
      console.log(error);
      logError(error, '_getSingleIDMember', 'BuffetMenu/index', 'getSingleIDMember');
    }
  }
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
              <BuffetKeeper />
            </View>
            <View style={styles.wrapper}>
              <BuffetMenu />
            </View>
          </View>
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <Coach />
            </View>
            <View style={styles.wrapper}>
              <View style={styles.wrapper}>
                <Store />
              </View>
              <View style={styles.wrapper}>
                <Music />
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

