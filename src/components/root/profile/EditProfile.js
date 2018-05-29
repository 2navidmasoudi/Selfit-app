import React from 'react';
import { Button, Container, Content, Form, Icon, Input, Item, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import AppHeader from '../../header';
import { EditProfileStyle, form } from '../../../assets/styles/index';
import { getSingleToken, putMember } from '../../../services/index';
import { setUser } from '../../../redux/actions/index';
import { picker } from './imagePicker';
import { uploader } from '../../../services/UploadImage';
import { Member } from '../../../services/type';
import {Text} from "../../Kit";
import {mainColor, white} from "../../../assets/variables/colors";

@connect(state => ({
  user: state.user,
}), {
  setUser,
})
export default class EditProfile extends React.Component {
  state = {
    age: null,
    namefamilymember: null,
    mailmember: null,
    avatarSource: null,
    data: null,
    type: null,
    picmember: null,
    UploadButtonDisable: false,
    birthdaymember: null,
  };
  componentWillMount() {
    const { namefamilymember, mailmember, picmember, birthdaymember } = this.props.user;
    this.setState({
      namefamilymember: Base64.decode(namefamilymember),
      mailmember: Base64.decode(mailmember),
      picmember,
      birthdaymember,
    });
    const m = birthdaymember === null ? null : moment(birthdaymember, 'YYYY/MM/DD');
    if (m) {
      const selectedDay = m.jDate();
      const selectedYear = m.jYear();
      const selectedMonth = m.jMonth() + 1;
      this.setState({
        birth: {
          selectedDay,
          selectedYear,
          selectedMonth
        }
      });
    }
  }
  async handleSubmitButton() {
    try {
      console.log(this.state, this.props);
      const { namefamilymember, mailmember, picmember, birthdaymember } = await this.state;
      const { tokenmember, tokenapi, phone, sexmember, typememberid } = await this.props.user;
      const json = await putMember(
        namefamilymember,
        mailmember,
        birthdaymember,
        sexmember,
        typememberid,
        phone,
        tokenmember,
        tokenapi,
        picmember
      );
      if (json === 1) {
        await this._getSingleToken();
        alert('پروفایل شما با موفقیت ویرایش یافت!');
        Actions.pop();
        Actions.refresh();
      } else {
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async _getSingleToken() {
    const { tokenmember, tokenapi } = this.props.user;
    const json = await getSingleToken(tokenmember, tokenapi);
    await this.props.setUser(json.MemberSingleToken);
  }
  showImagePicker() {
    picker((source, data, type) => {
      this.setState({ avatarSource: source, data, type }, () => {
        console.log(this.state);
      });
    });
  }
  async uploadImage() {
    try {
      const { type } = await this.state;
      if (type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png' || type === 'image/bmp') {
        const { tokenmember } = await this.props.user;
        const m = await moment();
        const MM = await m.jMonth() + 1;
        const YYYY = await m.jYear();
        const json = await uploader([{
          name: 'avatar',
          filename: 'avatar.png',
          data: this.state.data
        }], Member, YYYY, MM, tokenmember, 'selfit.public');
        await this.setState({ picmember: json, UploadButtonDisable: true });
        console.log(this.state);
        alert('آپلود عکس با موفقیت انجام شد');
      } else {
        alert('لطفا اول عکس مورد نظر را انتخاب کنید!');
      }
    } catch (err) {
      console.log(err);
      alert('خطا در آپلود عکس');
    }
  }
  async changeAge(age) {
    const date = await moment().subtract(age, 'years');
    const birthdaymember = await date.format('YYYY/MM/DD');
    console.log(birthdaymember);
    await this.setState({ birthdaymember });
  }
  changeName(text) {
    this.setState({
      namefamilymember: text
    });
  }
  changeEmail(text) {
    this.setState({
      mailmember: text
    });
  }
  render() {
    const {
      namefamilymember, mailmember, datesave, httpserver,
      pathserver, picmember, birthdaymember
    } = this.props.user;
    const m = moment(`${datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${Base64.decode(httpserver)}${Base64.decode(pathserver)}${ImgYear}/${ImgMonth}/${picmember}`;
    const jalaliBirthDay = birthdaymember === null ? '' : moment(birthdaymember, 'YYYY/MM/DD').toNow(true);
    const image = this.state.avatarSource === null ?
      <Image source={{ uri: ImgSrc }} style={EditProfileStyle.imageStyle} /> :
      <Image source={this.state.avatarSource} style={EditProfileStyle.imageStyle} />;
    return (
      <Container>
        <AppHeader rightTitle="پروفایل" />
        <Content padder>
          <View style={EditProfileStyle.uploadView}>
            <Text style={EditProfileStyle.textStyle}>عکس خود را انتخاب سپس آپلود کنید!</Text>
            <View style={EditProfileStyle.uploadViewButton}>
              <Button
                style={EditProfileStyle.uploadButton}
                onPress={this.showImagePicker.bind(this)}
              >
                <Text style={{color:white}}>انتخاب تصویر</Text>
              </Button>
              <Button
                success
                disabled={this.state.UploadButtonDisable}
                style={{backgroundColor:mainColor}}
                onPress={this.uploadImage.bind(this)}
              >
                <Text style={EditProfileStyle.btnText}>آپلود تصویر</Text>
              </Button>
            </View>
            {image}
          </View>
          <Form style={form.StyleForm}>
            <Item rounded style={form.item}>
              <Input
                defaultValue={Base64.decode(namefamilymember)}
                placeholder="نام و نام خانوادگی"
                style={form.input}
                onChangeText={this.changeName.bind(this)}
              />
              <Text>نام:</Text>
              <Icon active name="person" />
            </Item>
            <Item rounded style={form.item}>
              <Input
                defaultValue={Base64.decode(mailmember)}
                placeholder="ایمیل شما"
                style={form.input}
                onChangeText={this.changeEmail.bind(this)}
              />
              <Text>ایمیل:</Text>
              <Icon active name="mail" />
            </Item>
            <Item rounded style={form.item}>
              <Input
                placeholder={jalaliBirthDay}
                style={form.input}
                keyboardType="numeric"
                onChangeText={this.changeAge.bind(this)}
              />
              <Text>سن:</Text>
              <Icon active name="checkmark" />
            </Item>
            <Button
              full
              style={form.submitButton}
              onPress={() => this.handleSubmitButton()}
            >
              <Text style={form.submitText}>ثبت تغییرات</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
