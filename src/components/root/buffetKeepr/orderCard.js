import React, {Component} from 'react';
import {Image, WebView, View, TouchableWithoutFeedback} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Grid,
    Row
} from 'native-base';
import moment from 'moment-jalaali';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

class OrderCard extends Component {
    render() {
        const {order} = this.props;
        return (
            <TouchableWithoutFeedback onPress={() => this.onPressHandle(order)}>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Left style={{flex: 1}}>
                        </Left>
                        <Right style={{flex: 1}}>
                            <Text style={{
                                marginRight: 10,
                                textAlign: 'right',
                                fontFamily: 'IRANSansMobile'
                            }}>{order.namefamilymember}</Text>
                            <Text style={{marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile'}}
                                  numberOfLines={1}
                                  note>{order.finalpricefactorbuffet.toLocaleString('fa')} تومان</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Text>برای مشاهده سفارش کلیک کنید!</Text>
                    </CardItem>
                </Card>
            </TouchableWithoutFeedback>
        );
    }

    onPressHandle(order) {
        console.log(order);
        Actions.orderDetail({order});
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);