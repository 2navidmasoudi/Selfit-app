import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Form,
  Icon,
  Input,
  Item,
  Label,
  ListItem,
  Picker,
  Radio,
  Right,
  Text
} from 'native-base';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { SignStyle } from '../assets/styles/sign';
import { getSingleToken, putMember } from '../services';
import { setUser } from '../redux/actions';
import Status from './status';

const ItemSelect = Picker.Item;
@connect(state => ({ user: state.user }), { setUser })
export default class Register extends Component {
  state = {
    fistName: '',
    lastName: '',
    typememberid: 6,
    city: 'تهران',
    sexmember: 1,
    mailmember: null,
    birthdaymember: null,
  };

  onSexChange(value) {
    this.setState({
      sexmember: value
    });
  }

  onCityChange(value) {
    this.setState({
      city: value
    });
  }

  changeName(text) {
    this.setState({
      fistName: text
    });
  }

  changeFamily(text) {
    this.setState({
      lastName: text
    });
  }

  changeEmail(text) {
    this.setState({
      mailmember: text
    });
  }

  async changeAge(age) {
    const date = await moment().subtract(age, 'years');
    const birthdaymember = await date.format('YYYY-MM-DDTHH:mm:ss');
    await this.setState({ birthdaymember });
  }

  async submitButtonPress() {
    try {
      const {
        fistName, lastName, mailmember,
        typememberid, sexmember, birthdaymember
      } = await this.state;
      const { phone, tokenapi, tokenmember } = await this.props.user;
      const namefamilymember = `${await fistName} ${lastName}`;
      const json = await putMember(
        namefamilymember,
        mailmember,
        birthdaymember,
        sexmember,
        typememberid,
        phone,
        tokenmember,
        tokenapi
      );
      if (json === 1) {
        const jsonInfo = await getSingleToken(tokenmember, tokenapi);
        console.log(jsonInfo, 'JsonInfo');
        await this.props.setUser(jsonInfo.MemberSingleToken);
        Actions.reset('root');
      } else {
        console.log('PUT member response:', json);
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      item, formInputText, formStyle, submitButton,
      submitButtonText, selectViewStyle, formSelectStyle, listSelectStyle,
    } = SignStyle;
    return (
      <Container>
        <Status />
        <Content padder>
          <Text style={{ textAlign: 'center', fontSize: 20, margin: 10 }}>ثبت نام</Text>
          <Form style={formStyle}>
            <Item style={item}>
              <Icon active name="person" />
              <Input style={formInputText} onChangeText={text => this.changeName(text)} />
              <Label>نام</Label>
            </Item>
            <Item style={item}>
              <Icon active name="contacts" />
              <Input style={formInputText} onChangeText={text => this.changeFamily(text)} />
              <Label>نام خانوادگی</Label>
            </Item>
            <Item style={item}>
              <Icon active name="mail" />
              <Input
                keyboardType="email-address"
                style={formInputText}
                onChangeText={text => this.changeEmail(text)}
              />
              <Label>ایمیل (اختیاری)</Label>
            </Item>
            <Item style={item}>
              <Icon active name="calendar" />
              <Input
                keyboardType="numeric"
                style={formInputText}
                onChangeText={text => this.changeAge(text)}
              />
              <Label>سن</Label>
            </Item>
            <View style={selectViewStyle}>
              <Form style={formSelectStyle}>
                <Label>نوع کاربر</Label>
                <ListItem
                  style={listSelectStyle}
                  onPress={() => this.setState({ typememberid: 6 })}
                >
                  <Text>ورزشکار</Text>
                  <Right>
                    <Radio
                      selected={this.state.typememberid === 6}
                      onPress={() => this.setState({ typememberid: 6 })}
                    />
                  </Right>
                </ListItem>
                <ListItem
                  style={listSelectStyle}
                  onPress={() => this.setState({ typememberid: 5 })}
                >
                  <Text>بوفه دار</Text>
                  <Right>
                    <Radio
                      selected={this.state.typememberid === 5}
                      onPress={() => this.setState({ typememberid: 5 })}
                    />
                  </Right>
                </ListItem>
                <ListItem
                  style={listSelectStyle}
                  onPress={() => this.setState({ typememberid: 4 })}
                >
                  <Text> باشگاه دار </Text>
                  <Right>
                    <Radio
                      selected={this.state.typememberid === 4}
                      onPress={() => this.setState({ typememberid: 4 })}
                    />
                  </Right>
                </ListItem>
              </Form>
              <Form style={{ flex: 2, flexDirection: 'column' }}>
                <Label style={formInputText}>جنسیت</Label>
                <Picker
                  placeholder="انتخاب جنسیت"
                  iosHeader="انتخاب جنسیت"
                  mode="dropdown"
                  selectedValue={this.state.sexmember}
                  onValueChange={this.onSexChange.bind(this)}
                  itemTextStyle={formInputText}
                >
                  <ItemSelect label="مرد" value={1} />
                  <ItemSelect label="زن" value={2} />
                </Picker>
                <Label style={formInputText}>استان</Label>
                <Picker
                  placeholder="انتخاب شهر"
                  iosHeader="انتخاب شهر"
                  mode="dropdown"
                  selectedValue={this.state.city}
                  onValueChange={this.onCityChange.bind(this)}
                  itemTextStyle={formInputText}
                >
                  <ItemSelect label="آذربایجان شرقی" value="آذربایجان شرقی" />
                  <ItemSelect label="آذربایجان غربی" value="آذربایجان غربی" />
                  <ItemSelect label="اردبیل" value="اردبیل" />
                  <ItemSelect label="اصفهان" value="اصفهان" />
                  <ItemSelect label="البرز" value="البرز" />
                  <ItemSelect label="ایلام" value="ایلام" />
                  <ItemSelect label="بوشهر" value="بوشهر" />
                  <ItemSelect label="تهران" value="تهران" />
                  <ItemSelect label="چهارمحال و بختیاری" value="چهارمحال و بختیاری" />
                  <ItemSelect label="خراسان جنوبی" value="خراسان جنوبی" />
                  <ItemSelect label="خراسان رضوی" value="خراسان رضوی" />
                  <ItemSelect label="خراسان شمالی" value="خراسان شمالی" />
                  <ItemSelect label="خوزستان" value="خوزستان" />
                  <ItemSelect label="زنجان" value="زنجان" />
                  <ItemSelect label="سمنان" value="سمنان" />
                  <ItemSelect label="سیستان و بلوچستان" value="سیستان و بلوچستان" />
                  <ItemSelect label="فارس" value="فارس" />
                  <ItemSelect label="قم" value="قم" />
                  <ItemSelect label="کرمانشاه" value="کرمانشاه" />
                  <ItemSelect label="کهگیلویه و بویراحمد" value="کهگیلویه و بویراحمد" />
                  <ItemSelect label="گلستان" value="گلستان" />
                  <ItemSelect label="گیلان" value="گیلان" />
                  <ItemSelect label="لرستان" value="لرستان" />
                  <ItemSelect label="مازندران" value="مازندران" />
                  <ItemSelect label="مرکزی" value="مرکزی" />
                  <ItemSelect label="هرمزگان" value="هرمزگان" />
                  <ItemSelect label="همدان" value="همدان" />
                  <ItemSelect label="یزد" value="یزد" />
                </Picker>
              </Form>
            </View>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={this.submitButtonPress.bind(this)} style={submitButton}>
              <Text style={submitButtonText}>ثبت نام</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
