import React, { Component } from 'react';
import { Container, Content, Button as FullButton } from 'native-base';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { Button as UploadButton } from 'react-native-elements';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { receiveGym, tokenGym } from '../../../redux/actions';
import { getSingleGym, putGym } from '../../../services/gym';
import {Modal, Text} from '../../Kit';
import InputText from '../../Kit/TextInput/TextInput';
import { darkColor, mainColor, white } from '../../../assets/variables/colors';
import { latinNumber, persianNumber } from '../../../utils/persian';
import { htmlStyle } from '../../../assets/styles/html';
import { Gym } from '../../../services/type';
import { picker } from '../profile/imagePicker';
import { uploader } from '../../../services/UploadImage';
import { helpDoneEditGym } from '../../../redux/actions/help';
import Pic1 from '../../../assets/helpPics/MyGym/GymEditDetail.png';
import Pic2 from '../../../assets/helpPics/MyGym/EditGymDone.png';

@connect(state => ({
  user: state.user,
  tokenapi: state.gym.tokenapi,
  gym: state.gym.GymList,
  gymid: state.gym.gymid,
  help: state.help.editGym,
}), {
  tokenGym,
  receiveGym,
  helpDoneEditGym
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
      loading: false,
      Pic: null,
      PicJson: null,
      data: null,
      type: null,
      ModalNumber: 0,
    };
  }
  componentWillMount() {
    if (!this.props.help) {
      this.setState({ ModalNumber: 1 });
    }
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
        PicJson,
        tuitiongym,
        addressgym,
        numbertuitiongym,
        latgym,
        longgym,
        active,
        telgym
      } = await this.state;
      const json = await putGym(
        idgym, namegym, descgym, PicJson, Number(tuitiongym), Number(numbertuitiongym),
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
  async UploadSelected() {
    await picker(async (source, data, type) => {
      await this.setState({ Pic: source, data, type }, () => {
        console.log(this.state);
      });
      try {
        this.setState({ loading: true });
        if (type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png' || type === 'image/bmp') {
          const { tokenmember } = await this.props.user;
          const m = await moment();
          const MM = await m.jMonth() + 1;
          const YYYY = await m.jYear();
          const json = await uploader([{
            name: 'avatar',
            filename: 'avatar.png',
            data
          }], Gym, YYYY, MM, tokenmember, 'selfit.public');
          await this.setState({ PicJson: json });
          console.log(this.state);
          alert('آپلود عکس با موفقیت انجام شد');
        } else {
          alert('لطفا اول عکس مورد نظر را انتخاب کنید!');
        }
        this.setState({ loading: false });
      } catch (err) {
        console.log(err);
        alert('خطا در آپلود عکس');
        this.setState({ loading: false });
      }
    });
  }
  async _getSingLeGym() {
    try {
      const { tokenapi, gymid } = await this.props;
      const { tokenmember } = await this.props.user;
      const gymInfo = await getSingleGym(gymid, tokenmember, tokenapi);
      console.log(gymInfo, 'gymInfo');
      this.props.receiveGym(gymInfo, 0);
    } catch (e) {
      console.log(e);
    }
  }
  helpDone = () => this.props.helpDoneEditGym();
  render() {
    const { gym } = this.props;
    const m = gym.datesave ? moment(`${gym.datesave}`, 'YYYY/MM/DDTHH:mm:ss') : moment();
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${gym.httpserver}${gym.pathserver}${ImgYear}/${ImgMonth}/${gym.picgym}`;
    const htmlContent = gym.descgym ? persianNumber(gym.descgym.replace(/(\r\n|\n|\r)/gm, '')) : '<p>فاقد توضیحات.</p>';
    return (
      <Container>
        <Modal
          isVisible={this.state.ModalNumber === 1}
          onModalHide={() => this.setState({ ModalNumber: 2 })}
          exitText="خیلی خب"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 80,
            }}
            source={Pic1}
            resizeMode="contain"
          />
          <Text>
            با زدن این دکمه میتونی توضیحات باشگاه خودت رو ویرایش کنی.
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 2}
          onModalHide={this.helpDone}
          exitText="تمام"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 100,
            }}
            source={Pic2}
            resizeMode="contain"
          />
          <Text>
            در آخر برای اعمال ویرایش های انجام شده بر روی
            ثبت و تائید کلیک کن،
            تا ویرایش ها بر روی سرور قرار بگیره.
          </Text>
        </Modal>
        <AppHeader rightTitle="باشگاه من" backButton="flex" />
        <Content padder>
          <Text style={{ textAlign: 'center', fontSize: 20, margin: 10 }}>ویرایش باشگاه</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableWithoutFeedback
              onPress={this.UploadSelected.bind(this)}
            >
              {this.state.Pic ? <Image
                style={{
                  flex: 1,
                  height: 200,
                  width: 200,
                  borderWidth: 2,
                  borderColor: mainColor
                }}
                resizeMode="cover"
                source={this.state.Pic}
              /> : <Image
                style={{
                  flex: 1,
                  height: 200,
                  width: 200,
                  borderWidth: 2,
                  borderColor: mainColor
                }}
                resizeMode="cover"
                source={{ uri: ImgSrc }}
              />}
            </TouchableWithoutFeedback>
            <UploadButton
              title={this.state.loading ? 'لطفا صبر کنید' : 'آپلود عکس شاخص'}
              loading={this.state.loading}
              loadingProps={{ size: 'large', color: darkColor }}
              titleStyle={{ fontFamily: 'IRANSANSMobile' }}
              buttonStyle={{
                backgroundColor: mainColor,
                width: 200,
                borderColor: 'transparent',
                borderWidth: 0,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5
              }}
              containerStyle={{ marginTop: 100 }}
              onPress={this.UploadSelected.bind(this)}
            />
          </View>
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
          <FullButton
            block
            style={{ backgroundColor: mainColor }}
            onPress={() => Actions.htmlEditor({ gym: { ...this.state, descgym: gym.descgym, idgym: gym.idgym } })}
          >
            <Text style={{ color: white }}>
              ویرایش توضیحات
            </Text>
          </FullButton>
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
        <FullButton
          full
          style={{ backgroundColor: mainColor }}
          onPress={this.onPressHandler.bind(this)}
        >
          <Text style={{ color: white }}>ثبت و تائید</Text>
        </FullButton>
      </Container>
    );
  }
}
