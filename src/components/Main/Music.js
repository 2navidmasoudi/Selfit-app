import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <TouchableWithoutFeedback onPress={() => Actions.Music()}>
    <View style={styles.animationView}>
      <Text type="bold" style={styles.animationTitle}>
              موزیک
      </Text>
      <Text style={styles.animationDetail}>
              بدون موزیک تمرین نکنید
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
