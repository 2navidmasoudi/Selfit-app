import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <TouchableWithoutFeedback onPress={() => Actions.mygymRoot()}>
    <View style={styles.animationView}>
      <Text style={styles.animationTitle}>
              باشگاه من
      </Text>
      <Text style={styles.animationDetail}>
              عکس و اطلاعات و توضیحات باشکاه خود را ویرایش کنید
              تا بیشتر مورد توجه قرار بگیرید!
              در باشگاه خود ثبت نشده اید؟
              با پشتیبانی تماس بگیرید.
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

