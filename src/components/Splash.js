import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import { putCheckToken } from '../services';
import Status from './status';
import SplashVideo from '../assets/1.mp4';
import {darkColor} from '../assets/variables/colors';

@connect(state => ({ user: state.user }))
export default class Splash extends Component {
  state = {
    tokenChecked: false,
  };
  componentDidMount() {
    setTimeout(() => this.checkToken(), 100);
  }
  async checkToken() {
    try {
      const { tokenmember, tokenapi } = await this.props.user;
      const json = await putCheckToken(tokenmember, tokenapi);
      console.log('json for login');
      console.log(json);
      if (json === 1) {
        this.setState({ tokenChecked: true });
      } else {
        putCheckToken(tokenmember, tokenapi).then((result) => {
          console.log('json for login');
          console.log(result);
          if (result === 1) {
            this.setState({ tokenChecked: true });
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  leadToScreen() {
    if (this.state.tokenChecked === true) {
      Actions.reset('root');
    } else {
      Actions.reset('sign');
    }
  }
  render() {
    return (
      <Container style={{ backgroundColor: darkColor }}>
        <Status />
        <Video
          resizeMode="cover"
          playInBackground
          playWhenInactive
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
    position: 'absolute',
    top: -50,
    left: -50,
    bottom: -50,
    right: -50,
  },
});
