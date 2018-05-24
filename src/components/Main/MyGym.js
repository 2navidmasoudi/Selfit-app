import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from 'native-base';
import { styles } from './style';

const MyGym = () => (
  <Container>
    <View style={styles.bgImg}>
      <TouchableWithoutFeedback onPress={() => Actions.mygymRoot()}>
        <View style={styles.animationView}>
          <View style={styles.bgView}>
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
        </View>
      </TouchableWithoutFeedback>
    </View>
  </Container>
);
export default MyGym;
