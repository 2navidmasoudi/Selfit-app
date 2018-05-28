import React, { Component } from 'react';
import { Container, Content, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { TabsStyle } from '../../../assets/styles/gym';
import List1 from './List1';
import List2 from './List2';

@connect(state => ({
  user: state.user,
}))
export default class Couch extends Component {
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="مربیان" />
        <Content>
          <Tabs
            locked
            tabBarPosition="top"
            tabBarUnderlineStyle={TabsStyle.underLine}
          >
            <Tab
              heading="بر اساس نظرات"
              activeTextStyle={TabsStyle.activeText}
              textStyle={TabsStyle.text}
              activeTabStyle={TabsStyle.activeTab}
              tabStyle={TabsStyle.notActiveTabs}
            >
              <List1 />
            </Tab>
            <Tab
              heading="بر اساس رتبه"
              activeTextStyle={TabsStyle.activeText}
              textStyle={TabsStyle.text}
              activeTabStyle={TabsStyle.activeTab}
              tabStyle={TabsStyle.notActiveTabs}
            >
              <List2 />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}
