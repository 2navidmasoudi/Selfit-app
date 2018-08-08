import React from 'react';
import { Linking } from 'react-native';
import { Button, Container, Content, View } from 'native-base';
import call from 'react-native-phone-call';
import { form } from '../../assets/styles/index';
import AppHeader from '../header';
import { Text } from '../Kit';
import { mainColor, white } from '../../assets/variables/colors';

const args = {
  number: '02188058525',
  prompt: false,
};

export default () => (
  <Container>
    <AppHeader rightTitle="پشتیبانی" />
    <Content padder>
      <Text>
        راه های ارتباطی با شرکت در دکمه های زیر آمده است.
        درصورت درخواست استخدام در سلفیت با ایمیل استخدام
        سلفیت (job@selfit.ir) با ما در تماس باشید.
        درصورت بروز هر گونه مشکلی از طریق ایمیل پشتیبانی
        سلفیت (support@selfit.ir) ما را در جریان بگذارید.
      </Text>
    </Content>
    <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Button
        block
        onPress={() => call(args)}
        style={{ marginHorizontal: 10, backgroundColor: mainColor }}
      >
        <Text style={{ color: white }}>تماس با پشتیبانی</Text>
      </Button>
      <Button
        block
        style={[form.submitButton, { margin: 10 }]}
        onPress={() => Linking.openURL('mailto:support@selfit.ir?subject=selfit&body=support')}
      >
        <Text style={{ color: white }}>ایمیل به پشتیبانی</Text>
      </Button>
    </View>
    <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Button
        block
        style={[form.submitButton, { margin: 10, marginTop: 0 }]}
        onPress={() => Linking.openURL('mailto:job@selfit.ir?subject=selfit&body=support')}
      >
        <Text style={{ color: white }}>استخدام در سلفیت</Text>
      </Button>
    </View>
  </Container>
);

