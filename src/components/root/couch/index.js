import React from 'react';
import { Container, Tab, Tabs } from 'native-base';
import AppHeader from '../../header';
import { TabsStyle } from '../../../assets/styles/gym';
import List1 from './List1';
import List2 from './List2';

export default () => (
  <Container>
    <AppHeader rightTitle="مربیان" />
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
        heading="بر اساس حروف الفبا"
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
