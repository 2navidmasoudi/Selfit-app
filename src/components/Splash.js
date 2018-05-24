import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import { putCheckToken } from '../services';
import Status from './status';
import SplashVideo from '../assets/1.mp4';

@connect(state => ({ user: state.user, rehydrated: state.rehydrated }))
export default class Splash extends Component {
  state = {
    tokenChecked: false,
  };
  componentDidMount() {
    if (this.props.rehydrated === true) {
      this.checkUserLogin()
        .then((status) => {
          if (status) {
            this.setState({ tokenChecked: true });
          } else {
            this.setState({ tokenChecked: false });
          }
        });
    }
  }
  leadToScreen() {
    if (this.state.tokenChecked) {
      Actions.reset('root');
    } else {
      Actions.reset('sign');
    }
  }
  async checkUserLogin() {
    try {
      const { tokenmember } = await this.props.user;
      return tokenmember === (null || undefined)
        ? false
        : await this.checkUserLoginFromApi();
    } catch (error) {
      console.log(error);
    }
  }
  async checkUserLoginFromApi() {
    try {
      const { tokenmember, tokenapi } = await this.props.user;
      const json = await putCheckToken(tokenmember, tokenapi);
      return json === 1;
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Status />
        <Video
          resizeMode="cover"
          source={SplashVideo}
          onEnd={this.leadToScreen.bind(this)}
          style={styles2.backgroundVideo}
        />
      </Container>
    );
  }
}
const styles2 = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'white'
    position: 'absolute',
    top: -50,
    left: -50,
    bottom: -50,
    right: -50,
  },
});
