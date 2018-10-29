import React, { Component } from 'react';
import { Share, Alert } from 'react-native';
import { Button, Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppHeader from '../header';
import { Text } from '../Kit';
import { mainColor, white } from '../../assets/variables/colors';
import getCodeOff from '../../services/CodeOff';

@connect(state => ({
  user: state.user,
}))
export default class CodeOff extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired
  };
  constructor() {
    super();
    this.state = {
      CodeOff: null
    };
    this.getCodeOff = this.getCodeOff.bind(this);
  }
  componentWillMount() {
    this.getCodeOff();
  }
  async getCodeOff() {
    const { tokenmember } = this.props.user;
    let CodeOff = await getCodeOff(tokenmember);
    if (CodeOff) {
      this.setState({ CodeOff });
    }
  }
  render() {
    const messageWithCode = `کد معرف من در اپلیکیشن سلفیت: ${this.state.CodeOff}`;
    return (
      <Container>
        <AppHeader rightTitle="هدیه و معرفی" />
        <Content padder>
          <Text>
            دوستان و آشنایان خود را با استفاده از کد معرفی
            به سلفیت دعوت کنید و جایزه خود را دریافت نمایید.
          </Text>
          <Text style={{ textAlign: 'center' }} type="bold">
            کد: {this.state.CodeOff || 'لطفا منتظر بمانید...'}
          </Text>
        </Content>
        <Button
          block
          onPress={() => {
            if (this.state.CodeOff) {
              Share.share({
                message: messageWithCode
              });
            } else {
              Alert.alert('خطا', 'خطایی ناخواسته پیش آمده؛ لطفا مجددا تلاش کنید.', [{ text: 'باشه' }]);
            }
          }}
          style={{ margin: 10, backgroundColor: mainColor }}
        >
          <Text style={{ color: white }}>اشتراک گذاری و دریافت هدیه</Text>
        </Button>
      </Container>
    );
  }
}
