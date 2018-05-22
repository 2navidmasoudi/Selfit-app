import React, {Component} from 'react';
import {ImageBackground, Text, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment-jalaali';
import {Actions} from 'react-native-router-flux';
import {Icon, Item, Badge, Left, Content} from 'native-base';
import {drawer} from '../../assets/styles/index';
import {reBasketBuffet, reBasketMaterial, reBasketProduct, tokenBuffet, tokenStore} from "../../redux/actions";
import {getBasketProduct} from "../../services/orderProduct";
import {logError} from "../../services/log";
import {getAllOrder} from "../../services/orderBuffet";
import { getAllMixMaterial} from "../../services/orderMaterial";
import {putUserLogout} from "../../services";

class DrawerLayout extends Component {
    componentWillMount() {
        this.getInfo();
    };

    state = {
        active: true,
        state: false,
        min: 0,
        max: 30,
        fsort: 0,
        ssort: false,
    };

    async getInfo() {
        await this.props.tokenStore('selfit.store');
        await this.props.tokenBuffet('selfit.buffet');
        // await this._getAllOrder();
        await this._getBasketProduct();
        await this._getBasketBuffet();
        await this._getBasketMaterial();
    };

    async _getBasketProduct() {
        try {
            let {tokenmember} = await this.props.user;
            let {storeToken} = await this.props;
            let {active, max, min, fsort, ssort} = await  this.state;
            let Basket = await getBasketProduct(active, tokenmember, storeToken, max, min, ssort, fsort);
            console.log(Basket, 'basket for Product!');
            this.props.reBasketProduct(Basket, Basket.length);
        } catch (e) {
            console.log(e);
            logError(e, '_getBasketProduct', 'DrawerLayout/index', 'getBasketProduct');
        }
    };
    // async _getAllOrder() {
    //     try {
    //         let {tokenmember} = await this.props.user;
    //         let {buffetToken} = await this.props;
    //         let orders = await getAllOrder(true,false,tokenmember,buffetToken,30,0);
    //         console.log(orders,'Orders');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    async _getBasketBuffet() {
        try {
            let {tokenmember} = await this.props.user;
            let {buffetToken} = await this.props;
            let {active, max, min} = await  this.state;
            let {Basket,PriceAll} = await getAllOrder(active, false, tokenmember, buffetToken, max, min);
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
            let {buffetToken} = await this.props;
            let {state, max, min, fsort, ssort} = await  this.state;
            let {Basket,PriceAll} = await getAllMixMaterial(0,state, tokenmember, buffetToken, max, min, ssort);
            console.log(Basket, 'basket for Material!',PriceAll,'priceAll');
            this.props.reBasketMaterial(Basket, Basket.length,PriceAll);
        } catch (e) {
            console.log(e);
            logError(e, '_getBasketMaterial', 'DrawerLayout/index', 'getAllMixMaterial');
        }
    };

    async _putUserLogout() {
        try {
            let {tokenapi, tokenmember} = await this.props.user;
            let json = await putUserLogout(tokenmember, tokenapi);
            if (json === 1) {
                Actions.reset('sign');
            } else {
                alert('خطا در خروج از حساب کاربری!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const {
            namefamilymember, phone,
            datesave, httpserver, pathserver, picmember
        } = this.props.user;
        const m = moment(`${datesave}`, 'YYYY-MM-DDTHH:mm:ss');
        const ImgYear = m.jYear();
        const ImgMonth = m.jMonth() + 1;
        const ImgSrc = `${Base64.decode(httpserver)}${Base64.decode(pathserver)}${ImgYear}/${ImgMonth}/${picmember}`;
        const Name = Base64.decode(namefamilymember);
        const phoneNumber = Base64.decode(phone)
        return (
            <View style={drawer.container}>
                <TouchableWithoutFeedback onPress={() => Actions.showImage({uri: ImgSrc})}>
                    <ImageBackground source={{uri: ImgSrc}} style={drawer.imageHeader}>
                        <View style={drawer.info}>
                            <Text style={drawer.infoText}>{Name}</Text>
                            <Text style={drawer.infoText}>{phoneNumber}</Text>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>
                <Content>
                    <Item style={drawer.item} onPress={() => {Actions.profile()}}>
                        <Text style={drawer.itemTitle}>پروفایل</Text>
                        <Icon name='person' style={drawer.itemIcon}/>
                    </Item>
                    <Item style={drawer.item} onPress={() => {
                        Actions.buffetBasket()
                    }}>
                        <Left style={{justifyContent:'center'}}>
                            <Badge style={{backgroundColor:'#0F9D7A',height:30,width:30,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'white'}}>{(this.props.buffetBasketCount+this.props.materialBasketCount).toLocaleString('fa')||'0'.toLocaleString('fa')}</Text>
                            </Badge>
                        </Left>
                        <Text style={drawer.itemTitle}>سبد خرید غذا</Text>
                        <Icon name='basket' style={drawer.itemIcon}/>
                    </Item>
                    <Item style={drawer.item} onPress={() => {
                        Actions.productBasket()
                    }}>
                        <Left style={{justifyContent:'center'}}>
                            <Badge style={{backgroundColor:'#0F9D7A',height:30,width:30,justifyContent:'center',alignItems:'center'}}>
                                {/*//todo: localeString for undefined basket*/}
                                <Text style={{color:'white',textAlign:'center'}}>{this.props.productBasketCount.toLocaleString('fa')||'0'.toLocaleString('fa')}</Text>
                            </Badge>
                        </Left>

                        <Text style={drawer.itemTitle}>سبد خرید فروشگاه</Text>
                        <Icon name='basket' style={drawer.itemIcon}/>
                    </Item>
                    <Item style={drawer.item} onPress={() => Actions.follow()}>
                        <Text style={drawer.itemTitle}>پیگیری سفارش</Text>
                        <Icon name='call' style={drawer.itemIcon}/>
                    </Item>
                    <Item style={drawer.item} onPress={() => Actions.support()}>
                        <Text style={drawer.itemTitle}>پشتیبانی</Text>
                        <Icon name='call' style={drawer.itemIcon}/>
                    </Item>
                    <Item style={drawer.item}>
                        <Text style={drawer.itemTitle}>درباره ما</Text>
                        <Icon name='bookmarks' style={drawer.itemIcon}/>
                    </Item>
                    <Item style={drawer.item} onPress={()=>Actions.complaints()}>
                        <Text style={drawer.itemTitle}>شکایات و پیشنهادات</Text>
                        <Icon name='bookmarks' style={drawer.itemIcon}/>
                    </Item>
                    <Item style={drawer.item}>
                        <Text style={drawer.itemTitle}>راهنمای برنامه</Text>
                        <Icon name='help' style={drawer.itemIcon}/>
                    </Item>
                    <Item style={drawer.item} onPress={()=>Actions.rules()}>
                        <Text style={drawer.itemTitle}>قوانین و تعهدات</Text>
                        <Icon name='help' style={drawer.itemIcon}/>
                    </Item>
                    <Item style={drawer.item} onPress={() => this._putUserLogout()}>
                        <Text style={drawer.itemTitle}>خروج از حساب</Text>
                        <Icon name='backspace' style={drawer.itemIcon}/>
                    </Item>
                </Content>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenBuffet: (tokenapi) => dispatch(tokenBuffet(tokenapi)),
        tokenStore: (tokenapi) => dispatch(tokenStore(tokenapi)),
        reBasketBuffet: (basket, basketCount,PriceAll) => dispatch(reBasketBuffet(basket, basketCount, PriceAll)),
        reBasketMaterial: (basket, basketCount,PriceAll) => dispatch(reBasketMaterial(basket, basketCount,PriceAll)),
        reBasketProduct: (basket, basketCount) => dispatch(reBasketProduct(basket, basketCount)),
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        buffetToken: state.buffet.tokenapi,
        storeToken: state.store.tokenapi,
        buffetBasketCount: state.basket.buffetBasketCount,
        materialBasketCount: state.basket.materialBasketCount,
        productBasketCount: state.basket.productBasketCount,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerLayout);