import React from 'react';
import {Button, Card, CardItem, Container, Content, Input, Item, Left, Right, Spinner, Text, View} from 'native-base';
import {form} from '../../../assets/styles/index';
import AppHeader from '../../header';
import {connect} from 'react-redux';
import {logError} from '../../../services/log';
import {getAllOrder} from '../../../services/orderBuffet';
import {Actions} from 'react-native-router-flux';

// Geocoder.setApiKey('AIzaSyBlgHjeMbqK3xEZfh6HK2o8RdjhhgTOh0s');
class BuffetOrder extends React.Component {
    state = {
        FoodList: [],
        ready: false,
        descfactor: null,
    };


    componentWillMount() {
        this._getAllOrder();
        console.log(this.props);
    }

    async _getAllOrder() {
        try {
            let {tokenmember} = this.props.user;
            let {tokenapi, buffetid} = this.props;
            let AllFood = await getAllOrder(true, tokenmember, tokenapi, 20, 0);
            console.log('foodOrdered:', AllFood);
            this.setState({FoodList: AllFood, ready: true});
            console.log(this.state);


        } catch (err) {
            console.log(err);
            logError(err, 'getAllOrder', 'Buffet/BuffetOrder', '54');
        }
    }

    changeDescription(descfactor) {
        this.setState({descfactor})
    }

    render() {

        return (
            <Container>
                <AppHeader rightTitle="سفارش نهایی" backButton="flex"/>

                <Content padder>
                    <Text style={[form.submitText, {textAlign: 'center', marginVertical: 5}]}>سفارش خود را بررسی
                        کنید.</Text>
                    <Text style={[form.submitText, {textAlign: 'right', marginHorizontal: 15}]}>ارسال سفارش
                        به: {Base64.decode(this.props.address.titleaddressmember)}</Text>
                    {
                        this.state.ready === false ? <Spinner/> :
                            this.state.FoodList.map((food, i) => (
                                <Card key={i}>
                                    <CardItem header style={{flex: 1, justifyContent: 'center'}}>
                                        <Text style={{textAlign: 'center'}}>{food.namemenufood}</Text>
                                    </CardItem>
                                    <CardItem style={{flex: 1}}>
                                        <Left style={{flex: 1}}>
                                            <Text
                                                style={{textAlign: 'left'}}>مجموع: {(food.numbermenufood * food.pricemenufood).toLocaleString('fa')}</Text>
                                        </Left>
                                        <Text
                                            style={{textAlign: 'center'}}>تعداد: {food.numbermenufood.toLocaleString('fa')}</Text>
                                        <Right style={{flex: 1}}>
                                            <Text
                                                style={{textAlign: 'right'}}>قیمت: {food.pricemenufood.toLocaleString('fa')}</Text>
                                        </Right>
                                    </CardItem>
                                </Card>
                            ))}
                    <View style={{marginTop: 5}}>
                        <Text>قیمت نهایی: {this.props.totalPrice.toLocaleString('fa')} تومان</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                        <Item regular>
                            <Input

                                placeholder='کم نمک، بدون روغن و ...'
                                multiline={true}
                                onChangeText={(text) => this.changeDescription(text)}
                            />
                            <Text style={{marginRight: 5}}>توضیحات:</Text>
                        </Item>

                    </View>
                </Content>
                <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <Button block disabled={!this.state.ready}
                            style={[form.submitButton, {margin: 10, marginBottom: 20}]}
                            onPress={() => Actions.addressRoot({LeadFrom:'buffetBasket'})}>
                        <Text style={form.submitText}>انتخاب آدرس</Text>
                    </Button>
                </View>
            </Container>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        buffetid: state.buffet.buffetid,
        tokenapi: state.buffet.tokenapi,
        totalPrice: state.buffet.totalPrice,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BuffetOrder);