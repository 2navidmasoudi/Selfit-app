import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <TouchableWithoutFeedback onPress={() => Actions.buffet()}>
    <View style={styles.animationView}>
      <Text type="bold" style={styles.animationTitle}>
              بوفه آنلاین
      </Text>
      {/* <Text style={styles.animationDetail}> */}
      {/* با بوفه آنلاین شما می توانید غذاهای مخصوص رژیم خود را بصورت آنلاین سفارش دهید و 30 */}
      {/* الی 45 دقیقه دیگر در محل مورد نظر خود دریافت کنید! */}
      {/* </Text> */}
    </View>
  </TouchableWithoutFeedback>
);
