import React, {Component} from 'react';
import {Body, Container, Content, Header, Left, Switch, Text, Spinner} from 'native-base';
import {Alert, FlatList} from 'react-native';
import AppHeader from '../../header';
import {connect} from 'react-redux';
import {putCheckToken} from '../../../services/index';
import {
    getOrderBuffet,
    tokenBuffet
} from '../../../redux/actions';
import {getSingleBuffet, putActiveBuffet} from '../../../services/buffet';
import {logError} from '../../../services/log';
import {getOrderBuffetAll} from "../../../services/orderBuffet";
import OrderCard from './orderCard';

class BuffetKeeper extends Component {
    state = {
        Active: true,
        order: [],
    };


    componentWillMount() {
        this.setInfo();
        let {tokenmember, tokenapi} = this.props.user;
        putCheckToken(tokenmember, tokenapi);
    }

    async setInfo() {
        await this.props.tokenBuffet('selfit.buffet');
        await this.checkActiveBuffet();
        await this._getOrderBuffet();
    }

    async _getSingleBuffet() {
        try {
            let {tokenapi, buffetid} = await this.props;
            let {tokenmember} = await this.props.user;
            let buffetInformation = await getSingleBuffet(buffetid, tokenmember, tokenapi);
            return buffetInformation;
        } catch (err) {
            console.log(err);
            logError(err, 'getSingleBuffet', 'root/buffetKeeper/index', '_getSingleBuffet');
        }
    }

    async _getOrderBuffet() {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi, buffetid} = await this.props;
            let order = await getOrderBuffetAll(0,0,0,buffetid,tokenmember,tokenapi,30,0,true,0);
            console.log(order);
            this.props.getOrderBuffet(order);
        } catch (e) {
            console.log(e);
        }
    }

    async checkActiveBuffet() {
        try {
            let buffetInformation = await this._getSingleBuffet();
            let Active = await buffetInformation.activebuffet;
            this.setState({Active});
        } catch (err) {
            console.log(err);
            logError(err, 'putActiveBuffet', 'root/buffetKeeper/index', '_putActiveBuffet77');
        }
    }

    async _putActiveBuffet(Active) {
        try {
            let {tokenapi, buffetid} = this.props;
            let {tokenmember} = this.props.user;
            let result = await putActiveBuffet(buffetid, Active, tokenmember, tokenapi);
            if (result === 1) {
                let buffetInformation = await this._getSingleBuffet();
                let Active = buffetInformation.activebuffet;
                if (Active) {
                    Alert.alert('فعالیت بوفه', 'بوفه فعال شد.', [{text: 'باشه'}]);
                } else {
                    Alert.alert('فعالیت بوفه', 'بوفه تعطیل شد.', [{text: 'باشه'}]);
                }
                this.setState({Active});
            } else {
                alert('خطا در ارتباط با سرور');
            }
        } catch (err) {
            console.log(err);
            logError(err, 'putActiveBuffet', 'root/buffetKeeper/index', '_putActiveBuffet77');
        }
    }

    render() {
        const YesOrNo = this.state.Active ? 'بله (سفارش می پذیرم)' : 'خیر (بوفه تعطیل است)';
        const color = this.state.Active ? 'blue' : 'red';
        return (
            <Container>
                <AppHeader rightTitle="دریافت سفارش" backButton={"flex"}/>
                <Header style={{justifyContent: 'center', backgroundColor: '#0F9D7A'}} androidStatusBarColor='#313131'
                        iosBarStyle="light-content">
                    <Left style={{flex: 1, justifyContent: 'center'}}>
                        <Switch
                            onTintColor='#313131'
                            thumbTintColor='#313131'
                            value={this.state.Active}
                            onValueChange={(value) => this.handleSwitch(value)}/>
                    </Left>
                    <Body style={{flex: 3, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'right', color: 'white'}}>فعالیت بوفه: <Text
                        style={{color}}>{YesOrNo}</Text></Text>
                    </Body>
                </Header>
                <Content padder>
                    <FlatList
                        data={this.props.orderList}
                        renderItem={(item) => this.renderItem(item)}
                        keyExtractor={(item) => item.idfactorbuffet}
                        scrollEnabled={false}
                        ListEmptyComponent={() => <Spinner/>}
                        // onRefresh={this.handleRefresh.bind(this)}
                    />
                </Content>
            </Container>
        )
    }

    handleSwitch(Active) {
        this._putActiveBuffet(Active)
    }

    renderItem({item}) {
        return <OrderCard order={item}/>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenBuffet: (tokenapi) => dispatch(tokenBuffet(tokenapi)),
        getOrderBuffet: (orderBuffet) => dispatch(getOrderBuffet(orderBuffet)),

    }
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.buffet.tokenapi,
        buffetid: state.buffet.buffetid,
        idOrderBuffet: state.basket.idOrderBuffet,
        idOrderMaterial: state.basket.idOrderMaterial,
        orderList: state.basket.orderBuffet,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(BuffetKeeper);