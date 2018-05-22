import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {Button, Container, Content, Footer, FooterTab} from 'native-base';
import AppHeader from "../../header";
import { setRoad, tokenStore} from "../../../redux/actions";
import {logError} from "../../../services/log";
import { getRequestPayment} from "../../../services/payment";
import {Actions} from "react-native-router-flux";
import {postAddressProduct, postFactorProduct, putTimeFactor} from "../../../services/orderProduct";
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
        console.log(this.props,'props');

    }


    async getInfo() {
        await  this.props.tokenStore('selfit.store');
        this.props.setRoad('Store');
        // await  this.getTotalPrice();

    }

    async _getRequestPayment() {
        getRequestPayment(2, this.props.user.tokenmember);
    };

    async _putTimeFactor(idfactor) {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi, idtimefactor} = await this.props;
            let result = await putTimeFactor(idfactor, idtimefactor, tokenmember, tokenapi);
            console.log(result, 'putTimeFactor');
            this.setState({selected: true});
        } catch (e) {
            console.log(e);
        }
    }
    async _postAddressProduct(idfactor) {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi,address} = await this.props;
            let result = await postAddressProduct(idfactor, address.idaddressmember, tokenmember, tokenapi);
            console.log(result, 'postAddressProduct');
            this.setState({selected: true});
        } catch (e) {
            console.log(e);
        }
    }

    async handleFooterPress() {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi, idtimefactor, descProduct} = await this.props;
            let idfactor = await postFactorProduct(idtimefactor, descProduct, 1, tokenmember, tokenapi);
            await this._putTimeFactor(idfactor);
            await this._postAddressProduct(idfactor);
            this._getRequestPayment();
            Actions.reset('root');
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
                            backgroundColor: '#0F9D7A'
                        }}
                        onPress={this.handleFooterPress.bind(this)}>
                        <Text style={{
                            fontFamily: 'IRANSansMobile',
                            color: 'white',
                        }}>پرداخت: {this.props.totalPrice.toLocaleString('fa')} تومان</Text>
                    </Button>
                </FooterTab>
            </Footer>;
        return (
            <Container>
                <AppHeader rightTitle="صدور فاکتور فروشگاه" backButton="flex"/>
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
        tokenStore: (tokenapi) => dispatch(tokenStore(tokenapi)),
        setRoad: (roadTo) => dispatch(setRoad(roadTo)),
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.store.tokenapi,
        Count: state.basket.productBasketCount,
        totalPrice: state.basket.PriceAllProduct,
        idtimefactor: state.basket.idtimefactor,
        descProducet: state.basket.descProducet,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(finalOrderProduct);