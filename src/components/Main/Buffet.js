import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <TouchableOpacity
    style={{ flex: 1 }}
    onPress={() => Actions.buffet()}
  >
    <View style={styles.animationView}>
      <Text type="bold" style={styles.animationTitle}>
              بوفه آنلاین
      </Text>
      <Text type="bold" style={styles.animationDetail}>
      بوفه دار اینجا، بوفه دار اونجا
      </Text>
      <Text type="bold" style={styles.animationDetail}>
        بوفه دار همه جا
      </Text>
      <Text type="bold" style={styles.animationTitle}>
        بشقاب انتخابی
      </Text>
      <Text type="bold" style={styles.animationDetail}>
        مثلا دو قاشق برنج با یک فیله و یکدانه
        آب پرتقال از کجا میخوای بگیری که واست بیارن
      </Text>
    </View>
  </TouchableOpacity>
);
