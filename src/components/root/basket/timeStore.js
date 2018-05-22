import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, Container, Content, Footer, FooterTab, Icon, Input, Item, Label} from 'native-base';
import AppHeader from "../../header";
import {setDescProduct, setProductIDAccess, setRoad, tokenStore} from "../../../redux/actions";
import {logError} from "../../../services/log";
import {Actions} from "react-native-router-flux";
import {SignStyle} from "../../../assets/styles/sign";
import {getTimeAccessStore, putTimeFactor} from "../../../services/orderProduct";
import {ButtonGroup} from "react-native-elements";


class TimeStore extends Component {

    componentWillMount() {
        this.getInfo();
    }

    state = {
        active: true,
        min: 0,
        max: 30,
        fsort: 0,
        ssort: false,
        selected: false,
        TimeAccess:null,
        descProducet:'',
    };


    async getInfo() {
        await this.props.tokenStore('selfit.store');
        await this._getTimeAccessStore();
    }

    async _getTimeAccessStore() {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi} = await this.props;
            let {max, min, ssort} = await this.state;
            let TimeAccess = await getTimeAccessStore(tokenmember, tokenapi, max, min, ssort);
            console.log(TimeAccess);
            this.setState({TimeAccess})
        } catch (e) {
            console.log(e);
        }
    }
    async _putTimeFactor(idtimefactor){
        try {
            this.props.setProductIDAccess(idtimefactor);
            this.setState({selected:true});
        } catch (e) {
            console.log(e);
        }
    }
    handleFooterButton() {
        this.props.setDescProduct(this.state.descProducet);
        this.props.setRoad('Store');
        Actions.addressRoot({LeadFrom: 'Store'})
    }
    render() {
        const {
            item, formInputText
        } = SignStyle;
        const FooterComponent = ((this.props.Count !== 0) && this.state.selected) ?
            <Footer>
                <FooterTab>
                    <Button
                        style={{
                            // paddingTop: 10,
                            backgroundColor: '#0F9D7A'
                        }}
                        onPress={this.handleFooterButton.bind(this)}>
                        {/*<Badge><Text>{(this.props.Count1 + this.props.Count2).toLocaleString('fa')}</Text></Badge>*/}
                        {/*<Icon name="basket" style={{color: 'white'}}/>*/}

                        <Text style={{
                            fontFamily: 'IRANSansMobile',
                            // fontSize: 18,
                            color: 'white',
                            // paddingTop: 12
                        }}>انتخاب آدرس</Text>
                    </Button>
                </FooterTab>
            </Footer> :null ;
        return (
            <Container>
                <AppHeader rightTitle="سبد محصول" backButton="flex"/>
                <Content padder>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'center'}}>انتخاب زمان ارسال</Text>
                        <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',alignContent:'center',margin:10}}>
                        {this.state.TimeAccess &&
                        this.state.TimeAccess.map((c)=>(
                            <Button key={c.idtimefactor} light={c.activetimefactor} disabled={!c.activetimefactor} onPress={()=>this._putTimeFactor(c.idtimefactor)}>
                                <Text>
                                    {c.fromdatehour} الی {c.todatehour.toLocaleString('fa')}
                                </Text>
                            </Button>
                        ))}
                        </View>
                    </View>
                    <Item style={[item, {flex: 1}]}>
                        <Icon active name='clipboard'/>
                        <Input style={formInputText} value={this.state.descgym}
                               multiline={true}
                               onChangeText={(descProducet) => this.setState({descProducet})}/>
                        <Label>توضیحات</Label>
                    </Item>
                </Content>
                {FooterComponent}
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenStore: (tokenapi) => dispatch(tokenStore(tokenapi)),
        setRoad: (roadTo) => dispatch(setRoad(roadTo)),
        setDescProduct: (descProducet) => dispatch(setDescProduct(descProducet)),
        setProductIDAccess: (idtimefactor) => dispatch(setProductIDAccess(idtimefactor)),
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.store.tokenapi,
        Count: state.basket.productBasketCount,
        totalPrice: state.basket.PriceAllProduct,
        productBasket: state.basket.productBasket,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeStore);