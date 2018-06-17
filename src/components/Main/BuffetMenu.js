import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from './style';
import { Text } from '../Kit';

export default () => (
  <TouchableOpacity
    style={{ flex: 1 }}
    onPress={() => Actions.buffetMenuRoot()}
  >
    <View style={styles.animationView}>
      <Text type="bold" style={styles.animationTitle}>
              منو بوفه
      </Text>
      {/* To do : text-align : justify with WebView Html */}
      <Text style={styles.animationDetail}>
              منو بوفه خود را مدیریت کنید
      </Text>
    </View>
  </TouchableOpacity>
);
