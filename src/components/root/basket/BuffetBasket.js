import React, {Component} from 'react';
import {Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Button, Container, Content, Footer, FooterTab, Badge, Icon, Spinner,Separator} from 'native-base';
import {getAllOrder} from "../../../services/orderBuffet";
import {getAllMixMaterial} from "../../../services/orderMaterial";
import AppHeader from "../../header";
import {reBasketBuffet, reBasketMaterial, setRoad, tokenBuffet} from "../../../redux/actions";
import {logError} from "../../../services/log";
import {getPayment, getRequestPayment} from "../../../services/payment";
import {Actions} from "react-native-router-flux";
import FoodCard from "./FoodCard";
import MaterialCard from "./MaterialCard";

class BuffetBasket extends Component {
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

    // componentWillUpdate(props) {
    //     this.getTotalPrice();
    // }
    // async getTotalPrice() {
    //     let total = 0;
    //     let {Count1, Count2, materialBasket, buffetBasket} = await this.props;
    //     for (i = 0; i < Count1; i++) {
    //         total += await materialBasket[i].pricematerial;
    //     }
    //     for (i = 0; i < Count2; i++) {
    //         total += await buffetBasket[i].pricemenufood;
    //     }
    //     await this.setState({total});
    // }


    async getInfo() {
        await  this.props.tokenBuffet('selfit.buffet');
        await  this._getBasketBuffet();
        await  this._getBasketMaterial();
        this.props.setRoad('buffet');
        // await  this.getTotalPrice();

    }

    async _getBasketBuffet() {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi} = await this.props;
            let {active, max, min} = await  this.state;
            let {Basket,PriceAll} = await getAllOrder(active,false, tokenmember, tokenapi, max, min);
            console.log(Basket, 'basket for Buffet!',PriceAll,'priceAll');
            this.props.reBasketBuffet(Basket, Basket.length,PriceAll);
        } catch (e) {
            console.log(e);
            logError(e, '_getBasketBuffet', 'DrawerLayout/index', 'getAllOrder');
        }
    };

    async _getBasketMaterial() {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi} = await this.props;
            let {state, max, min, fsort, ssort} = await  this.state;
            let {Basket,PriceAll} = await getAllMixMaterial(0,state, tokenmember, tokenapi, max, min, ssort, fsort);
            console.log(Basket, 'basket for Material!',PriceAll,'priceAll');
            this.props.reBasketMaterial(Basket, Basket.length,PriceAll);
        } catch (e) {
            console.log(e);
            logError(e, '_getBasketMaterial', 'DrawerLayout/index', 'getAllMixMaterial');
        }
    };


    render() {
        const FooterComponent = (this.props.Count1 + this.props.Count2) === 0 ? null :
            <Footer>
                <FooterTab>
                    <Button
                        style={{
                            // paddingTop: 10,
                            backgroundColor: '#0F9D7A'
                        }}
                        onPress={() => Actions.addressRoot({LeadFrom: 'Buffet'})}>
                        {/*<Badge><Text>{(this.props.Count1 + this.props.Count2).toLocaleString('fa')}</Text></Badge>*/}
                        {/*<Icon name="basket" style={{color: 'white'}}/>*/}
                        <Text style={{
                            fontFamily: 'IRANSansMobile',
                            // fontSize: 18,
                            color: 'white',
                            // paddingTop: 12
                        }}>انتخاب آدرس</Text>
                    </Button>
                </FooterTab>
            </Footer>;
        return (
            <Container>
                <AppHeader rightTitle="سبد غذا" backButton="flex"/>
                <Content padder>
                    <Text style={{textAlign: 'center'}}>سبد خرید</Text>
                    <Separator>
                        <Text style={{textAlign: 'center'}}>غذای آماده</Text>

                    </Separator>
                    <FlatList
                        data={this.props.buffetBasket}
                        renderItem={(item) => this.returnBuffetItem(item)}
                        keyExtractor={(item) => item.idbasketbuffet}
                        scrollEnabled={false}
                        // onRefresh={this.handleRefresh.bind(this)}
                        // refreshing={this.state.refreshing}
                        // onEndReachedThreshold={0.5}
                        // ListFooterComponent={this.renderFooter.bind(this)}
                    />
                    <Separator>
                        <Text style={{textAlign: 'center'}}>متریال</Text>
                    </Separator>
                    <FlatList
                        data={this.props.materialBasket}
                        renderItem={(item) => this.renderMaterialItem(item)}
                        keyExtractor={(item) => item.idmixmaterial}
                        scrollEnabled={false}
                        // onRefresh={this.handleRefresh.bind(this)}
                        // refreshing={this.state.refreshing}
                        // onEndReachedThreshold={0.5}
                        // ListFooterComponent={this.renderFooter.bind(this)}
                    />
                    <Text>کل: {this.props.PriceAll}</Text>
                </Content>
                {FooterComponent}

            </Container>
        )
    }

    returnBuffetItem({item}) {
        return <FoodCard food={item}/>
    }

    renderMaterialItem({item}) {
        return <MaterialCard food={item}/>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenBuffet: (tokenapi) => dispatch(tokenBuffet(tokenapi)),
        reBasketBuffet: (basket, basketCount,PriceAll) => dispatch(reBasketBuffet(basket, basketCount, PriceAll)),
        reBasketMaterial: (basket, basketCount,PriceAll) => dispatch(reBasketMaterial(basket, basketCount,PriceAll)),
        setRoad: (roadTo) => dispatch(setRoad(roadTo)),
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.buffet.tokenapi,
        materialBasket: state.basket.materialBasket,
        buffetBasket: state.basket.buffetBasket,
        Count1: state.basket.materialBasketCount,
        Count2: state.basket.buffetBasketCount,
        PriceAll: state.basket.PriceAllBuffet + state.basket.PriceAllMaterial,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BuffetBasket);