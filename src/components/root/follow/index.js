import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { TabsStyle } from '../../../assets/styles/gym';
import List1 from './List1';
import List2 from './List2';
import { tokenBuffet } from '../../../redux/actions';

@connect(state => ({
  user: state.user,
}), {
  tokenBuffet,
})
export default class Follow extends Component {
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="پیگیری سفارش" backButton="flex" />
        <Tabs
          locked
          tabBarPosition="top"
          tabBarUnderlineStyle={TabsStyle.underLine}
        >
          <Tab
            heading="پراخت نشده"
            activeTextStyle={TabsStyle.activeText}
            textStyle={TabsStyle.text}
            activeTabStyle={TabsStyle.activeTab}
            tabStyle={TabsStyle.notActiveTabs}
          >
            <List1 />
          </Tab>
          <Tab
            heading="پرداخت شده"
            activeTextStyle={TabsStyle.activeText}
            textStyle={TabsStyle.text}
            activeTabStyle={TabsStyle.activeTab}
            tabStyle={TabsStyle.notActiveTabs}
          >
            <List2 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
