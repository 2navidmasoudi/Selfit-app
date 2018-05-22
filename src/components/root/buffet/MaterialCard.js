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
    async removeButtonHandle() {
        try {
            this.setState({
                numberbuffet: 0
            });
            let {Material, tokenapi,idbasket} = await this.props;
            let {tokenmember} = await this.props.user;
            let {max,min,ssort,fsort,state} = await this.state;
            let deletedOrder;
            // let FoodOrdered = await getAllMixMaterial(0,state, tokenmember, tokenapi, max, min, ssort, fsort);
            let FoodOrdered = await this.props.materialBasket;

            console.log(FoodOrdered);
            for (i = 0; i < FoodOrdered.length; i++) {
                if (Material.idmaterial == FoodOrdered[i].idmaterial) {
                    //TODO: DeleteMixMaterial
                    deletedOrder= await  deleteMixMaterial(FoodOrdered[i].idmixmaterial,tokenmember,tokenapi);
                    console.log('this is it!', FoodOrdered[i], 'deleted?', deletedOrder);
                    break;
                }
            }
            let {Basket,PriceAll} = await getAllMixMaterial(0,state, tokenmember, tokenapi, max, min, ssort, fsort);
            this.props.reBasketMaterial(Basket,Basket.length,PriceAll);
        } catch (error) {
            console.log(error);
            logError(error, 'removeButtonHandle', 'buffet/MaterialCard', 'deleteOrderBuffet');
        }
    }

    async addButtonHandle() {
        try {
            let {numberbuffet} =  this.state;
            this.setState({
                numberbuffet: numberbuffet + 1
            });
            let {Material, idbasket, tokenapi,} = await this.props;
            let {tokenmember} = await this.props.user;
            let {max,min,ssort,fsort,state} = await this.state;

            let result = await postMixMaterial(idbasket, Material.idmaterial, numberbuffet + 1, tokenmember, tokenapi);
            console.log('postOrderBuffet for', numberbuffet, Material.idmaterial, Material.pricematerial, result);
            let {Basket,PriceAll} = await getAllMixMaterial(0,state, tokenmember, tokenapi, max, min, ssort, fsort);
            this.props.reBasketMaterial(Basket,Basket.length,PriceAll);
        } catch (error) {
            console.log(error);
            logError(error, 'addButtonHandle', 'buffet/MaterialCard', 'postMixMaterial');
        }
    }


    render() {
        const {Material} = this.props;
        const ImgSrc = `http://selfit.ir/Resource/Material/${Material.picmaterial}`;
        return (
            <TouchableOpacity disabled={!Material.active_material_buffet} onPress={() => this.addButtonHandle()}
                              style={{display: Material.active_material_buffet ? 'flex' : 'none'}}>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Left style={{flex: 1}}>
                            <TouchableWithoutFeedback onPress={() => Actions.showImage({uri: ImgSrc})}>
                                {/* <Thumbnail square large source={{uri: ImgSrc }} onPress={()=>Actions.showImage({uri:ImgSrc})}/> */}
                                <Image source={{uri: ImgSrc}}
                                       style={{flex: 1, height: 100, width: null, resizeMode: 'cover'}}
                                       onPress={() => Actions.showImage({uri: ImgSrc})}/>

                            </TouchableWithoutFeedback>
                        </Left>
                        <Right style={{flex: 2}}>
                            <Text style={{textAlign: 'right'}}>
                                {Material.namematerial}
                            </Text>
                            <Text note style={{textAlign: 'right', textAlign: 'right', fontFamily: 'IRANSansMobile'}}>
                                {(Material.pricematerial).toLocaleString('fa')} تومان
                            </Text>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                                <Button bordered={this.state.numberbuffet !== 0}
                                        style={{
                                            marginLeft: 10,
                                            display: this.state.numberbuffet <= 0 ? 'none' : 'flex'
                                        }}
                                        danger onPress={() => this.removeButtonHandle()}>
                                    <Icon name='close-circle'/>
                                </Button>
                                <Text style={{
                                    paddingHorizontal: 10,
                                    textAlign: 'right',
                                    fontFamily: 'IRANSansMobile',
                                    display: this.state.numberbuffet <= 0 ? 'none' : 'flex'
                                }}>
                                    {this.state.numberbuffet.toLocaleString('fa')}
                                </Text>
                                <Button disabled={!Material.active_material_buffet}
                                        success={Material.active_material_buffet}
                                        bordered={Material.active_material_buffet}
                                        onPress={() => this.addButtonHandle()}>
                                    <Icon name='add-circle'/>
                                </Button>
                            </View>
                        </Right>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.buffet.tokenapi,
        buffetid: state.buffet.buffetid,
        idbasket: state.basket.idbasket,
        materialBasket: state.basket.materialBasket,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        reBasketMaterial: (basket, basketCount,PriceAll) => dispatch(reBasketMaterial(basket, basketCount,PriceAll)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MaterialCard);