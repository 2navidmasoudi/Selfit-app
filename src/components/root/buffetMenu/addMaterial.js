import React , { Component } from 'react';
import { View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import { Spinner , Header, Button, Item, Icon,Input ,Left, Body, Container , Grid , Row, Picker ,Form } from 'native-base';
import { connect } from 'react-redux';
import { getAllGym, getSearchGym } from '../../../services/gym';
import MaterialCard from './MaterialCard';
import AppHeader from '../../header';
import { receiveMenuFood, tokenBuffet, receiveMaterial } from '../../../redux/actions/index';
import { logError } from '../../../services/log';
import { putCheckToken } from '../../../services';
import Loader from '../../loader';
import { getAllMaterial } from '../../../services/orderMaterial';
class AddMaterial extends Component {
    constructor(){
        super();
        this.state = {
            max:10,
            ssort: true,
            fsort:0,
            loading:false,
            refreshing: false,
        }
    }
    componentWillMount(){
        this.setInfo();
        let {tokenmember,tokenapi} = this.props.user;
        putCheckToken(tokenmember,tokenapi);
    }
    async setInfo(){
        await this.props.tokenBuffet('selfit.buffet');
        // await this._getFoodCategory();
        await this._getAllMaterial();
        
    }
    render(){
        return(
            <Container>
                {/* <Loader
                    loading={this.state.loading} /> */}
                <AppHeader rightTitle="منو آماده" backButton={"flex"}/>
                <FlatList
                    data={this.props.Material}
                    renderItem={(item)=>this.renderMaterial(item)}
                    keyExtractor={(item)=>item.idmaterial}
                    ListEmptyComponent={()=><Spinner/>}
                    // onRefresh={this.handleRefresh.bind(this)}
                    // refreshing={this.state.refreshing}
                    // onEndReachedThreshold={0.5}
                    // ListFooterComponent={this.renderFooter.bind(this)}
                />
            </Container>
        )
    }
    async _getAllMaterial(){
        try {
            this.setState({loading:true});
            let {max,ssort,fsort} = await this.state;
            let { tokenmember } = await this.props.user;
            let { tokenapi } = await this.props;
            let MaterialList = await getAllMaterial(tokenmember,tokenapi,30,0,ssort,fsort);
            console.log(MaterialList);
            await this.props.receiveMaterial(MaterialList);
            this.setState({loading:false,refreshing:false});
        } catch (error) {
            console.log(error);
            logError(error,'GetAllMaterial','BuffetKeeper/FoodList','_getAllMaterial');
        }
    }
    renderMaterial({item}) {
        return <MaterialCard food={item}/>
    }
    // handleRefresh(){
    //     this.setState({refreshing:true});
    //     if (!this.state.searchMode) {
    //         this._getAllMaterial();
    //     } else {
    //         this._getSearchMenuFood();
    //     }
    // }
    // renderFooter(){
    //     if(!this.state.loading) return null;
    //     else
    //     return <Spinner/>
    // }
}

const mapStateToProps = (state) => {
    return {
    user: state.user,
    tokenapi: state.buffet.tokenapi,
    Material: state.buffet.Material,
    }
} 
  
const mapDispatchToProps = (dispatch) => {
    return {
        receiveMaterial: (Material)=>dispatch(receiveMaterial(Material)),
        tokenBuffet: (tokenapi)=>dispatch(tokenBuffet(tokenapi)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddMaterial);