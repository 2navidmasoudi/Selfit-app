import React from 'react';
import { WebView, View, StyleSheet } from 'react-native';
import { Container, Spinner, } from 'native-base';
import PropTypes from 'prop-types';
import AppHeader from '../header';
import { mainColor } from '../../assets/variables/colors';
import { Text } from '../Kit';

export default function WebViewComponent({ title, url }) {
  return (
    <Container>
      <AppHeader rightTitle={title} />
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        renderLoading={
          <View style={styles.view}>
            <Spinner color={mainColor} />
            <Text>درحال بارگذاری</Text>
            <Text>لطفا چند لحظه صبر کنید...</Text>
          </View>
        }
        startInLoadingState
      />
    </Container>
  );
}

WebViewComponent.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
