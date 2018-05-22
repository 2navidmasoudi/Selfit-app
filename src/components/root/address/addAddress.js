import React from 'react';
import {Button, Container, Content, Input, Item, Label, Text, View, Form} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {form} from '../../../assets/styles/index';
import AppHeader from '../../header';
import {postAddress} from '../../../services';
import {connect} from 'react-redux';
import {styles} from "./style";

const convertNumbers2English = str => str.replace(/([٠١٢٣٤٥٦٧٨٩])|([۰۱۲۳۴۵۶۷۸۹])/g, (m, $1, $2) => m.charCodeAt(0) - ($1 ? 1632 : 1776));

class AddAddress extends React.Component {
    state = {
        addressLocation: null,
        map: null,
        plaque: null,
        floor: null,
        titleaddress: null,
    };

    componentWillMount(){
        console.log(this.props);
        console.log(this.state);
    }

    async _addAddress() {
        let {tokenapi, tokenmember} = await this.props.user;
        let {plaque, floor, titleaddress} = await this.state;
        let {latitude, longitude} = await this.props.region;
        let result = await postAddress(titleaddress, plaque, floor, latitude, longitude, 1, tokenmember, tokenapi);
        console.log("result address: ", result);
        if (result == 1) {
            Actions.popTo('address',{refresh: {refresh: Math.random()}});
            Actions.refresh({refresh: {refresh: Math.random()}});
            // alert('آدرس با موفقیت ثبت شد!');

        } else {
            alert('خطا در ثبت آدرس جدید!')
        }
    }

    render() {
        return (
            <Container>
                <AppHeader rightTitle="آدرس" backButton="flex"/>
                <Content scrollEnabled={false} padder>
                    <Text style={styles.titleAddress}>
                        اضافه کردن آدرس جدید:
                    </Text>
                    <Form>
                    <Item floatingLabel style={styles.itemAddress}>
                        <Label style={styles.labelAddress}>آدرس کامل:</Label>
                        <Input mul onChangeText={(text) => this.changeAddressLocation(text)}/>
                    </Item>
                    <Item floatingLabel>
                        <Label style={styles.labelAddress}>نام آدرس (مثلا خانه، محل کار ...)</Label>
                        <Input onChangeText={(text) => this.changeTitle(text)}/>
                    </Item>
                    <View style={{flexDirection: 'row'}}>
                        <Item style={{flex:1}}>
                            <Label style={styles.labelAddress}>واحد</Label>
                            <Input onChangeText={(text) => this.changeFloor(text)}/>
                        </Item >
                        <Item style={{flex:1,marginLeft: 20}}>
                            <Label style={styles.labelAddress}>پلاک</Label>
                            <Input onChangeText={(text) => this.changePlaque(text)}/>
                        </Item>
                    </View>
                    </Form>
                </Content>
                <View style={styles.btnAddress}>
                    <Button block style={form.submitButton} onPress={() => this._addAddress()}>
                        <Text style={styles.btnAddressText}>ثبت آدرس</Text>
                    </Button>
                </View>
            </Container>
        )
    }


    changeFloor(text) {
        this.setState({floor: convertNumbers2English(text)});
    };

    changePlaque(text) {
        this.setState({plaque: convertNumbers2English(text)});
    };

    changeTitle(text) {
        this.setState({titleaddress: text});
    };

    changeAddressLocation(text) {
        this.setState({addressLocation: text});
    };
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps)(AddAddress);