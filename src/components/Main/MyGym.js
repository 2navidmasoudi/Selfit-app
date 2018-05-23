import React, {Component} from 'react';
import {ImageBackground, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";
import * as Animatable from 'react-native-animatable';

export default class MyGym extends Component {
    render() {
        return (
            <Container>
                <View style={styles.bgImg}>
                    <TouchableWithoutFeedback onPress={() => Actions.mygymRoot()}>
                        <View style={styles.animationView}>
                            <View style={styles.bgView}>
                                <Text style={styles.animationTitle}>
                                    باشگاه من
                                </Text>
                                <Text style={styles.animationDetail}>
                                    عکس و اطلاعات و توضیحات باشکاه خود را ویرایش کنید تا بیشتر مورد توجه قرار بگیرید! در باشگاه خود ثبت نشده اید؟ با پشتیبانی تماس بگیرید.
                                </Text>
                                <Animatable.Text animation="fadeIn" delay={3000}
                                                 iterationCount="infinite"
                                                 useNativeDriver
                                                 direction="alternate"
                                                 style={styles.animationClick}>
                                    برای ورود به باشگاه من کلیک کنید.
                                </Animatable.Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Container>
        )
    }
}