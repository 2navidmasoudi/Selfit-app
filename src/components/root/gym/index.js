import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppHeader from '../../header';
import List from './list';
import { TabsStyle } from '../../../assets/styles/gym';
import { putCheckToken } from '../../../services/index';
import GymMap from './GymMap';
import { locateUser, receiveGym, refreshGym, tokenGym } from '../../../redux/actions';
import { getAllGym } from '../../../services/gym';

@connect(state => ({
  user: state.user,
}), { locateUser, tokenGym, receiveGym, refreshGym })
export default class Gym extends Component {
  static propTypes = {
    tokenGym: PropTypes.func.isRequired,
    locateUser: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.node).isRequired,
  };

  constructor() {
    super();
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
  }

  componentWillMount() {
    this.props.tokenGym('selfit.gym');
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.getCurrentPosition();
  }

  componentWillUnmount() {
    this.props.refreshGym();
  }

  getCurrentPosition() {
    const { tokenmember } = this.props.user;
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await this.props.locateUser(position.coords.latitude, position.coords.longitude);
          const GymList =
            await getAllGym(
              position.coords.latitude, position.coords.longitude,
              tokenmember, 'selfit.gym', 120, 0, 'addressgym%20asc'
            );
          console.log(GymList);
          this.props.receiveGym(GymList, 0);
        },
        error => console.log(error.message)
      );
    } catch (e) {
      console.log(e);
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
            heading="نقشه"
            activeTextStyle={TabsStyle.activeText}
            textStyle={TabsStyle.text}
            activeTabStyle={TabsStyle.activeTab}
            tabStyle={TabsStyle.notActiveTabs}
          >
            <GymMap />
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
      </Container>
    );
  }
}
