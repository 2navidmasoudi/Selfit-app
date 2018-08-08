import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { Button, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Status from './status';
import { Text } from './Kit';
import { darkColor, white } from '../assets/variables/colors';
import { putCheckToken } from '../services';
import pic from '../assets/morabie_man.jpg';

@connect(state => ({
  user: state.user,
}))
export default class Sign extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
  };
  componentWillMount() {
    this.checkToken();
  }
  async checkToken() {
    const { tokenmember, tokenapi } = await this.props.user;
    if (tokenmember) {
      const json = await putCheckToken(tokenmember, tokenapi);
      if (json === 1) {
        Actions.reset('root');
      } else {
        putCheckToken(tokenmember, tokenapi).then((result) => {
          if (result === 1) {
            Actions.reset('root');
          }
        });
      }
    }
  }
  render() {
    return (
      <Container>
        <Status />
        <ImageBackground
          style={styles.SignBackground}
          source={pic}
        >
          <View style={styles.row}>
            <Button
              block
              style={styles.btn}
              onPress={() => Actions.signUp()}
            >
              <Text style={styles.txt}>ورود</Text>
            </Button>
            <Button
              block
              style={styles.btn}
              onPress={() => Actions.signUp()}
            >
              <Text style={styles.txt}>ثبت نام</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  SignBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  row: { flex: 1, flexDirection: 'row' },
  btn: { flex: 1, margin: 5, backgroundColor: darkColor },
  txt: { color: white }
});
