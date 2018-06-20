import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Divider } from 'react-native-elements';
import { styles } from './style';
import { Text } from '../Kit';
import { darkColor } from '../../assets/variables/colors';

export default () => (
  <View style={{ flex: 1 }}>
    <TouchableOpacity
      style={{ flex: 2 }}
      onPress={() => Actions.couchRoot()}
    >
      <View style={styles.animationView}>
        <Text type="bold" style={styles.animationTitle}>
          مربیان
        </Text>
        <Text style={styles.animationDetail}>
          یه مربی خوب از نون شب واجبتره
        </Text>
        <Text type="bold" style={styles.animationDetail}>
          بهترین رو پیدا کن
        </Text>
      </View>
    </TouchableOpacity>
    <Divider style={{ backgroundColor: darkColor, marginHorizontal: 10 }} />
    <TouchableOpacity
      style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}
      onPress={() => Actions.federationRoot()}
    >
      <View style={styles.animationView}>
        <Text type="bold" style={styles.animationTitle}>
          فدراسیون
        </Text>
        <Text style={styles.animationDetail}>
          مشاهده فدراسیون، انجمن ها و ...
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);
