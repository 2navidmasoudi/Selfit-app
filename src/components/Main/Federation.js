import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Divider } from 'react-native-elements';
import { styles } from './style';
import { Text } from '../Kit';
import { darkColor } from '../../assets/variables/colors';

export default () => (
  <View style={{ flex: 1 }}>
    <Divider style={{ backgroundColor: darkColor, marginHorizontal: 10 }} />
    <TouchableOpacity
      style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
      onPress={() => Actions.federationRoot()}
    >
      <View style={styles.animationView}>
        <Text type="bold" style={styles.animationTitle}>
          فدراسیون ها
        </Text>
        <Text type="bold" style={styles.animationDetail}>
          انجمن ها و کمیته ها
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);
