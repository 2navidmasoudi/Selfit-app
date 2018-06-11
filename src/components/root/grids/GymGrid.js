import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { styles } from './style';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import MyGym from '../../Main/MyGym';
import Coach from '../../Main/Coach';
import {logError} from "../../../services/log";
import {getSingleIDMemberBuffet} from "../../../services/buffet";

// TODO: getSingleIDMemberGym (token,tokenapi);
@connect(state => ({
  user: state.user,
}), {

})
export default class GymGrid extends Component {
  // componentDidMount() {
  //   this.setInfo();
  //   // TODO: BACKGROUND TIMER ON IOS
  // }
  // async setInfo() {
  //   await this.props.tokenBuffet('selfit.buffet');
  //   const buffetInfo = await this.getSingleIDMember();
  //   await this.props.selectBuffet(buffetInfo.idbuffet);
  //   console.log('buffet for this user:', buffetInfo.namebuffet, 'buffetid from props:', this.props.buffetid);
  // }
  // async getSingleIDMember() {
  //   try {
  //     const { tokenapi } = await this.props;
  //     const { tokenmember } = await this.props.user;
  //     return await getSingleIDMemberGy(tokenmember, tokenapi);
  //   } catch (error) {
  //     console.log(error);
  //     logError(error, '_getSingleIDMember', 'BuffetMenu/index', 'getSingleIDMember');
  //   }
  // }
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
