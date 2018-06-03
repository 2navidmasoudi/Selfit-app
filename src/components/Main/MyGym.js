import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <TouchableWithoutFeedback onPress={() => Actions.mygymRoot()}>
    <View style={styles.animationView}>
      <Text type="bold" style={styles.animationTitle}>
              باشگاه من
      </Text>
      <Text type="bold" style={styles.animationDetail}>
              باشگاه خود را مدیریت کنید
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

