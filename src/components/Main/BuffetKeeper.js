import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";
import * as Animatable from 'react-native-animatable';

export default class BuffetKeeper extends Component {
    render() {
        return (
            <Container>
                <ImageBackground source={require('../../assets/buffetKeepr.jpg')} style={styles.bgImg}>
                    <TouchableWithoutFeedback onPress={() => Actions.buffetKeeperRoot()}>
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
                                    دریافت سفارش
                                </Animatable.Text>
                                <Animatable.Text animation="zoomInDown" delay={2500}
                                                 useNativeDriver
                                                 direction="alternate"
                                                 style={styles.animationDetail}>
                                    سفارش های ارسال شده به خود را تایید و برای مشتری آماده کنید! هنوز در بوفه مورد نظر ثبت نشده اید؟ با پشتیبانی تماس بگیرید.
                                </Animatable.Text>
                                <Animatable.Text animation="fadeIn" delay={3000}
                                                 iterationCount="infinite"
                                                 useNativeDriver
                                                 direction="alternate"
                                                 style={styles.animationClick}>
                                    برای ورود به دریافت سفارش کلیک کنید.
                                </Animatable.Text>
                            </View>
                        </Animatable.View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </Container>
        )
    }
}