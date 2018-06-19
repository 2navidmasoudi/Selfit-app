import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { SignStyle } from '../assets/styles/sign';
import Status from './status';
import { Text } from './Kit';
import { darkColor, white } from '../assets/variables/colors';
import { putCheckToken } from '../services';

@connect(state => ({
  user: state.user,
}))
export default class Sign extends Component {
  componentWillMount() {
    this.checkToken();
  }
  async checkToken() {
    try {
      const { tokenmember, tokenapi } = await this.props.user;
      if (tokenmember) {
        const json = await putCheckToken(tokenmember, tokenapi);
        console.log('json for login');
        console.log(json);
        if (json === 1) {
          Actions.reset('root');
        } else {
          putCheckToken(tokenmember, tokenapi).then((result) => {
            console.log('json for login');
            console.log(result);
            if (result === 1) {
              Actions.reset('root');
            }
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <Container>
        <Status />
        <ImageBackground
          style={SignStyle.SignBackground}
          source={require('../assets/morabie_man.jpg')}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Button
              block
              style={{ flex: 1, margin: 5, backgroundColor: darkColor }}
              onPress={() => Actions.signUp()}
            >
              <Text style={{ color: white }}>ورود</Text>
            </Button>
            <Button
              block
              style={{ flex: 1, margin: 5, backgroundColor: darkColor }}
              onPress={() => Actions.signUp()}
            >
              <Text style={{ color: white }}>ثبت نام</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
