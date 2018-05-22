import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";
import * as Animatable from 'react-native-animatable';

export default class Buffet extends Component {
    render() {
        return (
            <Container>
                <ImageBackground 
                source={require('../../assets/boofe_online.jpg')} 
                style={styles.bgImg}>
                    <TouchableWithoutFeedback onPress={() => Actions.buffet()}>
                        <View
                                         animation="fadeInDown"
                                         duration={1000} delay={1000}
                                         useNativeDriver
                                         style={styles.animationView}>
                            <View style={styles.bgView}>
                                <Animatable.Text 
                                animation="fadeIn" delay={2000}
                                                 direction="alternate"
                                                 useNativeDriver
                                                 style={styles.animationTitle}>
                                    بوفه آنلاین
                                </Animatable.Text>
                                <Animatable.Text 
                                animation="zoomInDown" delay={2500}
                                                 useNativeDriver
                                                 direction="alternate"
                                                 style={styles.animationDetail}>
                                    با بوفه آنلاین شما می توانید غذاهای مخصوص رژیم خود را بصورت آنلاین سفارش دهید و 30
                                    الی 45 دقیقه دیگر در محل مورد نظر خود دریافت کنید!
                                </Animatable.Text>
                                <Animatable.Text 
                                animation="fadeIn" delay={3000} iterationCount="infinite"
                                                 direction="alternate"
                                                 useNativeDriver
                                                 style={styles.animationClick}>
                                    برای ورود به بوفه آنلاین کلیک کنید.
                                </Animatable.Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
             </Container>
        )
    }
}