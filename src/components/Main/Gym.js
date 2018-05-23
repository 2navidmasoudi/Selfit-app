import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import {styles} from "./style";
export default class Gym extends Component {
    render() {
        return (
        <Container>
            <View  style={styles.bgImg}>
                <TouchableWithoutFeedback onPress={()=>Actions.gym()}>
                    <View style={styles.animationView}>
                        <View style={styles.bgView}>
                            <Text style={styles.animationTitle}>
                                باشگاه یاب
                            </Text>
                            <Text style={styles.animationDetail}>
                                باشگاه دور و اطراف خودتون رو پیدا کنید، عکس هاشو ببینید و نظرات بقیه رو راجع به باشگاه مورد نظرتون بخونید.
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Container>
        )
    }
}