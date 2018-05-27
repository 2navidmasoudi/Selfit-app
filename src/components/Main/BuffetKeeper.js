import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <TouchableWithoutFeedback onPress={() => Actions.buffetKeeperRoot()}>
    <View style={styles.animationView}>
      <Text type="bold" style={styles.animationTitle}>
                  دریافت سفارش
      </Text>
      <Text style={styles.animationDetail}>
                  سفارش های ارسال شده به خود را تایید
                  و برای مشتری آماده کنید! هنوز در بوفه مورد نظر ثبت نشده اید؟
                  با پشتیبانی تماس بگیرید.
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
