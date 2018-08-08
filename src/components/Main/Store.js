import React from 'react';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Pic from '../../assets/Store.jpg';
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
      onPress={() => Actions.storeRoot()}
    >

      <View style={styles.animationView}>
        <Text type="bold" style={styles.animationTitle}>
          فروشگاه
        </Text>
        <Text style={styles.animationDetail}>
          بدون واسطه، با کیفیت و مطمئن خرید کنید
        </Text>
      </View>
    </TouchableOpacity>
  </ImageBackground>

);
