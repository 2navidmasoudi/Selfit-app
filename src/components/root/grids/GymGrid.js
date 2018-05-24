import React, { Component } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { styles } from './style';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import MyGym from '../../Main/MyGym';
import Coach from '../../Main/Coach';

@connect(state => ({
  user: state.user,
}), {

})
export default class GymGrid extends Component {
  render() {
    return (
      <Container>
        <View style={styles.mainContainer}>
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <MyGym />
            </View>
            <View style={styles.wrapper}>
              <Coach />
            </View>
          </View>
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <Music />
            </View>
            <View style={styles.wrapper}>
              <Store />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
