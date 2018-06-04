import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Button, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { SignStyle } from '../assets/styles/sign';
import Status from './status';
import { Text } from './Kit';
import { darkColor, white } from '../assets/variables/colors';

const Sign = () => (
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
export default Sign;

{ /* <TouchableOpacity onPress={() => Actions.signUp()}> */ }
{ /* <ImageBackground */ }
{ /* imageStyle={SignStyle.signButtonStyle} */ }
{ /* source={require('./../assets/LoginButton.png')} */ }
{ /* style={SignStyle.signButtonImg} */ }
{ /* > */ }
{ /* <Text style={SignStyle.authButtonText}>ورود</Text> */ }
{ /* </ImageBackground> */ }
{ /* </TouchableOpacity> */ }
{ /* <TouchableOpacity onPress={() => Actions.signUp()}> */ }
{ /* <ImageBackground */ }
{ /* imageStyle={SignStyle.signButtonStyle} */ }
{ /* source={require('./../assets/LoginButton.png')} */ }
{ /* style={SignStyle.signButtonImg} */ }
{ /* > */ }
{ /* <Text style={SignStyle.authButtonText}>ثبت نام</Text> */ }
{ /* </ImageBackground> */ }
{ /* </TouchableOpacity> */ }
