import React, { Component } from 'react';
import { Container, Fab, Tab, Tabs, Text } from 'native-base';
import { connect } from 'react-redux';
import { View } from 'react-native';
import AppHeader from '../../header';
import List from './list';
import { TabsStyle } from '../../../assets/styles/gym';
import { putCheckToken } from '../../../services/index';
import GymMap from './GymMap';
import { mainColor } from '../../../assets/variables/colors';
import { locateUser, tokenGym } from '../../../redux/actions';

@connect(state => ({
  user: state.user,
}), {
  locateUser,
  tokenGym
})
export default class Gym extends Component {
  state = {
    viewComponent: <GymMap />,
    tabTitle: 'لیست',
  };

  componentWillMount() {
    this.props.tokenGym('selfit.gym');
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.locateUser(position.coords.latitude, position.coords.longitude);
      },
      error => console.log(error.message)
    );
  }
  toggleComponent() {
    if (this.state.tabTitle === 'لیست') {
      this.setState({
        viewComponent: <GymMap />,
        tabTitle: 'نقشه',
      });
    } else {
      this.setState({
        viewComponent: <List />,
        tabTitle: 'لیست',
      });
    }
  }

  render() {
    return (
      <Container>
        <AppHeader rightTitle="باشگاه یاب" />
        <Tabs
          locked
          tabBarPosition="top"
          tabBarUnderlineStyle={TabsStyle.underLine}
        >
          <Tab
            heading={this.state.tabTitle}
            activeTextStyle={TabsStyle.activeText}
            textStyle={TabsStyle.text}
            activeTabStyle={TabsStyle.activeTab}
            tabStyle={TabsStyle.notActiveTabs}
          >
            {this.state.viewComponent}
          </Tab>
        </Tabs>
        <View style={{ flex: 0 }}>
          <Fab
            style={{ backgroundColor: mainColor }}
            position="bottomLeft"
            onPress={this.toggleComponent.bind(this)}
          >
            <Text style={{ fontSize: 18 }}>{this.state.tabTitle === 'لیست' ? 'نقشه' : 'لیست'}</Text>
          </Fab>
        </View>
      </Container>
    );
  }
}
