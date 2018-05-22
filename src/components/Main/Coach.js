import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";
import * as Animatable from 'react-native-animatable';
import Video from "react-native-video";

export default class Coach extends Component {
    render() {
        return (
            <Container>
                {/*<Video*/}
                    {/*source={require('../../assets/morabian.mp4')}*/}
                    {/*rate={1.0}                   // 0 is paused, 1 is normal.*/}
                    {/*volume={1.0}                 // 0 is muted, 1 is normal.*/}
                    {/*muted={false}                // Mutes the audio entirely.*/}
                    {/*paused={false}               // Pauses playback entirely.*/}
                    {/*resizeMode="cover"           // Fill the whole screen at aspect ratio.*/}
                    {/*repeat={true}                // Repeat forever.*/}
                    {/*style={styles.backgroundVideo}*/}
                {/*/>*/}
                <View style={styles.bgImg}>
                    <TouchableWithoutFeedback onPress={() => Actions.couchRoot()}>
                        <View style={styles.animationView}>
                            <View style={styles.bgView}>
                                <Text style={styles.animationTitle}>
                                    مربیان
                                </Text>
                                {/*To do : text-align : justify with WebView Html*/}
                                <Text style={styles.animationDetail}>
                                    مربی مورد نظر خودتون رو پیدا کنید! برنامه ی غذایی، برنامه ورزشی، مشاوره و خیلی
                                    کارهای دیگه! مربی هستید و در لیست مربیان ثبت نشده اید؟ از طریق پشتیبانی به ما اطلاع
                                    بدهید.
                                </Text>
                                <Animatable.Text animation="fadeIn" iterationCount="infinite"
                                                 direction="alternate"
                                                 style={styles.animationClick}>
                                    برای ورود به مربیان کلیک کنید.
                                </Animatable.Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Container>
        )
    }
}