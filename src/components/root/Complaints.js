import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Button, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import call from 'react-native-phone-call';
import AppHeader from '../header';
import { setUser } from '../../redux/actions';
import { form } from '../../assets/styles';
import { Text } from '../Kit';
import { mainColor, white } from '../../assets/variables/colors';

const args = {
  number: '02188058522', // String value with the number to call
  prompt: false,
};

@connect(state => ({
  user: state.user,
}), {
  setUser,
})
export default class Complaints extends Component {
  render() {
    return (
      <Container>
        <AppHeader rightTitle="شکایات و پیشنهادات" />
        <Content padder>
          <Text>
            لطفا پیشنهادات و انتقادات و همچنین شکایات خود را از
            طریق شماره ثابت :02188010687 و یا پست الکترونیکی : support@selfit.ir مطرح کنید
          </Text>
        </Content>
        <Button
          block
          onPress={() => call(args).catch(console.error)}
          style={{ marginHorizontal: 10, backgroundColor: mainColor }}
        >
          <Text style={{ color: white }}>تماس با پشتیبانی</Text>
        </Button>
        <Button
          block
          style={{ margin: 10, backgroundColor: mainColor }}
          onPress={() => Linking.openURL('mailto:support@selfit.ir?subject=Selfit&body=Selfit')}
        >
          <Text style={{ color: white }}>ایمیل به پشتیبانی</Text>
        </Button>
      </Container>

    );
  }
}
