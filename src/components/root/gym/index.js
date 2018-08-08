import React, { Component } from 'react';
import { Container, Fab, Tab, Tabs, Text } from 'native-base';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import AppHeader from '../../header';
import List from './list';
import { TabsStyle } from '../../../assets/styles/gym';
import { putCheckToken } from '../../../services/index';
import GymMap from './GymMap';
import { mainColor } from '../../../assets/variables/colors';
import { locateUser, tokenGym } from '../../../redux/actions';

@connect(state => ({
  user: state.user,
}), { locateUser, tokenGym })
export default class Gym extends Component {
  static propTypes = {
    tokenGym: PropTypes.func.isRequired,
    locateUser: PropTypes.func.isRequired,
    user: PropTypes.objectOf(PropTypes.node).isRequired,
  };
  constructor() {
    super();
    this.state = {
      viewComponent: <List />,
      heading: 'لیست',
      display: 'flex',
    };
    this.onPress = this.onPress.bind(this);
  }
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
  onPress() {
    this.setState(
      { display: 'none' },
      () => setTimeout(() => this.setState({ display: 'flex' }), 3000)
    );
    if (this.state.heading === 'لیست') {
      this.setState({
        viewComponent: <GymMap />,
        heading: 'نقشه',
      });
    } else {
      this.setState({
        viewComponent: <List />,
        heading: 'لیست',
      });
    }
  }
  render() {
    const { heading } = this.state;
    return (
      <Container>
        <AppHeader rightTitle="باشگاه یاب" />
        <Tabs
          locked
          tabBarPosition="top"
          tabBarUnderlineStyle={TabsStyle.underLine}
        >
          <Tab
            heading={heading}
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
            style={{ backgroundColor: mainColor, display: this.state.display }}
            position="bottomLeft"
            onPress={this.onPress}
          >
            <Text style={{ fontSize: 18 }}>{heading === 'لیست' ? 'نقشه' : 'لیست'}</Text>
          </Fab>
        </View>
      </Container>
    );
  }
}
