import React , { Component } from 'react';
import {
    Container,
    Text,
    Content,
    Button,
} from 'native-base';
import AppHeader from '../../header';
import { connect } from 'react-redux';
import { putCheckToken } from '../../../services/index';
import {receiveGym, tokenGym} from "../../../redux/actions";
import {getSingleGym} from "../../../services/gym";
import HTMLView from "react-native-htmlview";
import {Actions} from 'react-native-router-flux';

class MyGym extends Component {
    componentWillMount(){
        let {tokenmember,tokenapi} = this.props.user;
        putCheckToken(tokenmember,tokenapi);
        this.getInfo();
    }

    async getInfo() {
        await this.props.tokenGym('selfit.gym');
        await this._getSingLeGym();
    }

    async _getSingLeGym() {
        try {
            //TODO: gymID
            let {tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let gymInfo = await getSingleGym(79,tokenmember,tokenapi);
            console.log(gymInfo,'gymInfo');
            this.props.receiveGym(gymInfo,0);

        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const {gym} = this.props;
        const html = `<div>${gym.descgym}</div>`
        return(
            <Container>
                <AppHeader rightTitle="باشگاه من" backButton={"flex"}/>
                <Content padder>
                    <Text>اسم: {gym.namegym}</Text>
                    <Text>آدرس: {gym.addressgym}</Text>
                    <Text>توضیحات: </Text>
                    <HTMLView
                        value={html}
                        stylesheet={{flex: 1, textAlign: 'right'}}/>
                    <Text>تلقن باشگاه: {gym.telgym}</Text>
                    <Text>شهریه باشگاه: {gym.tuitiongym}</Text>
                    <Text>عرض جغرافیایی: {gym.latgym}</Text>
                    <Text>طول جغرافیایی: {gym.longgym}</Text>
                    <Text>فعالیت باشگاه: {gym.activegym?'فعال':'غیر فعال'}</Text>
                    <Text>ظرفیت باشگاه: {gym.numbertuitiongym}</Text>
                    <Text>تعداد بازدید: {gym.visitgym}</Text>
                </Content>
                <Button full onPress={this.onPressHandler.bind(this)}>
                    <Text>ویرایش باشگاه</Text>
                </Button>
            </Container>
        )
    }
    onPressHandler(){
        Actions.editGym();
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        tokenGym: (tokenapi) => dispatch(tokenGym(tokenapi)),
        receiveGym: (gym, min) => dispatch(receiveGym(gym, min)),


    }
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.gym.tokenapi,
        gym: state.gym.GymList,

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(MyGym);