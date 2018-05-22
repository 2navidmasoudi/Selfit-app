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
class Couch extends Component {
    componentWillMount() {
        let {tokenmember, tokenapi} = this.props.user;
        putCheckToken(tokenmember, tokenapi);
    }

    render() {
        return (
            <Container>
                <AppHeader rightTitle="مربیان" backButton={"flex"}/>
                <Content>
                    <Tabs locked tabBarPosition="top">
                        <Tab heading="بر اساس نظرات"
                             textStyle={TabsStyle.text}
                             activeTabStyle={TabsStyle.activeTab}
                             tabStyle={TabsStyle.notActiveTabs}>
                            <List1/>
                        </Tab>
                        <Tab heading="بر اساس رتبه"
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
    return {}
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Couch);