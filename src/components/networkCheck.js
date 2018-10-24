import React, { Component } from 'react';
import { NetInfo, View } from 'react-native';
import { Container, Button } from 'native-base';
import Status from './status';
import { handleNetworkCheck } from '../utils/handleConnection';
import { Text } from './Kit';
import { darkColor, mainColor, white } from '../assets/variables/colors';

export default class NetworkCheck extends Component {
  constructor() {
    super();
    this.handleNetworkCheck = () => {
      NetInfo.isConnected.fetch().then(isConnected => handleNetworkCheck(isConnected));
    };
  }
  componentWillMount() {
    this.handleNetworkCheck();
  }
  render() {
    return (
      <Container style={{ backgroundColor: darkColor }}>
        <Status />
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: darkColor }}>
          <Text style={{ textAlign: 'center', color: white }}>
            لطفا اتصال اینترنت خود را چک کنید و مجددا تلاش کنید!
          </Text>
        </View>
        <Button
          full
          onPress={() => this.handleNetworkCheck()}
          style={{ backgroundColor: mainColor }}
        >
          <Text style={{ color: white }}>تلاش مجدد</Text>
        </Button>
      </Container>
    );
  }
}
