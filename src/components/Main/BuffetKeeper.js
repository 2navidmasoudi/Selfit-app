import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";
import * as Animatable from 'react-native-animatable';
import Video from "react-native-video";

export default class BuffetKeeper extends Component {
    render() {
        return (
            <Container>
                {/*<Video*/}
                    {/*source={require('../../assets/daryaft_sefaresh.mp4')}*/}
                    {/*rate={1.0}                   // 0 is paused, 1 is normal.*/}
                    {/*volume={1.0}                 // 0 is muted, 1 is normal.*/}
                    {/*muted={false}                // Mutes the audio entirely.*/}
                    {/*paused={false}               // Pauses playback entirely.*/}
                    {/*resizeMode="cover"           // Fill the whole screen at aspect ratio.*/}
                    {/*repeat={true}                // Repeat forever.*/}
                    {/*style={styles.backgroundVideo}*/}
                {/*/>*/}
                <View style={styles.bgImg}>
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
                </View>
            </Container>
        )
    }
}