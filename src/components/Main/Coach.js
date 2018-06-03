import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <TouchableWithoutFeedback onPress={() => Actions.couchRoot()}>
    <View style={styles.animationView}>
      <Text type="bold" style={styles.animationTitle}>
                  مربیان
      </Text>
      <Text style={styles.animationDetail}>
        یه مربی خوب از نون شب واجبتره
      </Text>
      <Text type="bold" style={styles.animationDetail}>
        بهترین رو پیدا کن
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
