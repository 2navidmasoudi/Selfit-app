import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import { main } from '../../assets/styles/index';
import AppHeader from '../header';
import { putCheckToken } from '../../services';
import MemberGrid from './grids/MemberGrid';
import GymGrid from './grids/GymGrid';
import BuffetGrid from './grids/BuffetGrid';
import { Text } from '../Kit';
import Music from './Music';

let MusicRef;
export const bounce = () => MusicRef.bounce(800);
export const musicUp = () => MusicRef.bounceInUp(1500);
export const musicDown = () => MusicRef.bounceOutDown(1500);

@connect(state => ({
  user: state.user,
  music: state.music.music
}))
export default class Main extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
  }
  state = {
    viewComponent: <MemberGrid />,
  };
  componentWillMount() {
    const { typememberid, tokenapi, tokenmember } = this.props.user;
    switch (typememberid) {
      case 6: // member
      case 1: // admin
      case 2: // support
      case 3: // author
        this.setState({ viewComponent: <MemberGrid /> });
        break;
      case 5: // buffet
        this.setState({ viewComponent: <BuffetGrid /> });
        break;
      case 4: // gym
        this.setState({ viewComponent: <GymGrid /> });
        break;
      default:
        break;
    }
    putCheckToken(tokenmember, tokenapi);
  }
  render() {
    const pannel = (
      <View>
        <View style={main.pannelContainer}>
          <TouchableOpacity
            style={main.pannelBtn}
            onPress={() => this.setState({ viewComponent: <GymGrid /> })}
          >
            <Text style={main.pannelTextBtn}>باشگاه دار</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={main.pannelBtn}
            onPress={() => this.setState({ viewComponent: <BuffetGrid /> })}
          >
            <Text style={main.pannelTextBtn}>بوفه دار</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={main.pannelBtn}
            onPress={() => this.setState({ viewComponent: <MemberGrid /> })}
          >
            <Text style={main.pannelTextBtn}>ورزشکار</Text>
          </TouchableOpacity>
        </View>
      </View>);
    return (
      <Container>
        <AppHeader rightTitle="صفحه اصلی" hasBlog />
        {this.state.viewComponent}
        {this.props.user.typememberid === 1 && pannel}
        <Animatable.View
          ref={(music) => { MusicRef = music; }}
          // animation="fadeOut"
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            display: this.props.music ? 'flex' : 'none',
            height: 500,
          }}
          useNativeDriver
        >
          <Music />
        </Animatable.View>
      </Container>
    );
  }
}

