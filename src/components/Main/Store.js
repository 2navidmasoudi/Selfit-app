import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";
import * as Animatable from 'react-native-animatable';
export default class Store extends Component {
    render() {
        return (
        <Container>
            <ImageBackground source={require('../../assets/store.jpg')} style={styles.bgImg}>
                <TouchableWithoutFeedback onPress={()=>Actions.storeRoot()}>
                    <View style={styles.animationView}>
                        <View style={styles.bgView}>
                            <Text style={styles.animationTitle}>
                                فروشگاه
                            </Text>
                            {/*To do : text-align : justify with WebView Html*/}
                            <Text style={styles.animationDetail}>
                                نظرتون راجع به فروشگاه ورزشی آنلاین اونم از طریق اپلیکیشن چیه؟
                            </Text>
                            <Animatable.Text animation="fadeIn" iterationCount="infinite"
                                             direction="alternate"
                                             style={styles.animationClick}>
                                برای ورود به فروشگاه کلیک کنید.
                            </Animatable.Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </Container>
        )
    }
}