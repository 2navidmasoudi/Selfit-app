import React from 'react';
import {Linking} from 'react-native';
import {
    Container,
    View,
    Text,
    Title,
    Header,
    Left,
    Right,
    Content,
    Button,
    Body,
    Icon,
    Form,
    Item,
    Input,
    Subtitle
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {form, header} from '../../assets/styles/index';
import AppHeader from '../header';

export default class Support extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <Container>
                <AppHeader rightTitle="پشتیبانی" backButton="flex"/>
                <Content padder>
                    <Text>Support Page</Text>
                </Content>
                <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <Button block style={[form.submitButton, {margin: 10}]}
                            onPress={() => Linking.openURL('mailto:support@selfit.ir?subject=abcdefg&body=body')}>
                        <Text style={form.submitText}>ایمیل به پشتیبانی</Text>
                    </Button>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <Button block style={[form.submitButton, {margin: 10, marginTop: 0}]}
                            onPress={() => Linking.openURL('mailto:job@selfit.ir?subject=abcdefg&body=body')}>
                        <Text style={form.submitText}>استخدام در سلفیت</Text>
                    </Button>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <Button block style={[form.submitButton, {margin: 10, marginTop: 0}]}
                            onPress={() => Linking.openURL('https://telegram.me/navidmsd ')}>
                        <Text style={form.submitText}>تلگرام پشتیبانی</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}
 
