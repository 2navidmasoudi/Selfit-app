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
                  مربی مورد نظر خودتون رو پیدا کنید! برنامه ی غذایی، برنامه ورزشی، مشاوره و خیلی
                  کارهای دیگه! مربی هستید و در لیست مربیان ثبت نشده اید؟
                  از طریق پشتیبانی به ما اطلاع
                  بدهید.
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
