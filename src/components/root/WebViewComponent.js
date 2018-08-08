import React from 'react';
import { WebView } from 'react-native';
import { Container, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import AppHeader from '../header';
import { mainColor } from '../../assets/variables/colors';

export default function WebViewComponent({ title, url }) {
  return (
    <Container>
      <AppHeader rightTitle={title} />
      <WebView
        source={{ uri: url }}
        renderLoading={() => <Spinner color={mainColor} />}
        startInLoadingState
      />
    </Container>
  );
}

WebViewComponent.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
