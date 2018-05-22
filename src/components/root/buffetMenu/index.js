import React , { Component } from 'react';
import { View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import { Spinner , Header, Button, Item, Icon,Input ,Left, Body, Container , Grid , Row, Picker ,Form, Col } from 'native-base';
import { connect } from 'react-redux';
import { getAllGym, getSearchGym } from '../../../services/gym';
import FoodCard from './FoodCard';
import AppHeader from '../../header';
import { receiveMenuFood, tokenBuffet, selectBuffet } from '../../../redux/actions/index';
import { getSearchMenuFood, getAllMenuFood, getFoodCategory } from '../../../services/MenuFood';
import { logError } from '../../../services/log';
import { putCheckToken } from '../../../services';
import { form , header } from '../../../assets/styles/index';
import { Actions } from 'react-native-router-flux';
import { getSingleIDMember } from '../../../services/buffet';

class FoodList extends Component {
    componentWillMount(){
        
        let {tokenmember,tokenapi} = this.props.user;
        putCheckToken(tokenmember,tokenapi);
        this.setInfo();
    }
    async setInfo(){
        await this.props.tokenBuffet('selfit.buffet');
        let buffetInfo = await this._getSingleIDMember();
        await this.props.selectBuffet(buffetInfo.idbuffet);
        console.log('buffet for this user:', buffetInfo.namebuffet,'buffetid from props:',this.props.buffetid);
    }
    async _getSingleIDMember(){
        try {
            
            let {tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let BuffetKeeperInfo = await getSingleIDMember(tokenmember,tokenapi);
            return BuffetKeeperInfo;
            // this.props.selectBuffet(BuffetKeeperInfo.idbuffet);
        } catch (error) {
            console.log(error);
            logError(error,'_getSingleIDMember','BuffetMenu/index','getSingleIDMember');
        }
    }
    render(){
        return(
            <Container>
                <AppHeader rightTitle="منو بوفه" backButton={"flex"}/>
                <View style={{flex:1, padding:10}}>
                    <View style={{flex:3}}>

                    </View>
                    <View style={{flex:1,justifyContent:'flex-end'}}>
                        <Button full style={[form.submitButton , {marginTop : 10}]} onPress={()=>Actions.addFood()}>
                            <Text style={{color:'white',fontSize:16,fontFamily:'IRANSansMobile'}}>اضافه به منو آماده</Text>
                        </Button>
                        <Button full style={[form.submitButton , {marginTop : 10}]} onPress={()=>Actions.addMaterial()}>
                            <Text style={{color:'white',fontSize:16,fontFamily:'IRANSansMobile'}}>اضافه به منو انتخابی</Text>
                        </Button>
                        <Button full style={[form.submitButton , {marginTop : 10}]} onPress={()=>Actions.menuList()}>
                            <Text style={{color:'white',fontSize:16,fontFamily:'IRANSansMobile'}}>لیست غذا های بوفه</Text>
                        </Button>
                    </View>
                </View>


                        {/* <Row>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                        </Row> */}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    user: state.user,
    tokenapi: state.buffet.tokenapi,
    buffetid: state.buffet.buffetid,
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        tokenBuffet:(tokenapi)=>dispatch(tokenBuffet(tokenapi)),
        selectBuffet:(buffetid)=>dispatch(selectBuffet(buffetid)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FoodList);