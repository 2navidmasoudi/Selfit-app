import React from 'react';
import { View , Text , ImageBackground , TouchableOpacity , TextInput, AsyncStorage, Alert } from 'react-native';
import BaseLightBox from './BaseLightBox';
//styles
import {SignStyle} from '../../assets/styles/sign';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setUser, setTokenmember } from '../../redux/actions';
import { putCodeLogin } from '../../services';

class AuthLightBox extends React.Component {
    constructor(){
        super();
        this.state={
            tokenPhoneInput : '',
            tokenPhoneError: ''
        }
    }
    changeTokenPhone(text) {
        this.setState({
            tokenPhoneInput: text
        })
    }
    async checkTokenPhone(){
        try {
            let {  tokenPhoneInput , tokenPhoneError } = await this.state;
            if (tokenPhoneInput.length!==5){
                this.setState({
                  tokenPhoneError: 'کد باید یک عدد 5 رقمی باشد'
                });
                return;
            } else if (tokenPhoneInput.length===5){
                this.setState({
                    tokenPhoneError: ''
                });
                let { phone , tokenapi } = await this.props.user;
                let Method = await this.props.method;
                console.log(Method);
                let json = await putCodeLogin(Method,phone,tokenPhoneInput,tokenapi);
                if (json){
                    await this.props.setTokenmember(json);
                    console.log('Token for this member added as:',this.props.user.tokenmember);
                    Actions.login({authSuccess:true});
                } else {
                    console.log('error in code');           
                }
              }
        } catch(err){
            Alert('کد نامعتبر است! لطفا مجدد تلاش کنید');
        }
    }
    render(){
        const tokenPhoneError = this.state.tokenPhoneError;
        const {authBox,authTitle,inputGroup,labelRedText,
            authInput,signButtonImg,authButtonText,reAuth,signButtonStyle} = SignStyle;
      return(
        <BaseLightBox verticalPercent={0.90} horizontalPercent={0.55}>

            <View style={authBox}>
                <Text style={authTitle}>کد تایید</Text>
                {/* <View style={inputGroup}> */}
                <Text style={labelRedText}>لطفا کد ارسال شده به تلفن همراه خود را وارد کنید</Text>
                    <TextInput style={authInput}
                        placeholder='xxxxx'
                        autoFocus={true}
                        underlineColorAndroid='transparent'
                        keyboardType='numeric'
                        maxLength={5}
                        onChangeText={(text)=>this.changeTokenPhone(text)}/>
                <View style={{alignItems:'center'}}>
                <Text style={labelRedText}>{tokenPhoneError}</Text>
                    <TouchableOpacity onPress={(this.checkTokenPhone.bind(this))}>
                    <ImageBackground
                        imageStyle={signButtonStyle}
                        source={require('../../assets/S_Logo.png')}
                        style={signButtonImg}>
                        {/*<Text style={authButtonText}>تایید</Text>*/}
                        </ImageBackground>
                        
                    </TouchableOpacity>
                    <TouchableOpacity >


                        <Text style={reAuth}>ارسال مجدد کد</Text>

                        
                    </TouchableOpacity>
                </View>
                </View>
                {/* </View> */}
        </BaseLightBox>
      )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTokenmember: user => dispatch(setTokenmember(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AuthLightBox);