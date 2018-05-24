import React from 'react';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from 'native-base';
import { styles } from './style';

const Gym = () => (
  <Container>
    <View style={styles.bgImg}>
      <TouchableWithoutFeedback onPress={() => Actions.gym()}>
        <View style={styles.animationView}>
          <View style={styles.bgView}>
            <Text style={styles.animationTitle}>
                  باشگاه یاب
            </Text>
            <Text style={styles.animationDetail}>
                  باشگاه دور و
                  اطراف خودتون رو پیدا کنید، عکس هاشو ببینید و
                  نظرات بقیه رو راجع به باشگاه مورد نظرتون بخونید.
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </Container>
);
export default Gym;

