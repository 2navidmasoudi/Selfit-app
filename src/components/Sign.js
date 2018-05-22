import React, {Component} from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {Container, Text} from 'native-base';
// import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {SignStyle} from '../assets/styles/sign';
import Status from "./status";

export default class Sign extends Component {


    render() {
        const {
            signButtonImg, authButtonText,
            signButtonStyle, SignBackground
        } = SignStyle;
        return (
            <Container>
                <Status/>
                <ImageBackground
                    style={SignBackground}
                    source={require('../assets/morabie_man.jpg')}>
                    <View style={{flex:1,flexDirection:'row',alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={() => Actions.signUp()}>
                            <ImageBackground
                                imageStyle={signButtonStyle}
                                source={require('./../assets/LoginButton.png')}
                                style={signButtonImg}>
                                <Text style={authButtonText}>ورود</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Actions.signUp()}>
                            <ImageBackground
                                imageStyle={signButtonStyle}
                                source={require('./../assets/LoginButton.png')}
                                style={signButtonImg}>
                                <Text style={authButtonText}>ثبت نام</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Container>
        )
    }
}
