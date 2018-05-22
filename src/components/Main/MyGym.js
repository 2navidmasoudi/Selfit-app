import React, {Component} from 'react';
import {ImageBackground, TouchableWithoutFeedback, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";
import * as Animatable from 'react-native-animatable';

export default class MyGym extends Component {
    render() {
        return (
            <Container>
                <ImageBackground source={require('../../assets/Bashgah_man.jpg')} style={styles.bgImg}>
                    <TouchableWithoutFeedback onPress={() => Actions.mygymRoot()}>
                        <Animatable.View ref={this.handleViewRef}
                                         animation="fadeInDown"
                                         duration={1000} delay={1000}
                                         useNativeDriver
                                         style={styles.animationView}>
                            <View style={styles.bgView}>
                                <Animatable.Text animation="fadeIn" delay={2000}
                                                 useNativeDriver
                                                 direction="alternate"
                                                 style={styles.animationTitle}>
                                    باشگاه من
                                </Animatable.Text>
                                <Animatable.Text animation="zoomInDown" delay={2500}
                                                 useNativeDriver
                                                 direction="alternate"
                                                 style={styles.animationDetail}>
                                    عکس و اطلاعات و توضیحات باشکاه خود را ویرایش کنید تا بیشتر مورد توجه قرار بگیرید! در باشگاه خود ثبت نشده اید؟ با پشتیبانی تماس بگیرید.
                                </Animatable.Text>
                                <Animatable.Text animation="fadeIn" delay={3000}
                                                 iterationCount="infinite"
                                                 useNativeDriver
                                                 direction="alternate"
                                                 style={styles.animationClick}>
                                    برای ورود به باشگاه من کلیک کنید.
                                </Animatable.Text>
                            </View>
                        </Animatable.View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </Container>
        )
    }
}