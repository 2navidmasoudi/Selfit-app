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
                <View style={styles.bgImg}>
                    <TouchableWithoutFeedback onPress={() => Actions.couchRoot()}>
                        <View style={styles.animationView}>
                            <View style={styles.bgView}>
                                <Text style={styles.animationTitle}>
                                    مربیان
                                </Text>
                                <Text style={styles.animationDetail}>
                                    مربی مورد نظر خودتون رو پیدا کنید! برنامه ی غذایی، برنامه ورزشی، مشاوره و خیلی
                                    کارهای دیگه! مربی هستید و در لیست مربیان ثبت نشده اید؟ از طریق پشتیبانی به ما اطلاع
                                    بدهید.
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Container>
        )
    }
}