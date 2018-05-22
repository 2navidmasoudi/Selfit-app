import React, {Component} from 'react';
import {ImageBackground, TextInput, TouchableOpacity, View} from 'react-native';
import {Container, Text, Content} from 'native-base';

import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
//Styles
import {SignStyle} from '../assets/styles/sign';
//redux
import {connect} from 'react-redux';
import {setPhone, setTokenapi, setUser} from '../redux/actions';
//service
import {getSingleToken, postMember, putMemberLogin} from '../services';
import Status from "./status";

//loader

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: {
                value: '',
                error: '',
            },
            Loading: this.props.authSuccess || false
        }
    };

    componentWillMount() {
        const authSuccess = this.props.authSuccess || false;
        this.checkAuthSuccess(authSuccess);
    }

    async checkAuthSuccess(authSuccess) {
        if (authSuccess) {
            this.checkNullParams();
        }
        console.log('authSucces:', authSuccess)
    }

    async checkNullParams() {
        try {
            let {tokenmember, tokenapi} = await this.props.user;
            let json = await getSingleToken(tokenmember, tokenapi);
            let {typememberid} = await json.MemberSingleToken;
            if (!typememberid) {
                this.setState({Loading: false});
                Actions.register();
            } else {
                await this.props.setUser(json.MemberSingleToken);
                Actions.reset('root');
            }
        } catch (error) {
            console.log(error);
        }
    }


    async login() {
        let {phoneNumber} = await this.state;
        if (phoneNumber.value.length !== 11) {
            this.setState({
                phoneNumber: {
                    value: phoneNumber.value,
                    error: 'لطفا شماره تلفن خود را چک کنید'
                }
            });
            console.log(this.state);
            return;
        } else if (phoneNumber.value.length === 11) {
            this.setState({
                phoneNumber: {
                    value: phoneNumber.value,
                    error: ''
                }
            });
            console.log(this.state);
            await this.props.setPhone({phone: phoneNumber.value});
            await this.requestMemberLogin();
        }
    }

    async requestMemberLogin() {
        try {
            await this.props.setTokenapi({tokenapi: "selfit.member"});
            let {phone, tokenapi} = await this.props.user;
            let json = await putMemberLogin(phone, tokenapi);
            console.log(json,'putMemberLogin');
            if (json === -4 || json === -8 ) {
                console.log('user not found, Error code:', json);
                this.postMember();
                return;
            } else if (json === -9) {
                console.log('user should activate phone, Error code:', json);
                this.putActivePhone();
                return;
            } else if (json === 1) {
                //We Check the Token Phone to get the Token!
                this.putCheckLogin();
            }
        } catch (error) {
            console.log(error)
        }

    }

    async postMember() {
        try {
            let {phone, tokenapi} = await this.props.user;
            let json =  await postMember(phone, tokenapi);
            console.log(json,'postMember');
            this.putActivePhone();
        } catch (err) {
            console.log(err);
        }
    }

    putActivePhone() {
        try {
            Actions.authLightBox({method: 'PutActivephone'});
        } catch (error) {
            console.log(error)
        }
    }

    putCheckLogin() {
        try {
            Actions.authLightBox({method: 'PutCheckLogin'});
        } catch (error) {
            console.log(error)
        }
    }

    //change Mobile Number
    changeMobileNumber(text) {
        this.setState({
            phoneNumber: {
                value: text,
                error: this.state.phoneNumber.error,
            }
        })
    }

    render() {
        const phoneNumberError = this.state.phoneNumber.error;
        const {
            loginBox, loginTitle, inputGroup, labelText,
            inputText, signButtonImg, LoginButtonText, backgroundStyle, signButtonStyle, labelRedText,signCustomBtn
        } = SignStyle;
        return (
            <Container>
                <Status/>
                {/*<Loader*/}
                {/*loading={this.state.Loading}/>*/}
                <LinearGradient colors={['#05785C', '#0F9D7A']}
                                style={backgroundStyle}
                                activeOpacity={0.85}>

                    <View style={loginBox}>
                        <Text style={loginTitle}>ورود</Text>
                        <View style={inputGroup}>
                            <Text style={labelText}>شماره موبایل :</Text>
                            <TextInput style={inputText}
                                       placeholder='09xxxxxxxxx'
                                       underlineColorAndroid='transparent'
                                       keyboardType='numeric'
                                       maxLength={11}
                                       onChangeText={text => this.changeMobileNumber(text)}/>
                            <Text style={labelRedText}>{phoneNumberError}</Text>
                            <View style={{alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.login.bind(this)}>
                                    <ImageBackground
                                        imageStyle={signCustomBtn}
                                        source={require('./../assets/S_Logo.png')}
                                        style={signButtonImg}>
                                        {/*<Text style={LoginButtonText}>تایید</Text>*/}
                                    </ImageBackground>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </LinearGradient>
            </Container>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        setPhone: (user) => dispatch(setPhone(user)),
        setTokenapi: (user) => dispatch(setTokenapi(user)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);