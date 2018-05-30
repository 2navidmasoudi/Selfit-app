import React from 'react';
import { WebView } from 'react-native';
import { Container, Spinner } from 'native-base';
import AppHeader from '../header';
import { mainColor } from '../../assets/variables/colors';

export default ({ title, url }) => (
  <Container>
    <AppHeader rightTitle={title} />
    <WebView
      source={{ uri: url }}
      renderLoading={() => <Spinner color={mainColor} />}
      startInLoadingState
    />
  </Container>
);

