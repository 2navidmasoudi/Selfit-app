import React, { Component } from 'react';
import { Button, Container, Content } from 'native-base';
import HTMLView from 'react-native-htmlview';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { receiveGym, tokenGym } from '../../../redux/actions';
import { getSingleGym } from '../../../services/gym';
import { Text } from '../../Kit';
import { mainColor } from '../../../assets/variables/colors';
import {persianNumber} from "../../../utils/persian";

@connect(state => ({
  user: state.user,
  tokenapi: state.gym.tokenapi,
  gym: state.gym.GymList,
}), {
  tokenGym,
  receiveGym,
})
export default class MyGym extends Component {
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.getInfo();
  }
  onPressHandler() {
    Actions.editGym({gym: this.props.gym});
  }
  async getInfo() {
    await this.props.tokenGym('selfit.gym');
    await this._getSingLeGym();
  }
  async _getSingLeGym() {
    try {
      // TODO: gymID
      const { tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const gymInfo = await getSingleGym(79, tokenmember, tokenapi);
      console.log(gymInfo, 'gymInfo');
      this.props.receiveGym(gymInfo, 0);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { gym } = this.props;
    const html = `<div>${gym.descgym}</div>`;
    return (
      <Container>
        <AppHeader rightTitle="باشگاه من" />
        <Content padder>
          <Text>اسم: {gym.namegym}</Text>
          <Text>آدرس: {gym.addressgym}</Text>
          <Text>توضیحات: </Text>
          <HTMLView
            value={html}
          />
          <Text>تلقن باشگاه: {persianNumber(gym.telgym)}</Text>
          <Text>شهریه باشگاه: {persianNumber(gym.tuitiongym)}</Text>
          <Text>فعالیت باشگاه: {gym.activegym ? 'فعال' : 'غیر فعال'}</Text>
          <Text>ظرفیت باشگاه: {persianNumber(gym.numbertuitiongym)}</Text>
          <Text>تعداد بازدید: {persianNumber(gym.visitgym)}</Text>
        </Content>
        <Button
          full
          style={{ backgroundColor: mainColor }}
          onPress={this.onPressHandler.bind(this)}
        >
          <Text style={{ color: '#FFF' }}>ویرایش باشگاه</Text>
        </Button>
      </Container>
    );
  }
}
