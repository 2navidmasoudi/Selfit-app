import React, { Component } from 'react';
import { Container, Fab, Tab, Tabs } from 'native-base';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import MapComponent from './map';
import List from './list';
import { TabsStyle } from '../../../assets/styles/gym';
import { locateUser, receiveBuffet, refreshBuffet } from '../../../redux/actions';
import { putCheckToken } from '../../../services/index';
import { Text, Modal } from '../../Kit';
import { helpDoneBuffetIndex } from '../../../redux/actions/help';
import Pic1 from '../../../assets/helpPics/BuffetIndex/BuffetTabs.png';
import Pic2 from '../../../assets/helpPics/BuffetIndex/BuffetPin.png';
import Pic3 from '../../../assets/helpPics/BuffetIndex/BuffetDetailMap.png';
import Pic4 from '../../../assets/helpPics/BuffetIndex/BuffetFollow.png';
import { getAllBuffet } from '../../../services/buffet';

@connect(state => ({
  user: state.user,
  help: state.help.BuffetIndex,
}), {
  receiveBuffet,
  locateUser,
  helpDoneBuffetIndex,
  refreshBuffet
})
export default class Buffet extends Component {
  constructor() {
    super();
    this.state = {
      ModalNumber: 0,
    };
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
  }
  componentWillMount() {
    if (!this.props.help) {
      this.setState({ ModalNumber: 1 });
    }
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.getCurrentPosition();
  }
  componentWillUnmount() {
    this.props.refreshBuffet();
  }
  getCurrentPosition() {
    const { tokenmember } = this.props.user;
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await this.props.locateUser(position.coords.latitude, position.coords.longitude);
        const json = await getAllBuffet(
          position.coords.latitude,
          position.coords.longitude,
          tokenmember, 'selfit.buffet', 120, 0, false, 0
        );
        await this.props.receiveBuffet(json, 0);
      });
    } catch (error) {
      console.log(error);
    }
  }
  helpDone = () => this.props.helpDoneBuffetIndex();
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
              height: 70,
            }}
            source={Pic1}
            resizeMode="contain"
          />
          <Text>
            با زدن دکمه لیست یا نقشه بوفه های مورد نظر خودت رو بصورت
            لیست یا بر روی نقشه ببین و انتخاب کن.
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 2}
          onModalHide={() => this.setState({ ModalNumber: 3 })}
          exitText="خیلی خب"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 200,
            }}
            source={Pic2}
            resizeMode="contain"
          />
          <Text>
            یکی از پین هارو انتخاب کن تا اسم و آدرس اون بوفه رو ببینی
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 3}
          onModalHide={() => this.setState({ ModalNumber: 4 })}
          exitText="دیگه چی؟"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 170,
            }}
            source={Pic3}
            resizeMode="contain"
          />
          <Text>
            با زدن این باکس می تونی جزئیات و منو بوفه رو ببینی و سفارش غذای رژیمی بدی!
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 4}
          onModalHide={this.helpDone}
          exitText="تمام"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 160,
            }}
            source={Pic4}
            resizeMode="contain"
          />
          <Text>
            با زدن دکمه پیگیری سفارش،
            سفارش های خودتو ببین، پیگیری کن و پرداخت کن!
          </Text>
        </Modal>
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
