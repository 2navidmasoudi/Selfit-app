import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from 'native-base';
import { styles } from './style';

const BuffetKeeper = () => (
  <Container>
    <View style={styles.bgImg}>
      <TouchableWithoutFeedback onPress={() => Actions.buffetKeeperRoot()}>
        <View style={styles.animationView}>
          <View style={styles.bgView}>
            <Text style={styles.animationTitle}>
                  دریافت سفارش
            </Text>
            <Text style={styles.animationDetail}>
                  سفارش های ارسال شده به خود را تایید
                  و برای مشتری آماده کنید! هنوز در بوفه مورد نظر ثبت نشده اید؟
                  با پشتیبانی تماس بگیرید.
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </Container>
);
export default BuffetKeeper;
