import React, { Component } from 'react';
import { Title, Header, Left, Right, Body, Icon, Subtitle } from 'native-base';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { header } from '../../assets/styles';

export default class AppHeader extends Component {
  render() {
    return (
      <Header hasSubtitle style={header.headerColor} androidStatusBarColor="#313131" iosBarStyle="light-content">
        <Left style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableWithoutFeedback
            onPress={() => Actions.pop({ refresh: { refresh: Math.random() } })}
          >
            <View style={{ display: this.props.backButton || 'none', justifyContent: 'center', alignItems: 'center', height: 50, width: 50 }}>
              <Icon name="arrow-back" onPress={() => Actions.pop()} style={{ color: 'white', fontWeight: 500, display: this.props.backButton || 'none', marginHorizontal: 5 }} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => Actions.blogRoot()}>
            <View style={{ display: this.props.backButton == 'flex' ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', height: 50, width: 50 }}>
              <Icon name="school" onPress={() => Actions.blogRoot()} style={{ color: 'white' }} fontSize={30} />
            </View>
          </TouchableWithoutFeedback>
        </Left>
        <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Title style={header.bodyTitle}>SelFit</Title>
          <Subtitle style={header.bodySubTitle}>{this.props.rightTitle}
          </Subtitle>
        </Body>
        <Right style={{ flex: 1, alignItems: 'flex-end' }}>
          {/* <Text style={header.headerTextStyle}>{this.props.rightTitle}</Text> */}
          <TouchableWithoutFeedback onPress={() => Actions.drawerOpen()}>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, width: 50 }}>
              <Icon name="menu" onPress={() => Actions.drawerOpen()} style={{ color: 'white', fontWeight: 500 }} />
            </View>
          </TouchableWithoutFeedback>
        </Right>
      </Header>
    );
  }
}

