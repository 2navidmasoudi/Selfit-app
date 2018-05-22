import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";
import * as Animatable from 'react-native-animatable';
import Video from "react-native-video";
export default class BuffetMenu extends Component {
    render() {
        return (
        <Container>
            {/*<Video*/}
                {/*source={require('../../assets/meno_boofe.mp4')}*/}
                {/*rate={1.0}                   // 0 is paused, 1 is normal.*/}
                {/*volume={1.0}                 // 0 is muted, 1 is normal.*/}
                {/*muted={false}                // Mutes the audio entirely.*/}
                {/*paused={false}               // Pauses playback entirely.*/}
                {/*resizeMode="cover"           // Fill the whole screen at aspect ratio.*/}
                {/*repeat={true}                // Repeat forever.*/}
                {/*style={styles.backgroundVideo}*/}
            {/*/>*/}
            <View style={styles.bgImg}>
                <TouchableWithoutFeedback onPress={()=>Actions.buffetMenuRoot()}>
                    <View style={styles.animationView}>
                        <View style={styles.bgView}>
                            <Text style={styles.animationTitle}>
                                منو بوفه
                            </Text>
                            {/*To do : text-align : justify with WebView Html*/}
                            <Text style={styles.animationDetail}>
                                منو بوفه خودتون
                            </Text>
                            <Animatable.Text animation="fadeIn" iterationCount="infinite"
                                             direction="alternate"
                                             style={styles.animationClick}>
                                برای ورود به منو بوفه کلیک کنید.
                            </Animatable.Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Container>
        )
    }
}