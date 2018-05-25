import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <TouchableWithoutFeedback onPress={() => Actions.gym()}>
    <View style={styles.animationView}>
      <Text type="bold" style={styles.animationTitle}>
                  باشگاه یاب
      </Text>
      <Text style={styles.animationDetail}>
                  باشگاه دور و
                  اطراف خودتون رو پیدا کنید، عکس هاشو ببینید و
                  نظرات بقیه رو راجع به باشگاه مورد نظرتون بخونید.
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
