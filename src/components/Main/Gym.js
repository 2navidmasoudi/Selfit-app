import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";
import * as Animatable from 'react-native-animatable';
export default class Gym extends Component {
    render() {
        return (
        <Container>
            <ImageBackground source={require('../../assets/bashga_yab.jpg')} style={styles.bgImg}>
                <TouchableWithoutFeedback onPress={()=>Actions.gym()}>
                    <View style={styles.animationView}>
                        <View style={styles.bgView}>
                            <Text style={styles.animationTitle}>
                                باشگاه یاب
                            </Text>
                            {/*To do : text-align : justify with WebView Html*/}
                            <Text style={styles.animationDetail}>
                                باشگاه دور و اطراف خودتون رو پیدا کنید، عکس هاشو ببینید و نظرات بقیه رو راجع به باشگاه مورد نظرتون بخونید.
                            </Text>
                            <Animatable.Text animation="fadeIn" iterationCount="infinite"
                                             direction="alternate"
                                             style={styles.animationClick}>
                                برای ورود به باشگاه یاب کلیک کنید.
                            </Animatable.Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </Container>
        )
    }
}