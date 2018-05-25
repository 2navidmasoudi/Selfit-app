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
      {/* To do : text-align : justify with WebView Html */}
      <Text style={styles.animationDetail}>
              لطفا با موزیک ورزش کنید!
              میکس های جدید هر هفته!
              دانلود کنید و لذت ببرید.
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
