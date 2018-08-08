import React from 'react';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import BuffetPic from '../../assets/Buffet.jpg';
import { Text } from '../Kit';

export default () => (
  <ImageBackground
    source={BuffetPic}
    style={styles.mainContainer}
    imageStyle={styles.background}
  >
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => Actions.buffetKeeperRoot()}
    >
      <View style={styles.animationView}>
        <Text type="bold" style={styles.animationTitle}>
                    دریافت سفارش
        </Text>
        <Text style={styles.animationDetail}>
                    سفارش خود را مدیریت کنید
        </Text>
      </View>
    </TouchableOpacity>
  </ImageBackground>
);
