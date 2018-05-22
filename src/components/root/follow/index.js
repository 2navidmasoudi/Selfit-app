import React, {Component} from 'react';
import {
    Container,
    Text,
    Content, Tab, Tabs
} from 'native-base';
import AppHeader from '../../header';
import {connect} from 'react-redux';
import {putCheckToken} from '../../../services/index';
import {TabsStyle} from "../../../assets/styles/gym";
import List1 from './List1';
import List2 from './List2';
import {tokenBuffet} from "../../../redux/actions";
class Follow extends Component {

    componentWillMount() {
        let {tokenmember, tokenapi} = this.props.user;
        putCheckToken(tokenmember, tokenapi);
        this.props.tokenBuffet('selfit.buffet');
    }

    render() {
        return (
            <Container>
                <AppHeader rightTitle="پیگیری سفارش" backButton={"flex"}/>
                <Content>
                    <Tabs locked tabBarPosition="top">
                        <Tab heading="پراخت نشده"
                             textStyle={TabsStyle.text}
                             activeTabStyle={TabsStyle.activeTab}
                             tabStyle={TabsStyle.notActiveTabs}>
                            <List1/>
                        </Tab>
                        <Tab heading="پرداخت شده"
                             textStyle={TabsStyle.text}
                             activeTabStyle={TabsStyle.activeTab}
                             tabStyle={TabsStyle.notActiveTabs}>
                            <List2/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenBuffet:(tokenapi) => dispatch(tokenBuffet(tokenapi)),

    }
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Follow);