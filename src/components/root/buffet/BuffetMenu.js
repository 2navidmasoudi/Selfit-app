import React, {Component} from 'react';
import {FlatList, ImageBackground, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {
    Badge,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Footer,
    FooterTab,
    Icon,
    Left,
    Right,
    Spinner,
    Tab,
    TabHeading,
    Tabs,
    Text
} from 'native-base';
import moment from 'moment-jalaali';
import {Actions} from 'react-native-router-flux';
import AppHeader from '../../header';
import {getMenuFood} from '../../../services/buffet';
import {logError} from '../../../services/log';
import {getFoodCategory} from '../../../services/MenuFood';
import {
    getAllBasketMaterial,
    getAllBuffetMaterial,
    getAllDish,
    postBasketMaterial
} from '../../../services/orderMaterial';
import {connect} from 'react-redux';
import {
    receiveMaterial,
    receiveMenuFood,
    selectBuffet, setIDBasket,
    tokenBuffet
} from "../../../redux/actions";
import FoodCard from "./FoodCard";
import MaterialCard from "./MaterialCard";
import {TabsStyle} from "../../../assets/styles/gym";
import {checkOrderBuffet, deleteOrderAll} from "../../../services/orderBuffet";

moment.loadPersian({dialect: 'persian-modern'});

class BuffetMenu extends Component {
    state = {
        ImgSrc: null,
        MenuFood: [],
        CountReady: false,
        totalPrice: 0,
        iddish: null,
        max: 30,
        min: 0,
        ssort: true,
        fsort: 0,
    };

    componentWillMount() {
        this.getInfo();
    }

    async getInfo() {
        await this.props.tokenBuffet('selfit.buffet');
        await this.props.selectBuffet(this.props.buffetid);
        await this._getFoodCategory();
        await this._getMenuFood();
        await this._getMaterial();
        await this._getDish();
        await this._checkOrderBuffet();
    };

    componentDidMount() {
        setTimeout(this._tabs.goToPage.bind(this._tabs, 1), 100);
        setTimeout(this._tabs2.goToPage.bind(this._tabs2, 1), 500);
    }

    async _getFoodCategory() {
        try {
            let {tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let FoodCategory = await getFoodCategory(tokenmember, tokenapi);
            console.log('FoodCategory:', FoodCategory);
        } catch (error) {
            console.log(error);
        }
    }

    async _getMaterial() {
        try {
            let {buffetid, tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let MaterialList = await getAllBuffetMaterial(buffetid, false, tokenmember, tokenapi, 20, 0, false, 0);
            console.log(MaterialList);
            this.props.receiveMaterial(MaterialList);
        } catch (err) {
            logError(err, 'getAllBuffetMaterial', 'Buffet/BuffetMenu', '_getMaterial');
            console.log(err);
        }
    }

    async _getMenuFood() {
        try {
            let {buffetid, tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let MenuFood = await getMenuFood(buffetid, 0, tokenmember, tokenapi, 30, 0, true, 0);
            await this.props.receiveMenuFood(MenuFood);
            this.setState({MenuFood});
            this.setState({CountReady: true});
        } catch (err) {
            logError(err, '_getMenufood', 'Buffet/BuffetMenu', 'getMenuFood');
            console.log(err);
        }
    }

    async _getDish() {
        try {
            let {tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let {max, min, ssort} = await this.state;
            let DishSize = await getAllDish(tokenmember, tokenapi, max, min, ssort);
            await this.setState({iddish: DishSize[0].iddish});
            console.log(this.state);
        } catch (e) {
            console.log(e);
            logError(e, '_getDish', 'Buffet/BuffetMenu', 'getAllDish');
        }
    }

    async _checkOrderBuffet() {
        try {
            let {buffetid, tokenapi,idbasket} = await this.props;
            let {tokenmember} = await this.props.user;
            let result = await checkOrderBuffet(buffetid, tokenmember, tokenapi);
            console.log(result,'checkOrder');
            if (result == 1 || !idbasket) {
                await this._postBasketMaterial();
            }
        } catch (e) {
            console.log(e);
        }
    }

    async _postBasketMaterial() {
        try {
            let {tokenapi, buffetid} = await this.props;
            let {tokenmember} = await this.props.user;
            let {iddish} = await this.state;
            let deleteOrder = await deleteOrderAll(tokenmember,tokenapi);
            console.log(deleteOrder,'deleteOrder?');

            let idbasket = await postBasketMaterial(iddish, buffetid, tokenmember, tokenapi);
            this.props.setIDBasket(idbasket);
            console.log(idbasket, 'idbasket?');
        } catch (e) {
            console.log(e);
            logError(e, '_postBasketMaterial', 'Buffet/BuffetMenu', 'postBasketMaterial');
        }
    }

    render() {
        const FooterComponent = (this.props.Count1 + this.props.Count2) === 0 ? null :
            <Footer>
                <FooterTab>
                    <Button badge
                            full
                            style={{
                                paddingTop: 10,
                                backgroundColor: '#0F9D7A'
                            }}
                            onPress={() => Actions.buffetBasket()}>
                        <Badge><Text>{(this.props.Count1 + this.props.Count2).toLocaleString('fa')}</Text></Badge>
                        <Icon name="basket" style={{color: 'white'}}/>
                        <Text style={{
                            fontFamily: 'IRANSansMobile',
                            fontSize: 18,
                            color: 'white',
                            paddingTop: 12
                        }}>سبد سفارش</Text>
                    </Button>
                </FooterTab>
            </Footer>;
        const {datesave, RateNumber, httpserver, pathserver, picbuffet, namebuffet, addressgym} = this.props;
        const m = moment(`${datesave}`, 'YYYY/MM/DDTHH:mm:ss');
        const ImgYear = m.jYear();
        const ImgMonth = m.jMonth() + 1;
        const ImgSrc = `${httpserver}${pathserver}${ImgYear}/${ImgMonth}/${picbuffet}`;
        return (
            <Container>
                <AppHeader rightTitle="بوفه آنلاین" backButton={"flex"}/>
                <Content>
                    <TouchableWithoutFeedback onPress={() => Actions.showImage({uri: ImgSrc})}>
                        <ImageBackground source={{uri: ImgSrc}}
                                         style={{flex: 1, height: 170, backgroundColor: 'black'}}
                                         imageStyle={{opacity: 0.5}}>
                            <View style={styles.bar}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontFamily: 'IRANSansMobile',
                                    color: 'white',
                                    margin: 10
                                }}>بوفه {namebuffet}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                    <Tabs initialPage={1} locked={true} ref={component => this._tabs = component}>
                        <Tab heading='نظرات و اطلاعات'
                             textStyle={TabsStyle.text}
                             activeTabStyle={TabsStyle.activeTab}
                             tabStyle={TabsStyle.notActiveTabs}>
                            <Card>
                                <CardItem>
                                    <Text style={{
                                        textAlign: 'right',
                                        fontFamily: 'IRANSansMobile'
                                    }}>آدرس: {addressgym}</Text>
                                </CardItem>
                                <CardItem>
                                    <Left style={{flex: 1}}>
                                    </Left>
                                    <Right style={{flex: 1}}>
                                        <Button transparent
                                                textStyle={{color: '#87838B'}}>
                                            <Icon name="md-star"/>
                                            <Text>امتیاز: 5/{RateNumber}</Text>
                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>
                        </Tab>
                        <Tab heading='منو'
                             textStyle={TabsStyle.text}
                             activeTabStyle={TabsStyle.activeTab}
                             tabStyle={TabsStyle.notActiveTabs}>
                            <Tabs initialPage={1} ref={component => this._tabs2 = component}>

                                <Tab heading='منو انتخابی'
                                     textStyle={TabsStyle.text}
                                     activeTabStyle={TabsStyle.activeTab}
                                     tabStyle={TabsStyle.notActiveTabs}>
                                    {this.props.idbasket && <FlatList
                                        data={this.props.Material}
                                        renderItem={(item) => this.renderMaterial(item)}
                                        keyExtractor={(item) => item.idmaterial}
                                        ListEmptyComponent={() => <Spinner/>}
                                        scrollEnabled={false}
                                        // onRefresh={this.handleRefresh.bind(this)}
                                        // refreshing={this.state.refreshing}
                                        // onEndReachedThreshold={0.5}
                                        // ListFooterComponent={this.renderFooter.bind(this)}
                                    />}
                                </Tab>
                                <Tab heading='منو آماده'
                                     textStyle={TabsStyle.text}
                                     activeTabStyle={TabsStyle.activeTab}
                                     tabStyle={TabsStyle.notActiveTabs}>
                                    <FlatList
                                        data={this.props.MenuFood}
                                        renderItem={(item) => this.renderItem(item)}
                                        keyExtractor={(item) => item.idmenufood}
                                        ListEmptyComponent={() => <Spinner/>}
                                        scrollEnabled={false}
                                        // onRefresh={this.handleRefresh.bind(this)}
                                        // refreshing={this.state.refreshing}
                                        // onEndReachedThreshold={0.5}
                                        // ListFooterComponent={this.renderFooter.bind(this)}
                                    />
                                </Tab>
                            </Tabs>
                        </Tab>
                    </Tabs>
                </Content>
                {FooterComponent}
            </Container>
        );
    }

    renderItem({item}) {
        return <FoodCard MenuFood={item}/>
    }

    renderMaterial({item}) {
        return <MaterialCard Material={item}/>
    }
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
    },
    bar: {
        flex: 1,
        margin: 10,
        // height: 32,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        selectBuffet: (buffetid) => dispatch(selectBuffet(buffetid)),
        receiveMenuFood: (MenuFood) => dispatch(receiveMenuFood(MenuFood)),
        receiveMaterial: (Material) => dispatch(receiveMaterial(Material)),
        tokenBuffet: (tokenapi) => dispatch(tokenBuffet(tokenapi)),
        setIDBasket: (idbasket) => dispatch(setIDBasket(idbasket)),
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.buffet.tokenapi,
        MenuFood: state.buffet.MenuFood,
        Count2: state.basket.materialBasketCount,
        Count1: state.basket.buffetBasketCount,
        // Count: state.basket.materialBasketCount + state.basket.buffetBasketCount,
        Material: state.buffet.Material,
        idbasket: state.basket.idbasket,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BuffetMenu);