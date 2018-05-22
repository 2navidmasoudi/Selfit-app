import React , { Component } from 'react';
import {
    Container,
    Text,
    Content
} from 'native-base';
import AppHeader from '../../header';
import { connect } from 'react-redux';
import { putCheckToken } from '../../../services/index';
import { logError } from '../../../services/log';
import { getAllDoctor } from '../../../services/doctor';
import { Base64 } from 'js-base64';
class Doctor extends Component {
    componentWillMount(){
        let {tokenmember,tokenapi} = this.props.user;
        putCheckToken(tokenmember,tokenapi);
        this.getInfo();
    }
    async getInfo(){
        try {
            await this._getAllDoctor();
        } catch (error) {
            logError(error,'getInfo','root/Doctor','getInfo')
        }
    }
    async _getAllDoctor(){
        try {
            let {tokenmember} = this.props.user;
            let tokenapi = 'selfit.public';
            let DoctorList = await getAllDoctor(tokenmember,tokenapi,10,0,true,0);
            console.log(DoctorList);
            let descDoctor= await Base64.decode(DoctorList[0].descdoctor);
            let nameDoctor= await Base64.decode(DoctorList[0].namedoctor);
            console.log('Name: '+nameDoctor+', Description: '+descDoctor);
            
        } catch (error) {
            logError(error,'_getAllDoctor','Root/Doctor','getAllDoctor')
        }
    }
    render() {
        return(
            <Container>
                <AppHeader rightTitle="دکتر" backButton={"flex"}/>
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
export default connect(mapStateToProps,mapDispatchToProps)(Doctor);