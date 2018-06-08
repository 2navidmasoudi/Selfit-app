import React, { Component } from 'react';
import { View, TouchableOpacity, BackHandler } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { main } from '../../assets/styles/index';
import AppHeader from '../header';
import { putCheckToken } from '../../services';
import MemberGrid from './grids/MemberGrid';
import GymGrid from './grids/GymGrid';
import BuffetGrid from './grids/BuffetGrid';
import { Text } from '../Kit';

@connect(state => ({
  user: state.user,
}))
export default class Main extends Component {
  state = {
    viewComponent: <MemberGrid />,
  };
  componentWillMount() {
    const { typememberid } = this.props.user;
    this._putCheckToken();
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
  }
  async _putCheckToken() {
    const { tokenmember, tokenapi } = await this.props.user;
    await putCheckToken(tokenmember, tokenapi);
  }
  render() {
    const pannel =
      this.props.user.typememberid ===
      1 ?
        (<View>
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
         </View>)
        : null;
    return (
      <Container>
        <AppHeader rightTitle="صفحه اصلی" hasBlog />
        {this.state.viewComponent}
        {pannel}
      </Container>
    );
  }
}
