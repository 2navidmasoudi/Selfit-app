import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { styles } from './style';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import Buffet from '../../Main/Buffet';
import Gym from '../../Main/Gym';
import Coach from '../../Main/Coach';

@connect(state => ({
  user: state.user,
}), {

})
export default class MemberGrid extends Component {
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../../../assets/MemberGrid.jpeg')}
          imageStyle={styles.background}
          style={styles.mainContainer}
        >
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <Buffet />
            </View>
            <View style={styles.wrapper}>
              <Gym />
            </View>
          </View>
          <View style={styles.mainRowWrapper}>
            <View style={styles.wrapper}>
              <Coach />
            </View>
            <View style={styles.wrapper}>
              <View style={styles.wrapper}>
                <Store />
              </View>
              <View style={styles.wrapper}>
                <Music />
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
