import React from 'react';
import { TouchableWithoutFeedback, ImageBackground, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container } from 'native-base';
import { styles } from './style';

const Music = () => (
  <Container>
    <ImageBackground style={styles.bgImg}>
      <TouchableWithoutFeedback onPress={() => Actions.Music()}>
        <View style={styles.animationView}>
          <View style={styles.bgView}>
            <Text style={styles.animationTitle}>
              موزیک
            </Text>
            {/* To do : text-align : justify with WebView Html */}
            <Text style={styles.animationDetail}>
              لطفا با موزیک ورزش کنید! موزیک های ما انحصاریست و مخصوص ورزش! گوش کنید و در گوشی
              ذخیره کنید.
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  </Container>
);
export default Music;

