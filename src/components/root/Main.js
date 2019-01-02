import React, { Component } from 'react';
import { NetInfo, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
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
import { handleRootConnection } from '../../utils/handleConnection';

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
  };
  constructor() {
    super();
    this.state = {
      viewComponent: 1,
    };
  }
  async componentWillMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleRootConnection,
    );
    const {
      typememberid,
      tokenapi,
      tokenmember,
    } = await this.props.user;
    if (!(typememberid || tokenapi || tokenmember)) {
      Actions.reset('sign');
    }
    switch (typememberid) {
      case 6: // member
      case 1: // admin
      case 2: // support
      case 3: // author
        this.setState({ viewComponent: 1 });
        break;
      case 5: // buffet
        this.setState({ viewComponent: 2 });
        break;
      case 4: // gym
        this.setState({ viewComponent: 3 });
        break;
      default:
        break;
    }
    putCheckToken(tokenmember, tokenapi);
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', handleRootConnection);
  }
  renderMain = () => {
    switch (this.state.viewComponent) {
      case 1:
        return <MemberGrid />;
      case 2:
        return <BuffetGrid />;
      case 3:
        return <GymGrid />;
      default:
        return <MemberGrid />;
    }
  };
  render() {
    const pannel = (
      <View>
        <View style={main.pannelContainer}>
          <TouchableOpacity
            style={main.pannelBtn}
            onPress={() => this.setState({ viewComponent: 3 })}
          >
            <Text style={main.pannelTextBtn}>باشگاه دار</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={main.pannelBtn}
            onPress={() => this.setState({ viewComponent: 2 })}
          >
            <Text style={main.pannelTextBtn}>بوفه دار</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={main.pannelBtn}
            onPress={() => this.setState({ viewComponent: 1 })}
          >
            <Text style={main.pannelTextBtn}>ورزشکار</Text>
          </TouchableOpacity>
        </View>
      </View>);
    return (
      <Container>
        <AppHeader
          rightTitle="صفحه اصلی"
          hasBlog
          Drawer
        />
        {this.renderMain()}
        {this.props.user.typememberid === 1 && pannel}
        <Animatable.View
          ref={(music) => { MusicRef = music; }}
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            display: this.props.music ? 'flex' : 'none',
            height: 500,
          }}
          useNativeDriver
        >
          {this.props.music &&
          <Music />}
        </Animatable.View>
      </Container>
    );
  }
}

