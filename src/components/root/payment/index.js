import React from 'react';
import { WebView } from 'react-native';
import { Container } from 'native-base';
import AppHeader from '../../header';

export default ({ url }) => (
  <Container>
    <AppHeader rightTitle="درگاه پرداخت" />
    <WebView
      source={{ uri: url }}
    />
  </Container>
);
