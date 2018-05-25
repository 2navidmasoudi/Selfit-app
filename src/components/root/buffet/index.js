import React, { Component } from 'react';
import { Container, Fab, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import MapComponent from './map';
import List from './list';
import { TabsStyle } from '../../../assets/styles/gym';
import { locateUser } from '../../../redux/actions/index';
import { putCheckToken } from '../../../services/index';
import { Text } from '../../Kit';

@connect(state => ({
  user: state.user,
}), {
  locateUser,
})
export default class Buffet extends Component {
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);

    this.getCurrentPosition();
  }
  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latval: position.coords.latitude,
            longval: position.coords.longitude,
          };
          this.props.locateUser(region.latval, region.longval);
        },
        error => alert(error.message),
        // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 , distanceFilter: 10}
      );
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="بوفه آنلاین" backButton="flex" />
        <Tabs
          locked
          tabBarPosition="top"
          tabBarUnderlineStyle={TabsStyle.underLine}
        >
          <Tab
            heading="نقشه"
            activeTextStyle={TabsStyle.activeText}
            textStyle={TabsStyle.text}
            activeTabStyle={TabsStyle.activeTab}
            tabStyle={TabsStyle.notActiveTabs}
          >
            <MapComponent />
          </Tab>
          <Tab
            heading="لیست"
            activeTextStyle={TabsStyle.activeText}
            textStyle={TabsStyle.text}
            activeTabStyle={TabsStyle.activeTab}
            tabStyle={TabsStyle.notActiveTabs}
          >
            <List />
          </Tab>
        </Tabs>
        <Fab
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 120,
            left: 10,
            borderRadius: 10,
            backgroundColor: '#0F9D7A'
          }}
          position="bottomLeft"
          onPress={() => Actions.follow()}
        >
          <Text style={{ fontSize: 18 }}>پیگیری سفارش</Text>
        </Fab>
      </Container>
    );
  }
}
