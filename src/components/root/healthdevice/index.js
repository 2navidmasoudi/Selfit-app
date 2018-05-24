import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';

@connect(state => ({
  user: state.user,
}))
export default class HealthDevice extends Component {
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="دستگاه سلامت" backButton="flex" />
        <Content padder>
          <Text>درحال بازسازی!</Text>
        </Content>
      </Container>
    );
  }
}
