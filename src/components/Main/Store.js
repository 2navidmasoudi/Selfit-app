import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
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
);
