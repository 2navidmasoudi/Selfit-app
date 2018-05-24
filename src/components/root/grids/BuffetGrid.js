import React, { Component } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { styles } from './style';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import BuffetMenu from '../../Main/BuffetMenu';
import BuffetKeeper from '../../Main/BuffetKeeper';
import Coach from '../../Main/Coach';
import { selectBuffet, tokenBuffet } from '../../../redux/actions';
import { getSingleIDMember } from '../../../services/buffet';
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
  componentDidMount() {
    this.setInfo();
    // TODO: BACKGROUND TIMER ON IOS
  }
  async setInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    const buffetInfo = await this._getSingleIDMember();
    await this.props.selectBuffet(buffetInfo.idbuffet);
    console.log('buffet for this user:', buffetInfo.namebuffet, 'buffetid from props:', this.props.buffetid);
  }
  async _getSingleIDMember() {
    try {
      const { tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const BuffetKeeperInfo = await getSingleIDMember(tokenmember, tokenapi);
      return BuffetKeeperInfo;
    } catch (error) {
      console.log(error);
      logError(error, '_getSingleIDMember', 'BuffetMenu/index', 'getSingleIDMember');
    }
  }
  render() {
    return (
      <Container>
        <View style={styles.mainContainer}>
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
        </View>
      </Container>
    );
  }
}
