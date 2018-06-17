import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
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
);
