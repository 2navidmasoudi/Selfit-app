import React, {Component} from 'react';
import {FlatList} from "react-native";
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Icon,
    Right,
    Spinner,
    Footer,
    FooterTab,
    Button, Badge
} from 'native-base';
import AppHeader from '../../header';
import {connect} from 'react-redux';
import {putCheckToken} from '../../../services/index';
import {receiveProduct, tokenStore} from '../../../redux/actions';
import {Actions} from 'react-native-router-flux';
import {getAllAccessProduct} from "../../../services/product";
import ProductCard from "./ProductCard";
import {logError} from '../../../services/log';
import {getAllCategoryProduct} from '../../../services/categoryProduct';

class CategoryChildren extends Component {
    constructor() {
        super();
        this.state = {
            productCategory: [],
            Product: [],
            max: 30,
            min: 0,
            ssort: false,
            fsort: 0,
        }
    }

//TODO: LIST FOR PRODUCT
    componentWillMount() {
        let {tokenmember, tokenapi} = this.props.user;
        putCheckToken(tokenmember, tokenapi);
        this._getAllAccessProduct();
    }

    async _getAllAccessProduct() {
        try {
            let {tokenmember} = await this.props.user;
            let {tokenapi, idcategory} = await this.props;
            let {max, min, fsort, ssort} = await this.state;
            let Product = await getAllAccessProduct(idcategory, tokenmember, tokenapi, max, min, ssort, fsort);
            console.log(Product);
            // this.props.receiveProduct(Product,min);
            this.setState({Product});
        } catch (e) {
            console.log(e)
        }
    }

    onItemPress(item) {
        // if (item.children.length) {
        Actions.categoryChildren({
            productCategory: item.children,
            categoryTitle: item.namecategory,
            idcategory: item.idcategory
        });
        console.log(item);
        // }
    }

    render() {
        const FooterComponent = this.props.Count === 0 ? null :
            <Footer>
                <FooterTab>
                    {/*<Button*/}
                        {/*style={{*/}
                            {/*// paddingTop: 10,*/}
                            {/*backgroundColor: '#0F9D7A'*/}
                        {/*}}*/}
                        {/*onPress={() => Actions.productBasket({LeadFrom: 'Buffet'})}>*/}
                        {/*/!*<Badge><Text>{(this.props.Count1 + this.props.Count2).toLocaleString('fa')}</Text></Badge>*!/*/}
                        {/*/!*<Icon name="basket" style={{color: 'white'}}/>*!/*/}
                        {/*<Text style={{*/}
                            {/*fontFamily: 'IRANSansMobile',*/}
                            {/*// fontSize: 18,*/}
                            {/*color: 'white',*/}
                            {/*// paddingTop: 12*/}
                        {/*}}>مشاهده سبد خرید</Text>*/}
                    {/*</Button>*/}
                    <Button badge
                            full
                            style={{
                                paddingTop: 10,
                                backgroundColor: '#0F9D7A'
                            }}
                            onPress={() => Actions.productBasket()}>
                        <Badge><Text>{(this.props.Count).toLocaleString('fa')}</Text></Badge>
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
        return (
            <Container>
                <AppHeader rightTitle="فروشگاه" backButton={"flex"}/>
                <Content>
                    <Card style={{flex:0}}>
                        <CardItem style={{flex: 1, alignItems: 'center'}} header bordered>
                            <Icon active name="cart"/>
                            <Text style={{textAlign: 'right'}}>{this.props.categoryTitle}</Text>
                            {/* <Right>
                            <Icon name="arrow-forward" />
                        </Right> */}
                        </CardItem>
                        {this.props.productCategory.map((c) => (
                            <CardItem button key={c.idcategory} bordered
                                      onPress={() => this.onItemPress(c)}
                            >
                                {/* <Icon active name="logo-googleplus" /> */}
                                <Text style={{flex: 5, textAlign: 'right'}}>{c.namecategory}</Text>
                                <Right style={{flex: 1, alignItems: 'center'}}>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </CardItem>
                        ))}
                    </Card>
                    <FlatList
                        data={this.state.Product}
                        renderItem={(item) => this.renderProduct(item)}
                        keyExtractor={(item) => item.idproduct}
                        ListEmptyComponent={() => <Spinner/>}
                        scrollEnabled={false}
                        // onRefresh={this.handleRefresh.bind(this)}
                        // refreshing={this.state.refreshing}
                        // onEndReachedThreshold={0.5}
                        // ListFooterComponent={this.renderFooter.bind(this)}
                    />
                </Content>
                {FooterComponent}
            </Container>
        )
    }

    renderProduct({item}) {
        return <ProductCard product={item}/>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenStore: (tokenapi) => dispatch(tokenStore(tokenapi)),
        receiveProduct: (product, min) => dispatch(receiveProduct(product, min)),
    }
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.store.tokenapi,
        Count: state.basket.productBasketCount,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryChildren);