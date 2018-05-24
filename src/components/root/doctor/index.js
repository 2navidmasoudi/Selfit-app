import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { logError } from '../../../services/log';
import { getAllDoctor } from '../../../services/doctor';

@connect(state => ({
  user: state.user,
}))
export default
class Doctor extends Component {
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.getInfo();
  }

  async getInfo() {
    try {
      await this._getAllDoctor();
    } catch (error) {
      logError(error, 'getInfo', 'root/Doctor', 'getInfo');
    }
  }

  async _getAllDoctor() {
    try {
      const { tokenmember } = this.props.user;
      const tokenapi = 'selfit.public';
      const DoctorList = await getAllDoctor(tokenmember, tokenapi, 10, 0, true, 0);
      console.log(DoctorList);
      const descDoctor = await Base64.decode(DoctorList[0].descdoctor);
      const nameDoctor = await Base64.decode(DoctorList[0].namedoctor);
      console.log(`Name: ${nameDoctor}, Description: ${descDoctor}`);
    } catch (error) {
      logError(error, '_getAllDoctor', 'Root/Doctor', 'getAllDoctor');
    }
  }

  render() {
    return (
      <Container>
        <AppHeader rightTitle="دکتر" backButton="flex" />
        <Content padder>
          <Text>درحال بازسازی!</Text>
        </Content>
      </Container>
    );
  }
}
