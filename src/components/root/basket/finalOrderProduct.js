import React, {Component} from 'react';
import {Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Button, Container, Content, Footer, FooterTab, Badge, Icon, Spinner} from 'native-base';
import {getAllOrder, postAddressOrderBuffet, postFactor} from "../../../services/orderBuffet";
import { getAllMixMaterial} from "../../../services/orderMaterial";
import AppHeader from "../../header";
import {reBasketBuffet, reBasketMaterial, setRoad, tokenBuffet} from "../../../redux/actions";
import {logError} from "../../../services/log";
import {getPayment, getRequestPayment} from "../../../services/payment";
import {Actions} from "react-native-router-flux";
// import PushNotification from 'react-native-push-notification';

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

class finalOrderProduct extends Component {
    state = {
        active: true,
        state: false,
        min: 0,
        max: 30,
        fsort: 0,
        ssort: false,
        total: 0,

    };

    componentWillMount() {
        this.getInfo();
    }


    async getInfo() {
        await  this.props.tokenBuffet('selfit.buffet');
        this.props.setRoad('buffet');
        // await  this.getTotalPrice();

    }
    async _getRequestPayment() {
        getRequestPayment(2, this.props.user.tokenmember);
    };
    async handleFooterPress() {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi} = await this.props;
            // let idfactor = await postFactor('سس بزن', 1, tokenmember, tokenapi);
            this._getRequestPayment();
            // console.log(idfactor);
            // let result = await postAddressOrderBuffet(idfactor, tokenmember, tokenapi);
            // if (result == 1) {
            //     PushNotification.localNotification({
            //         title: 'selfit',
            //         message: "فاکتور شما ثبت شد. در صورت تائید بوفه دار پیام پرداخت به شما فرستاده می شود.", // (required)
            //     });
            //     Actions.reset('root');
            // }
            console.log(result);
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const FooterComponent = (this.props.Count) === 0 ? null :
            <Footer>
                <FooterTab>
                    <Button
                        style={{
                            // paddingTop: 10,
                            backgroundColor: '#0F9D7A'
                        }}
                        onPress={this.handleFooterPress.bind(this)}>
                        {/*<Badge><Text>{(this.props.Count1 + this.props.Count2).toLocaleString('fa')}</Text></Badge>*/}
                        {/*<Icon name="basket" style={{color: 'white'}}/>*/}
                        <Text style={{
                            fontFamily: 'IRANSansMobile',
                            // fontSize: 18,
                            color: 'white',
                            // paddingTop: 12
                        }}>انتخاب زمان</Text>
                    </Button>
                </FooterTab>
            </Footer>;
        return (
            <Container>
                <AppHeader rightTitle="سبد غذا" backButton="flex"/>
                <Content padder>
                    <Text>صدور فاکتور</Text>
                </Content>
                {FooterComponent}
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenBuffet: (tokenapi) => dispatch(tokenBuffet(tokenapi)),

        setRoad: (roadTo) => dispatch(setRoad(roadTo)),
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.buffet.tokenapi,
        Count: state.basket.productBasketCount,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(finalOrderProduct);