import React, { Component } from 'react';
import { Container, Fab, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { copilot, walkthroughable, CopilotStep } from '@okgrow/react-native-copilot';
import AppHeader from '../../header';
import MapComponent from './map';
import List from './list';
import { TabsStyle } from '../../../assets/styles/gym';
import { locateUser } from '../../../redux/actions/index';
import { putCheckToken } from '../../../services/index';
import { Text } from '../../Kit';
import { TipNumber, Tooltip } from '../../ToolTip';
import { helpDoneBuffetIndex } from '../../../redux/actions/help';

const TabHelp = walkthroughable(Tab);
const FabHelp = walkthroughable(Fab);
@connect(state => ({
  user: state.user,
  help: state.help.BuffetIndex,
}), {
  locateUser,
  helpDoneBuffetIndex
})
@copilot({
  tooltipComponent: Tooltip,
  stepNumberComponent: TipNumber
})
export default class Buffet extends Component {
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.getCurrentPosition();
  }
  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        this.props.locateUser(position.coords.latitude, position.coords.longitude);
      });
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
          {/*<CopilotStep text="لیست" order={1} name="LIST BUFFET">*/}
            <TabHelp
              heading="لیست"
              activeTextStyle={TabsStyle.activeText}
              textStyle={TabsStyle.text}
              activeTabStyle={TabsStyle.activeTab}
              tabStyle={TabsStyle.notActiveTabs}
            >
              <List />
            </TabHelp>
          {/*</CopilotStep>*/}
        </Tabs>
        {/*<CopilotStep text="پیگیری سفارش" order={2} name="Follow buffet fab">*/}
          <FabHelp
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
          </FabHelp>
        {/*</CopilotStep>*/}
      </Container>
    );
  }
}
