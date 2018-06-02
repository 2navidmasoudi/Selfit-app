import React, { Component } from 'react';
import { Button, Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { receiveGym, tokenGym } from '../../../redux/actions';
import { getSingleGym, putGym } from '../../../services/gym';
import { Text } from '../../Kit';
import InputText from '../../Kit/TextInput/TextInput';
import { mainColor, white } from '../../../assets/variables/colors';
import { latinNumber, persianNumber } from '../../../utils/persian';
import { htmlStyle } from '../../../assets/styles/html';

@connect(state => ({
  user: state.user,
  tokenapi: state.gym.tokenapi,
  gym: state.gym.GymList,
}), {
  tokenGym,
  receiveGym,
})
export default class EditGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namegym: props.gym.namegym,
      addressgym: props.gym.addressgym,
      picgym: props.gym.picgym,
      tuitiongym: props.gym.tuitiongym.toString(),
      numbertuitiongym: props.gym.numbertuitiongym.toString(),
      latgym: props.gym.latgym.toString(),
      longgym: props.gym.longgym.toString(),
      active: props.gym.active,
      telgym: props.gym.telgym,
    };
  }
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.getInfo();
  }
  async onPressHandler() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { idgym, descgym } = await this.props.gym;
      const {
        namegym,
        picgym,
        tuitiongym,
        addressgym,
        numbertuitiongym,
        latgym,
        longgym,
        active,
        telgym
      } = await this.state;
      const json = await putGym(
        idgym, namegym, descgym, picgym, Number(tuitiongym), Number(numbertuitiongym),
        Number(latgym), Number(longgym), active, telgym, addressgym, tokenmember, tokenapi
      );
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
    // await this._getSingLeGym();
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
    const htmlContent = gym.descgym ? persianNumber(gym.descgym.replace(/(\r\n|\n|\r)/gm, '')) : '<p>فاقد توضیحات.</p>';
    return (
      <Container>
        <AppHeader rightTitle="باشگاه من" backButton="flex" />
        <Content padder>
          <Text style={{ textAlign: 'center', fontSize: 20, margin: 10 }}>ویرایش باشگاه</Text>
          <InputText
            label="اسم"
            value={this.state.namegym}
            onChangeText={namegym => this.setState({ namegym })}
          />
          <InputText
            label="آدرس"
            multiline
            value={this.state.addressgym}
            onChangeText={addressgym => this.setState({ addressgym })}
          />
          <Text>توضیحات: </Text>
          <HTMLView
            value={htmlContent}
            stylesheet={htmlStyle}
          />
          <Button
            block
            style={{ backgroundColor: mainColor }}
            onPress={() => Actions.htmlEditor({ gym: { ...this.state, descgym: gym.descgym, idgym: gym.idgym } })}
          >
            <Text style={{ color: white }}>
              ویرایش توضیحات
            </Text>
          </Button>
          <InputText
            label="تلفن"
            value={persianNumber(this.state.telgym)}
            onChangeText={telgym => this.setState({ telgym: latinNumber(telgym) })}
          />
          <InputText
            label="شهریه (تومان)"
            value={persianNumber(this.state.tuitiongym.toLocaleString())}
            onChangeText={tuitiongym => this.setState({ tuitiongym: latinNumber(tuitiongym) })}
          />
          <InputText
            label="ظرفیت (نفر)"
            value={persianNumber(this.state.numbertuitiongym.toLocaleString())}
            onChangeText={
              numbertuitiongym => this.setState({ numbertuitiongym: latinNumber(numbertuitiongym) })
            }
          />
        </Content>
        <Button
          full
          style={{ backgroundColor: mainColor }}
          onPress={this.onPressHandler.bind(this)}
        >
          <Text style={{ color: white }}>ثبت و تائید</Text>
        </Button>
      </Container>
    );
  }
}
