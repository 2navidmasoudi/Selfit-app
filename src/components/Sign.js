import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { SignStyle } from '../assets/styles/sign';
import Status from './status';

const Sign = () => (
  <Container>
    <Status />
    <ImageBackground
      style={SignStyle.SignBackground}
      source={require('../assets/morabie_man.jpg')}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => Actions.signUp()}>
          <ImageBackground
            imageStyle={SignStyle.signButtonStyle}
            source={require('./../assets/LoginButton.png')}
            style={SignStyle.signButtonImg}
          >
            <Text style={SignStyle.authButtonText}>ورود</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.signUp()}>
          <ImageBackground
            imageStyle={SignStyle.signButtonStyle}
            source={require('./../assets/LoginButton.png')}
            style={SignStyle.signButtonImg}
          >
            <Text style={SignStyle.authButtonText}>ثبت نام</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </Container>
);
export default Sign;
