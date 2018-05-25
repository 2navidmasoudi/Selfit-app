import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <TouchableWithoutFeedback onPress={() => Actions.storeRoot()}>
    <View style={styles.animationView}>
      <Text style={styles.animationTitle}>
              فروشگاه
      </Text>
      {/* To do : text-align : justify with WebView Html */}
      <Text style={styles.animationDetail}>
              نظرتون راجع به
              فروشگاه ورزشی آنلاین اونم از طریق اپلیکیشن چیه؟
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
