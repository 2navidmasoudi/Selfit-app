import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import AppHeader from '../../header';
import { Text } from '../../Kit';

export default class Inbox extends Component {
  constructor() {
    super();
    this.state = {
      // inboxList: [],
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

// Inbox.propTypes = {
//   title: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
// };

// const styles = StyleSheet.create({
//   view: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });
