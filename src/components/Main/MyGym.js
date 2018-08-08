import React from 'react';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Pic from '../../assets/Gym.jpg';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <ImageBackground
    source={Pic}
    style={styles.mainContainer}
    imageStyle={styles.background}
  >
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => Actions.mygymRoot()}
    >
      <View style={styles.animationView}>
        <Text type="bold" style={styles.animationTitle}>
              باشگاه من
        </Text>
        <Text type="bold" style={styles.animationDetail}>
              باشگاه خود را مدیریت کنید
        </Text>
      </View>
    </TouchableOpacity>
  </ImageBackground>
);

