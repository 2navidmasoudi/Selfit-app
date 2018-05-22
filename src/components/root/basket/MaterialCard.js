import React, {Component} from 'react';
import {TouchableWithoutFeedback, TouchableOpacity, Image, View} from 'react-native';
import {Button, Card, CardItem, Icon, Left, Right, Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {logError} from '../../../services/log';
import {
    deleteMixMaterial,
    getAllMixMaterial,
    postMixMaterial
} from "../../../services/orderMaterial";
import {reBasketMaterial} from "../../../redux/actions";
import {deleteOrderBuffet, getAllOrder} from "../../../services/orderBuffet";

class MaterialCard extends Component {
    state = {
        ssort:false,
        fsort:0,
        max:30,
        min:0,
        state:false,
        numberbuffet: 0,
    };
//TODO: ADD AND REMOVE NOT WORKING FOR MATERIAL
    async handleRemove() {
        try {
            let{tokenmember} = this.props.user;
            let {tokenapi,food} = this.props;
            let {idbasketbuffet} = this.props.food;
            let {max,min,ssort,fsort,state} = await this.state;
            let deletedOrder = await deleteMixMaterial(food.idmixmaterial,tokenmember,tokenapi);
            console.log(deletedOrder,'deletedOrder?');
            let {Basket,PriceAll} = await getAllMixMaterial(0,state, tokenmember, tokenapi, max, min, ssort, fsort);
            this.props.reBasketMaterial(Basket,Basket.length,PriceAll);
        }catch (e) {
            console.log(e)
            this.props.reBasketMaterial([],0);

        }
    }


    render() {
        const {food} = this.props;
        // const ImgSrc = `http://selfit.ir/Resource/Material/${Material.picmaterial}`;
        return (
            <Card >
                <CardItem header style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center'}}>{food.namematerial}</Text>
                </CardItem>
                <CardItem style={{flex: 1}}>
                    <Left style={{flex: 1}}>
                        <Button  onPress={this.handleRemove.bind(this)}>
                            <Icon name="close"/>
                        </Button>
                    </Left>
                    <Text
                        style={{textAlign: 'center'}}>تعداد: {food.numbermaterial.toLocaleString('fa')}</Text>
                    <Right style={{flex: 1}}>
                        <Text
                            style={{textAlign: 'right'}}>قیمت: {food.pricematerial.toLocaleString('fa')}</Text>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.buffet.tokenapi,
        buffetid: state.buffet.buffetid,
        idbasket: state.basket.idbasket,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        reBasketMaterial: (basket,basketCount,price) => dispatch(reBasketMaterial(basket,basketCount,price)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MaterialCard);