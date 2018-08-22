import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { TabsStyle } from '../../../assets/styles/gym';
import List1 from './List1';
import List2 from './List2';
import { Modal, Text } from '../../Kit';
import { helpDoneCoachList } from '../../../redux/actions/help';
import Pic1 from '../../../assets/helpPics/Coach/CoachSearch.png';
import Pic2 from '../../../assets/helpPics/Coach/CoachCard.png';
import {refreshBuffet, refreshGym} from "../../../redux/actions";

@connect(state => ({
  help: state.help.CoachList
}), { helpDoneCoachList, refreshGym, refreshBuffet })
export default class Coach extends Component {
  constructor() {
    super();
    this.state = {
      ModalNumber: 0,
    };
  }
  componentWillMount() {
    if (!this.props.help) {
      this.setState({ ModalNumber: 1 });
    }
  }
  componentWillUnmount() {
    this.props.refreshGym();
    this.props.refreshBuffet();
  }
  helpDone = () => this.props.helpDoneCoachList();
  render() {
    return (
      <Container>
        <Modal
          isVisible={this.state.ModalNumber === 1}
          onModalHide={() => this.setState({ ModalNumber: 2 })}
          exitText="ممنون"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 100,
            }}
            source={Pic1}
            resizeMode="contain"
          />
          <Text>
            از اینجا میتونی مربی مورد نظر خودت رو
            از طریق اسم، مشخصات و جزئیات جستجو کنی.
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 2}
          onModalHide={this.helpDone}
          exitText="خیلی خب"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 150,
            }}
            source={Pic2}
            resizeMode="contain"
          />
          <Text>
            با زدن بر روی این باکس، جزئیات مربی رو ببینید.
          </Text>
        </Modal>
        <AppHeader rightTitle="مربیان" />
        <Tabs
          locked
          tabBarPosition="top"
          tabBarUnderlineStyle={TabsStyle.underLine}
        >
          <Tab
            heading="آقایون"
            activeTextStyle={TabsStyle.activeText}
            textStyle={TabsStyle.text}
            activeTabStyle={TabsStyle.activeTab}
            tabStyle={TabsStyle.notActiveTabs}
          >
            <List1 />
          </Tab>
          <Tab
            heading="بانوان"
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
