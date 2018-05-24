import React from 'react';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from 'native-base';
import { styles } from './style';

const Coach = () => (
  <Container>
    <View style={styles.bgImg}>
      <TouchableWithoutFeedback onPress={() => Actions.couchRoot()}>
        <View style={styles.animationView}>
          <View style={styles.bgView}>
            <Text style={styles.animationTitle}>
                  مربیان
            </Text>
            <Text style={styles.animationDetail}>
                  مربی مورد نظر خودتون رو پیدا کنید! برنامه ی غذایی، برنامه ورزشی، مشاوره و خیلی
                  کارهای دیگه! مربی هستید و در لیست مربیان ثبت نشده اید؟
                  از طریق پشتیبانی به ما اطلاع
                  بدهید.
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </Container>
);
export default Coach;
