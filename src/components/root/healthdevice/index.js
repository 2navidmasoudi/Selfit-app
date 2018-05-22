import React , { Component } from 'react';
import {
    Container,
    Text,
    Content
} from 'native-base';
import AppHeader from '../../header';
import { connect } from 'react-redux';
import { putCheckToken } from '../../../services/index';

class HealthDevice extends Component {
    componentWillMount(){
        let {tokenmember,tokenapi} = this.props.user;
        putCheckToken(tokenmember,tokenapi);
    }
    render() {
        return(
            <Container>
                <AppHeader rightTitle="دستگاه سلامت" backButton={"flex"}/>
                <Content padder>
                    <Text>درحال بازسازی!</Text>
                </Content>
            </Container>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HealthDevice);