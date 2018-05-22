import React, {Component} from 'react';
import {Image, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Card, CardItem, Icon, Left, Right, Text} from 'native-base';
import moment from 'moment-jalaali';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {reBasketBuffet} from '../../../redux/actions';
import {logError} from '../../../services/log';
import {deleteOrderBuffet, getAllOrder, postOrderBuffet} from '../../../services/orderBuffet';

class FoodCard extends Component {
    async handleRemove() {
        try {
            let{tokenmember} = this.props.user;
            let {tokenapi} = this.props;
            let {idbasketbuffet} = this.props.food;
            let deletedOrder = await deleteOrderBuffet(idbasketbuffet, tokenmember, tokenapi);
            console.log(deletedOrder,'deletedOrder?');
            let {Basket,PriceAll} = await getAllOrder(true,false, tokenmember, tokenapi, 30, 0);
            this.props.reBasketBuffet(Basket,Basket.length,PriceAll);
        }catch (e) {
            console.log(e)
            this.props.reBasketBuffet([],0);

        }
    }
    render() {
        const {food} = this.props;
        // const m = moment(`${MenuFood.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
        // const jM = m.format('jYYYY/jMM');
        // const ImgYear = m.jYear();
        // const ImgMonth = m.jMonth() + 1;
        // const ImgSrc = `${MenuFood.httpserver}${MenuFood.pathserver}${ImgYear}/${ImgMonth}/${MenuFood.picmenufood}`;
        return (
            <Card >
                <CardItem header style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center'}}>{food.namemenufood}</Text>
                </CardItem>
                <CardItem style={{flex: 1}}>
                    <Left style={{flex: 1}}>
                        <Button  onPress={this.handleRemove.bind(this)}>
                            <Icon name="close"/>
                        </Button>
                    </Left>
                    <Text
                        style={{textAlign: 'center'}}>تعداد: {food.numbermenufood.toLocaleString('fa')}</Text>
                    <Right style={{flex: 1}}>
                        <Text
                            style={{textAlign: 'right'}}>قیمت: {food.pricemenufood.toLocaleString('fa')}</Text>
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
        buffetid: state.buffet.buffetid
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        reBasketBuffet:(basket,basketCount,price)=>dispatch(reBasketBuffet(basket,basketCount,price)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodCard);