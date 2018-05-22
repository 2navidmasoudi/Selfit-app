import React, {Component} from 'react';
import {Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Button, Container, Content, Footer, FooterTab, Badge, Icon, Spinner, Item, Input, Label} from 'native-base';
import {getAllOrder, postAddressOrderBuffet, postFactor} from "../../../services/orderBuffet";
import { getAllMixMaterial} from "../../../services/orderMaterial";
import AppHeader from "../../header";
import {reBasketBuffet, reBasketMaterial, setRoad, tokenBuffet} from "../../../redux/actions";
import {logError} from "../../../services/log";
import {getPayment, getRequestPayment} from "../../../services/payment";
import {Actions} from "react-native-router-flux";
// import PushNotification from 'react-native-push-notification';
import {SignStyle} from "../../../assets/styles/sign";

// PushNotification.configure({
//
//     // (optional) Called when Token is generated (iOS and Android)
//     onRegister: function (token) {
//         console.log('TOKEN:', token);
//     },
//
//     // (required) Called when a remote or local notification is opened or received
//     onNotification: function (notification) {
//         console.log('NOTIFICATION:', notification);
//
//         // process the notification
//         Actions.reset('root');
//         // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
//
//     },
// });

class finalOrderBuffet extends Component {
    state = {
        active: true,
        state: false,
        min: 0,
        max: 30,
        fsort: 0,
        ssort: false,
        total: 0,
        descfactor:'',

    };

    componentWillMount() {
        this.getInfo();
        console.log(this.props,'props');
    }


    async getInfo() {
        await  this.props.tokenBuffet('selfit.buffet');
        this.props.setRoad('buffet');
        // await  this.getTotalPrice();

    }

    async sendOrderBuffet() {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi,buffetid} = await this.props;
            let {descfactor}= await this.state;
            let idfactor = await postFactor(buffetid ,descfactor, 1, tokenmember, tokenapi);
            console.log(idfactor);
            let result = await postAddressOrderBuffet( idfactor, tokenmember, tokenapi);
            if (result == 1) {
                alert('سفارش شما با موفقیت ثبت شد.');
                // PushNotification.localNotification({
                //     title: 'selfit',
                //     message: "فاکتور شما ثبت شد. در صورت تائید بوفه دار پیام پرداخت به شما فرستاده می شود.", // (required)
                // });
                Actions.reset('root');
            }
            console.log(result);
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const {
            item, formInputText
        } = SignStyle;
        const FooterComponent = (this.props.Count1 + this.props.Count2) === 0 ? null :
            <Footer>
                <FooterTab>
                    <Button
                        style={{
                            backgroundColor: '#0F9D7A'
                        }}
                        onPress={this.sendOrderBuffet.bind(this)}>
                        <Text style={{
                            fontFamily: 'IRANSansMobile',
                            color: 'white',
                        }}>صدور فاکتور</Text>
                    </Button>
                </FooterTab>
            </Footer>;
        return (
            <Container>
                <AppHeader rightTitle="سبد غذا" backButton="flex"/>
                <Content padder>
                    <Text>صدور فاکتور</Text>
                    <Item style={[item, {flex: 1}]}>
                        <Icon active name='clipboard'/>
                        <Input style={formInputText} value={this.state.descgym}
                               multiline={true}
                               onChangeText={(descfactor) => this.setState({descfactor})}/>
                        <Label>توضیحات</Label>
                    </Item>
                </Content>
                {FooterComponent}

            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenBuffet: (tokenapi) => dispatch(tokenBuffet(tokenapi)),
        reBasketMaterial: (basket, basketCount) => dispatch(reBasketMaterial(basket, basketCount)),
        reBasketBuffet: (basket, basketCount) => dispatch(reBasketBuffet(basket, basketCount)),
        setRoad: (roadTo) => dispatch(setRoad(roadTo)),
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.buffet.tokenapi,
        materialBasket: state.basket.materialBasket,
        buffetBasket: state.basket.buffetBasket,
        buffetid:state.buffet.buffetid,
        Count1: state.basket.materialBasketCount,
        Count2: state.basket.buffetBasketCount,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(finalOrderBuffet);