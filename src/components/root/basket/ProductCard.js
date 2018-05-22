import React, {Component} from 'react';
import {Image, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Card, CardItem, Icon, Left, Right, Text} from 'native-base';
import moment from 'moment-jalaali';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {reBasketBuffet, reBasketProduct, setProductPriceAll} from '../../../redux/actions';
import {logError} from '../../../services/log';
import {deleteOrderBuffet} from '../../../services/orderBuffet';
import {deleteBasketProduct, getBasketProduct} from "../../../services/orderProduct";
import {getPayment} from "../../../services/payment";

class ProductCard extends Component {

    async _getPayment() {
        let totalPrice = await getPayment(2, this.props.user.tokenmember, 'selfit.member');
        this.props.setProductPriceAll(totalPrice);
    };

    async handleRemove() {
        try {
            let {product, tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let deletedOrder = await deleteBasketProduct(product.idbasket, tokenmember, tokenapi);
            console.log(deletedOrder, 'deleted?');
            let Basket = await getBasketProduct(true, tokenmember, tokenapi, 30, 0, false, 0);
            this.props.reBasketProduct(Basket, Basket.length);
            this._getPayment();
        } catch (error) {
            console.log(error);
            logError(error, 'handleRemove', 'basket/ProductCard', 'deleteOrderBuffet');
        }
    }

    render() {
        const {product} = this.props;
        // const m = moment(`${product.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
        // const jM = m.format('jYYYY/jMM');
        // const ImgYear = m.jYear();
        // const ImgMonth = m.jMonth() + 1;
        // const ImgSrc = `${product.httpserver}${product.pathserver}${ImgYear}/${ImgMonth}/${product.picproduct}`;
        return (
            <Card>
                <CardItem header style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center'}}>{product.titleproduct}</Text>
                </CardItem>
                <CardItem style={{flex: 1}}>
                    <Left style={{flex: 1}}>
                        <Button onPress={this.handleRemove.bind(this)}>
                            <Icon name="close"/>
                        </Button>
                    </Left>
                    <Text
                        style={{textAlign: 'center'}}>تعداد: {product.numberbasket.toLocaleString('fa')}</Text>
                    <Right style={{flex: 1}}>
                        <Text
                            style={{textAlign: 'right'}}>قیمت: {(product.priceproduct * product.numberbasket).toLocaleString('fa')}</Text>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.store.tokenapi,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        reBasketProduct: (product, productCount) => dispatch(reBasketProduct(product, productCount)),
        setProductPriceAll: (PriceAllProduct) => dispatch(setProductPriceAll(PriceAllProduct)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);