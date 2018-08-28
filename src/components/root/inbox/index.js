import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import AppHeader from '../../header';
import { mainColor } from '../../../assets/variables/colors';
import { Text } from '../../Kit';

export default class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      inboxList: [],
    };
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="صندوق پیام" />
        <Content padder>
          <Text>
            صفحه صندوق پیام
          </Text>
        </Content>
      </Container>
    );
  }
}

// WebViewComponent.propTypes = {
//   title: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
// };

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
