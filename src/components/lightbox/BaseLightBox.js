import React, { Component } from 'react';
import { Animated, Dimensions, Platform } from 'react-native';
import { View, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { LightBoxStyle } from '../../assets/styles/sign';

const isIOS = Platform.OS === 'ios';
const { width: deviceWidth } = Dimensions.get('window');
export default class BaseLightBox extends Component {
  state = {
    opacity: new Animated.Value(0),
  };
  componentWillMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
    }).start();
  }
  close() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 200,
    }).start(Actions.pop);
  }
  _renderLightBox() {
    const { children, verticalPercent = 1 } = this.props;
    const width = verticalPercent ? deviceWidth * verticalPercent : deviceWidth;
    return (
      <View style={[LightBoxStyle.viewStyle, { width }]}>
        {children}
        <Button transparent style={LightBoxStyle.closeButton} onPress={() => this.close()}>
          <Icon name="close-circle" style={LightBoxStyle.closeIcon} />
        </Button>
      </View>
    );
  }
  render() {
    return (
      <Animated.View style={[LightBoxStyle.container, { opacity: this.state.opacity }]}>
        {this._renderLightBox()}
        {isIOS && <KeyboardSpacer />}
      </Animated.View>
    );
  }
}
