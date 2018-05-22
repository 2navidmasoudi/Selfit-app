import React, {Component} from 'react';
import {
    Container,
    Text,
    Content,
    Button,
    Form,
    Input,
    Item,
    Icon,
    Label,
} from 'native-base';
import AppHeader from '../../header';
import {connect} from 'react-redux';
import {putCheckToken} from '../../../services/index';
import {receiveGym, tokenGym} from "../../../redux/actions";
import {getSingleGym, putGym} from "../../../services/gym";
import HTMLView from "react-native-htmlview";
import {Actions} from 'react-native-router-flux';
import {SignStyle} from "../../../assets/styles/sign";

class EditGym extends Component {
    state = {
        namegym: null,
        descgym: null,
        picgym: null,
        tuitiongym: null,
        addressgym: null,
        numbertuitiongym: null,
        latgym: null,
        longgym: null,
        active: null,
        telgym: null,
    };

    componentWillMount() {
        let {tokenmember, tokenapi} = this.props.user;
        putCheckToken(tokenmember, tokenapi);
        this.getInfo();
    }

    async onPressHandler() {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi} = await this.props;
            let {idgym} = await this.props.gym;
            let {
                namegym,
                descgym,
                picgym,
                tuitiongym,
                addressgym,
                numbertuitiongym,
                latgym,
                longgym,
                active,
                telgym
            } = await this.state;
            let json = await putGym(idgym, namegym, descgym, picgym, Number(tuitiongym), Number(numbertuitiongym), Number(latgym), Number(longgym), active, telgym, addressgym, tokenmember, tokenapi);
            console.log('result: ', json);
            if (json) {
                await this._getSingLeGym();
                Actions.pop({refresh: {refresh: Math.random()}});
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getInfo() {
        await this.props.tokenGym('selfit.gym');
        await this._getSingLeGym();
        await this.setState({
            namegym: this.props.gym.namegym,
            addressgym: this.props.gym.addressgym,
            descgym: this.props.gym.descgym,
            picgym: this.props.gym.picgym,
            tuitiongym: this.props.gym.tuitiongym.toString(),
            numbertuitiongym: this.props.gym.numbertuitiongym.toString(),
            latgym: this.props.gym.latgym.toString(),
            longgym: this.props.gym.longgym.toString(),
            active: this.props.gym.active,
            telgym: this.props.gym.telgym,
        })
    }

    async _getSingLeGym() {
        try {
            //TODO: gymID
            let {tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let gymInfo = await getSingleGym(79, tokenmember, tokenapi);
            console.log(gymInfo, 'gymInfo');
            this.props.receiveGym(gymInfo, 0);

        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const {
            item, formInputText, formStyle, submitButton,
            submitButtonText, selectViewStyle, formSelectStyle, listSelectStyle,
        } = SignStyle;
        const {gym} = this.props;
        const html = `<div>${gym.descgym}</div>`
        return (
            <Container>
                <AppHeader rightTitle="باشگاه من" backButton={"flex"}/>
                <Content padder>


                    <Text style={{textAlign: 'center', fontSize: 20, margin: 10}}>ویرایش باشگاه</Text>
                    <Form style={formStyle}>
                        <Item style={item}>
                            {/*<Icon active name='person'/>*/}

                            <Input style={formInputText} value={this.state.namegym}
                                   onChangeText={(namegym) => this.setState({namegym})}/>
                            <Label>اسم</Label>

                        </Item>
                        <Item style={item}>
                            {/*<Icon active name='contacts'/>*/}

                            <Input style={formInputText} value={this.state.addressgym}
                                   onChangeText={(addressgym) => this.setState({addressgym})}/>
                            <Label>آدرس</Label>

                        </Item>
                        <Item style={item}>
                            {/*<Icon active name='contacts'/>*/}

                            <Input style={formInputText} multiline={true}
                                   value={this.state.descgym} onChangeText={(descgym) => this.setState({descgym})}/>
                            <Label>توضیحات</Label>

                        </Item>
                        <Item style={item}>
                            {/*<Icon active name='contacts'/>*/}

                            <Input style={formInputText} value={this.state.telgym}
                                   onChangeText={(telgym) => this.setState({telgym})}/>
                            <Label>تلقن</Label>

                        </Item>

                        <Item style={item}>
                            {/*<Icon active name='contacts'/>*/}

                            <Input style={formInputText} value={this.state.tuitiongym}
                                   onChangeText={(tuitiongym) => this.setState({tuitiongym})}/>
                            <Label>شهریه</Label>

                        </Item>
                        <Item style={item}>
                            {/*<Icon active name='contacts'/>*/}

                            <Input style={formInputText} value={this.state.latgym}
                                   onChangeText={(latgym) => this.setState({latgym})}/>
                            <Label>عرض</Label>

                        </Item>
                        <Item style={item}>
                            {/*<Icon active name='contacts'/>*/}

                            <Input style={formInputText} value={this.state.longgym}
                                   onChangeText={(longgym) => this.setState({longgym})}/>
                            <Label>طول</Label>

                        </Item>
                        <Item style={item}>
                            {/*<Icon active name='contacts'/>*/}

                            <Input style={formInputText} value={this.state.numbertuitiongym}
                                   onChangeText={(numbertuitiongym) => this.setState({numbertuitiongym})}/>
                            <Label>ظرفیت</Label>

                        </Item>

                    </Form>
                </Content>
                <Button full onPress={this.onPressHandler.bind(this)}>
                    <Text>ثبت و تائید</Text>
                </Button>
            </Container>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(EditGym);