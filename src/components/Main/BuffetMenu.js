import React from 'react';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from 'native-base';
import { styles } from './style';

const BuffetMenu = () => (
  <Container>
    <View style={styles.bgImg}>
      <TouchableWithoutFeedback onPress={() => Actions.buffetMenuRoot()}>
        <View style={styles.animationView}>
          <View style={styles.bgView}>
            <Text style={styles.animationTitle}>
                                منو بوفه
            </Text>
            {/* To do : text-align : justify with WebView Html */}
            <Text style={styles.animationDetail}>
                                منو بوفه خودتون
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </Container>
);
export default BuffetMenu;
