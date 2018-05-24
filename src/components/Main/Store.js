import React from 'react';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from 'native-base';
import { styles } from './style';

const Store = () => (
  <Container>
    <View source={require('../../assets/store.jpg')} style={styles.bgImg}>
      <TouchableWithoutFeedback onPress={() => Actions.storeRoot()}>
        <View style={styles.animationView}>
          <View style={styles.bgView}>
            <Text style={styles.animationTitle}>
              فروشگاه
            </Text>
            {/* To do : text-align : justify with WebView Html */}
            <Text style={styles.animationDetail}>
              نظرتون راجع به
              فروشگاه ورزشی آنلاین اونم از طریق اپلیکیشن چیه؟
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </Container>
);
export default Store;
