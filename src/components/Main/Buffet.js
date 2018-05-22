import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button, Container, Text} from 'native-base';
import {styles} from "./style";
import * as Animatable from 'react-native-animatable';
import Video from "react-native-video";
import {main} from "../../assets/styles";

export default class Buffet extends Component {
    render() {
        return (
            <Container>
                <Video
                    source={require('../../assets/sefaresh_ghaza.mp4')}
                    rate={1.0}                   // 0 is paused, 1 is normal.
                    volume={1.0}                 // 0 is muted, 1 is normal.
                    muted={false}                // Mutes the audio entirely.
                    paused={false}               // Pauses playback entirely.
                    resizeMode="cover"           // Fill the whole screen at aspect ratio.
                    repeat={true}                // Repeat forever.
                    style={styles.backgroundVideo}
                />
                <View source={require('../../assets/boofe_online.jpg')} style={styles.bgImg}>
                    <TouchableWithoutFeedback onPress={() => Actions.buffet()}>
                        <Animatable.View ref={this.handleViewRef}
                                         animation="fadeInDown"
                                         duration={1000} delay={1000}
                                         useNativeDriver
                                         style={styles.animationView}>
                            <View style={styles.bgView}>
                                <Animatable.Text animation="fadeIn" delay={2000}
                                                 direction="alternate"
                                                 useNativeDriver
                                                 style={styles.animationTitle}>
                                    بوفه آنلاین
                                </Animatable.Text>
                                <Animatable.Text animation="zoomInDown" delay={2500}
                                                 useNativeDriver
                                                 direction="alternate"
                                                 style={styles.animationDetail}>
                                    با بوفه آنلاین شما می توانید غذاهای مخصوص رژیم خود را بصورت آنلاین سفارش دهید و 30
                                    الی 45 دقیقه دیگر در محل مورد نظر خود دریافت کنید!
                                </Animatable.Text>
                                <Animatable.Text animation="fadeIn" delay={3000} iterationCount="infinite"
                                                 direction="alternate"
                                                 useNativeDriver
                                                 style={styles.animationClick}>
                                    برای ورود به بوفه آنلاین کلیک کنید.
                                </Animatable.Text>
                                <Button block style={[main.pannelBtn,{flex:1,borderRadius:8}]} onPress={()=>Actions.follow()}>
                                    <Text style={main.pannelTextBtn}>پیگیری سفارش</Text>
                                </Button>
                            </View>
                        </Animatable.View>
                    </TouchableWithoutFeedback>
                </View>
            </Container>
        )
    }
}