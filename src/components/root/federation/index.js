import React from 'react';
import { Container, Tab, Tabs } from 'native-base';
import AppHeader from '../../header';
import { TabsStyle } from '../../../assets/styles/gym';
import List from './List';

export default () => (
  <Container>
    <AppHeader rightTitle="فدراسیون" />
    <Tabs
      locked
      tabBarPosition="top"
      tabBarUnderlineStyle={TabsStyle.underLine}
    >
      <Tab
        heading="فدراسیون، انجمن و ..."
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
