import React, { Component } from 'react';
import { Button, Container, Content, Text, } from 'native-base';
import HTMLView from 'react-native-htmlview';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { receiveGym, tokenGym } from '../../../redux/actions';
import { getSingleGym } from '../../../services/gym';

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
    Actions.editGym();
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
        <AppHeader rightTitle="باشگاه من" backButton="flex" />
        <Content padder>
          <Text>اسم: {gym.namegym}</Text>
          <Text>آدرس: {gym.addressgym}</Text>
          <Text>توضیحات: </Text>
          <HTMLView
            value={html}
            stylesheet={{ flex: 1, textAlign: 'right' }}
          />
          <Text>تلقن باشگاه: {gym.telgym}</Text>
          <Text>شهریه باشگاه: {gym.tuitiongym}</Text>
          <Text>عرض جغرافیایی: {gym.latgym}</Text>
          <Text>طول جغرافیایی: {gym.longgym}</Text>
          <Text>فعالیت باشگاه: {gym.activegym ? 'فعال' : 'غیر فعال'}</Text>
          <Text>ظرفیت باشگاه: {gym.numbertuitiongym}</Text>
          <Text>تعداد بازدید: {gym.visitgym}</Text>
        </Content>
        <Button full onPress={this.onPressHandler.bind(this)}>
          <Text>ویرایش باشگاه</Text>
        </Button>
      </Container>
    );
  }
}
