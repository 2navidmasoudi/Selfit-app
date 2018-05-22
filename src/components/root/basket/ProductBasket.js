import React, {Component} from 'react';
import {FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import {Button, Container, Content, Footer, FooterTab} from 'native-base';
import {getBasketProduct} from "../../../services/orderProduct";
import AppHeader from "../../header";
import {reBasketProduct, setProductPriceAll, setRoad, tokenStore} from "../../../redux/actions";
import {logError} from "../../../services/log";
import {Actions} from "react-native-router-flux";
import ProductCard from "./ProductCard";
import {getPayment, getRequestPayment} from "../../../services/payment";

class ProductBasket extends Component {
    componentWillMount() {
        this.getInfo();
    }

    state = {
        active: true,
        min: 0,
        max: 30,
        fsort: 0,
        ssort: false,
    };
    async _getPayment() {
        let totalPrice = await getPayment(2, this.props.user.tokenmember, 'selfit.member');
        this.props.setProductPriceAll(totalPrice);
    };
    async _getRequestPayment() {
        getRequestPayment(2, this.props.user.tokenmember);
    };

    async getInfo() {
        await this.props.tokenStore('selfit.store');
        await this._getPayment();
        await this._getBasketProduct();
        await this.props.setRoad('Store');
    }

    async _getBasketProduct() {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi} = await this.props;
            let {active, max, min, fsort, ssort} = await  this.state;
            let Basket = await getBasketProduct(active, tokenmember, tokenapi, max, min, ssort, fsort);
            console.log(Basket, 'basket for Product!');
            this.props.reBasketProduct(Basket, Basket.length);
        } catch (e) {
            console.log(e);
            logError(e, '_getBasketProduct', 'DrawerLayout/index', 'getBasketProduct');
        }
    }

    render() {
        const FooterComponent = (this.props.Count) === 0 ? null :
            <Footer>
                <FooterTab>
                    <Button
                        style={{
                            // paddingTop: 10,
                            backgroundColor: '#0F9D7A'
                        }}
                        onPress={() => Actions.addressRoot({LeadFrom: 'Store'})}>
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
                <AppHeader rightTitle="سبد محصول" backButton="flex"/>
                <Content padder>
                    <Text style={{textAlign: 'center'}}>سبد خرید</Text>
                    <FlatList
                        data={this.props.productBasket}
                        renderItem={(item) => this.renderProduct(item)}
                        keyExtractor={(item) => item.idproduct}
                        scrollEnabled={false}
                        // onRefresh={this.handleRefresh.bind(this)}
                        // refreshing={this.state.refreshing}
                        // onEndReachedThreshold={0.5}
                        // ListFooterComponent={this.renderFooter.bind(this)}
                    />
                    {/*<Button block onPress={this._getPayment.bind(this)}>*/}
                        {/*<Text>get</Text>*/}
                    {/*</Button>*/}
                    <Button block onPress={this._getRequestPayment.bind(this)}>
                        <Text>get</Text>
                    </Button>
                    <Text>کل: {this.props.totalPrice.toLocaleString('fa')}</Text>
                </Content>
                {FooterComponent}
            </Container>
        )
    }
    renderProduct({item}) {
        return <ProductCard product={item}/>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenStore: (tokenapi) => dispatch(tokenStore(tokenapi)),
        reBasketProduct: (basket, basketCount) => dispatch(reBasketProduct(basket, basketCount)),
        setRoad: (roadTo) => dispatch(setRoad(roadTo)),
        setProductPriceAll: (PriceAllProduct) => dispatch(setProductPriceAll(PriceAllProduct)),
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.store.tokenapi,
        productBasket: state.basket.productBasket,
        Count: state.basket.productBasketCount,
        totalPrice: state.basket.PriceAllProduct,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBasket);