import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getSingleToken } from '../services';
import Status from './status';
import { darkColor, mainColor, white } from '../assets/variables/colors';
import { Text } from './Kit';
import { setUser } from '../redux/actions';

@connect(state => ({ user: state.user }), { setUser })
export default class Waiting extends Component {
  componentDidMount() {
    this.checkNullParams();
  }
  async checkNullParams() {
    try {
      const { tokenmember, tokenapi } = await this.props.user;
      const json = await getSingleToken(tokenmember, tokenapi);
      const { typememberid } = await json.MemberSingleToken;
      if (!typememberid) {
        Actions.register();
      } else {
        await this.props.setUser(json.MemberSingleToken);
        Actions.reset('root');
      }
    } catch (error) {
      console.log(error);
      Actions.pop();
    }
  }
  render() {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Status />
        <View style={{
          flex: 1, backgroundColor: darkColor, justifyContent: 'center', alignItems: 'center'
        }}
        >
          <Spinner color={mainColor} />
          <Text style={{ color: white }}>
            درحال برقراری ارتباط با سرور
          </Text>
        </View>
      </Container>
    );
  }
}
