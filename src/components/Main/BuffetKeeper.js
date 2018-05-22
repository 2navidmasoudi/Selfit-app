import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";

export default class BuffetKeeper extends Component {
    render() {
        return (
            <Container>
                <View style={styles.bgImg}>
                    <TouchableWithoutFeedback onPress={() => Actions.buffetKeeperRoot()}>
                        <View style={styles.animationView}>
                            <View style={styles.bgView}>
                                <Text style={styles.animationTitle}>
                                    دریافت سفارش
                                </Text>
                                <Text style={styles.animationDetail}>
                                    سفارش های ارسال شده به خود را تایید و برای مشتری آماده کنید! هنوز در بوفه مورد نظر ثبت نشده اید؟ با پشتیبانی تماس بگیرید.
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Container>
        )
    }
}