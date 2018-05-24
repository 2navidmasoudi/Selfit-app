import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Button, Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import call from 'react-native-phone-call';
import AppHeader from '../header';
import { setUser } from '../../redux/actions';
import { form } from '../../assets/styles';

const args = {
  number: '09011256662', // String value with the number to call
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
        <AppHeader rightTitle="شکایات و پیشنهادات" backButton="flex" />
        <Content padder>
          <Text style={{ fontFamily: 'IRANSANSMobile' }}>لطفا پیشنهادات و انتقادات و همچنین شکایات خود را از
            طریق شماره ثابت :02188010687 و یا پست الکترونیکی : support@selfit.ir مطرح کنید
          </Text>
        </Content>
        <Button
          block
          onPress={() => call(args).catch(console.error)}
          style={[form.submitButton, { marginHorizontal: 10 }]}
        >
          <Text style={form.submitText}>تماس با پشتیبانی</Text>
        </Button>
        <Button
          block
          style={[form.submitButton, { margin: 10 }]}
          onPress={() => Linking.openURL('mailto:support@selfit.ir?subject=abcdefg&body=body')}
        >
          <Text style={form.submitText}>ایمیل به پشتیبانی</Text>
        </Button>
      </Container>

    );
  }
}
