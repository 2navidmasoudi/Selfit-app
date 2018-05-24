import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Container } from 'native-base';
import { styles } from './style';
import { main } from '../../assets/styles';

const Buffet = () => (
  <Container>
    <View
      // source={require('../../assets/boofe_online.jpg')}
      style={styles.bgImg}
    >
      <TouchableWithoutFeedback onPress={() => Actions.buffet()}>
        <View style={styles.animationView}>
          <View style={styles.bgView}>
            <Text style={styles.animationTitle}>
              بوفه آنلاین
            </Text>
            <Text style={styles.animationDetail}>
              با بوفه آنلاین شما می توانید غذاهای مخصوص رژیم خود را بصورت آنلاین سفارش دهید و 30
              الی 45 دقیقه دیگر در محل مورد نظر خود دریافت کنید!
            </Text>
            {/*<Button*/}
              {/*block*/}
              {/*style={[main.pannelBtn, { flex: 1, borderRadius: 8 }]}*/}
              {/*onPress={() => Actions.follow()}*/}
            {/*>*/}
              {/*<Text style={main.pannelTextBtn}>پیگیری سفارش</Text>*/}
            {/*</Button>*/}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </Container>
);
export default Buffet;
