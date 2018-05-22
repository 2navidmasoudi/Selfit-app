import React, {Component} from 'react';
import {Image, Linking, TouchableWithoutFeedback} from 'react-native';
import {Button, Container, Content, Text, View} from 'native-base';
import AppHeader from '../header';
import {connect} from 'react-redux';
import call from 'react-native-phone-call'
import {setUser} from '../../redux/actions';
import {form} from "../../assets/styles";


class Complaints extends Component {

    componentWillMount() {
    }

    render() {
        const args = {
            number: '09011256662', // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
        };

        return (
            <Container>
                <AppHeader rightTitle="شکایات و پیشنهادات" backButton={"flex"}/>
                <Content padder>
                    <Text style={{fontFamily: 'IRANSANSMobile'}}>لطفا پیشنهادات و انتقادات و همچنین شکایات خود را از
                        طریق شماره ثابت :02188010687 و یا پست الکترونیکی : support@selfit.ir مطرح کنید
                    </Text>
                </Content>
                <Button block onPress={() => call(args).catch(console.error)} style={[form.submitButton, {marginHorizontal: 10}]}>
                    <Text style={form.submitText}>تماس با پشتیبانی</Text>
                </Button>
                <Button block style={[form.submitButton, {margin: 10}]}
                        onPress={() => Linking.openURL('mailto:support@selfit.ir?subject=abcdefg&body=body')}>
                    <Text style={form.submitText}>ایمیل به پشتیبانی</Text>
                </Button>
            </Container>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user)),
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Complaints);