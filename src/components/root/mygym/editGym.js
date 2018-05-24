import React, { Component } from 'react';
import { Button, Container, Content, Form, Input, Item, Label, Text, } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { receiveGym, tokenGym } from '../../../redux/actions';
import { getSingleGym, putGym } from '../../../services/gym';
import { SignStyle } from '../../../assets/styles/sign';

@connect(state => ({
  user: state.user,
  tokenapi: state.gym.tokenapi,
  gym: state.gym.GymList,
}), {
  tokenGym,
  receiveGym,
})
export default class EditGym extends Component {
  state = {
    namegym: null,
    descgym: null,
    picgym: null,
    tuitiongym: null,
    addressgym: null,
    numbertuitiongym: null,
    latgym: null,
    longgym: null,
    active: null,
    telgym: null,
  };
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.getInfo();
  }
  async onPressHandler() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { idgym } = await this.props.gym;
      const {
        namegym,
        descgym,
        picgym,
        tuitiongym,
        addressgym,
        numbertuitiongym,
        latgym,
        longgym,
        active,
        telgym
      } = await this.state;
      const json = await putGym(idgym, namegym, descgym, picgym, Number(tuitiongym), Number(numbertuitiongym), Number(latgym), Number(longgym), active, telgym, addressgym, tokenmember, tokenapi);
      console.log('result: ', json);
      if (json) {
        await this._getSingLeGym();
        Actions.pop({ refresh: { refresh: Math.random() } });
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getInfo() {
    await this.props.tokenGym('selfit.gym');
    await this._getSingLeGym();
    await this.setState({
      namegym: this.props.gym.namegym,
      addressgym: this.props.gym.addressgym,
      descgym: this.props.gym.descgym,
      picgym: this.props.gym.picgym,
      tuitiongym: this.props.gym.tuitiongym.toString(),
      numbertuitiongym: this.props.gym.numbertuitiongym.toString(),
      latgym: this.props.gym.latgym.toString(),
      longgym: this.props.gym.longgym.toString(),
      active: this.props.gym.active,
      telgym: this.props.gym.telgym,
    });
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
    const {
      item, formInputText, formStyle,
    } = SignStyle;
    const { gym } = this.props;
    const html = `<div>${gym.descgym}</div>`;
    return (
      <Container>
        <AppHeader rightTitle="باشگاه من" backButton="flex" />
        <Content padder>
          <Text style={{ textAlign: 'center', fontSize: 20, margin: 10 }}>ویرایش باشگاه</Text>
          <Form style={formStyle}>
            <Item style={item}>
              <Input
                style={formInputText}
                value={this.state.namegym}
                onChangeText={namegym => this.setState({ namegym })}
              />
              <Label>اسم</Label>
            </Item>
            <Item style={item}>
              <Input
                style={formInputText}
                value={this.state.addressgym}
                onChangeText={addressgym => this.setState({ addressgym })}
              />
              <Label>آدرس</Label>
            </Item>
            <Item style={item}>
              <Input
                style={formInputText}
                multiline
                value={this.state.descgym}
                onChangeText={descgym => this.setState({ descgym })}
              />
              <Label>توضیحات</Label>
            </Item>
            <Item style={item}>
              <Input
                style={formInputText}
                value={this.state.telgym}
                onChangeText={telgym => this.setState({ telgym })}
              />
              <Label>تلقن</Label>
            </Item>
            <Item style={item}>
              <Input
                style={formInputText}
                value={this.state.tuitiongym}
                onChangeText={tuitiongym => this.setState({ tuitiongym })}
              />
              <Label>شهریه</Label>
            </Item>
            <Item style={item}>
              <Input
                style={formInputText}
                value={this.state.latgym}
                onChangeText={latgym => this.setState({ latgym })}
              />
              <Label>عرض جغرافیایی</Label>
            </Item>
            <Item style={item}>
              <Input
                style={formInputText}
                value={this.state.longgym}
                onChangeText={longgym => this.setState({ longgym })}
              />
              <Label>طول جغرافیایی</Label>
            </Item>
            <Item style={item}>
              <Input
                style={formInputText}
                value={this.state.numbertuitiongym}
                onChangeText={numbertuitiongym => this.setState({ numbertuitiongym })}
              />
              <Label>ظرفیت</Label>
            </Item>
          </Form>
        </Content>
        <Button full onPress={this.onPressHandler.bind(this)}>
          <Text>ثبت و تائید</Text>
        </Button>
      </Container>
    );
  }
}
