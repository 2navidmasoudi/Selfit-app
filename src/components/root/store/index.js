import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Icon,
    Right,
    Footer,
    FooterTab,
    Button,
    Badge
} from 'native-base';
import AppHeader from '../../header';
import { connect } from 'react-redux';
import { putCheckToken } from '../../../services/index';
import { tokenStore } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { getAllCategoryProduct } from '../../../services/categoryProduct';
import listToTree from 'list-to-tree-lite';
import {Actions} from 'react-native-router-flux';

// const listToTree = (data, options) =>{
//
//     options = options || {};
//     let ID_KEY = options.idKey || 'idmenu';
//     let PARENT_KEY = options.parentKey || 'parentidmenu';
//     let CHILDREN_KEY = options.childrenKey || 'children';
//
//     let tree = [],
//         childrenOf = {};
//     let item, id, parentId;
//
//     for (let i = 0;i < data.length; i++) {
//         item = data[i];
//         id = item[ID_KEY];
//         parentId = item[PARENT_KEY] || 0;
//         // every item may have children
//         childrenOf[id] = childrenOf[id] || [];
//         // init its children
//         item[CHILDREN_KEY] = childrenOf[id];
//         if (parentId != 0) {
//             // init its parent's children object
//             childrenOf[parentId] = childrenOf[parentId] || [];
//             // push it into its parent's children object
//             childrenOf[parentId].push(item);
//         } else {
//             tree.push(item);
//         }
//     };
//
//     return tree;
// };

//TODO: LIST FOR PRODUCT
class Store extends Component {
    constructor(){
        super();
        this.state={
            productCategory:[],
            max:30,
            min:0,
            ssort:false,
            fsort:0,
        }
    }
    componentWillMount(){
        this.setInfo();
        let {tokenmember,tokenapi} = this.props.user;
        putCheckToken(tokenmember,tokenapi);
    }
    async setInfo(){
        await this.props.tokenStore('selfit.store');
        await this._getCategoryProduct();
        await this._listToTree();
    }
    async _listToTree() {
        let {productCategory} = await this.state;
        let Tree =  await listToTree(productCategory,{
            idKey:'idcategory',
            parentKey:'parentidcategory',
            // childrenKey: childrenKey,
        });
        console.log(productCategory,'productCategory');
        this.setState({productCategory:Tree});
    }
    onItemPress(item) {
        // if (item.children.length) {
        Actions.categoryChildren({productCategory:item.children,categoryTitle:item.namecategory,idcategory:item.idcategory});
        console.log(item);
        // }
    }

    async _getCategoryProduct(){
        try {
            let {tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let {max,min,ssort,fsort} = await this.state;
            let productCategory = await getAllCategoryProduct(tokenmember,tokenapi,max,min,ssort,fsort);
            console.log(productCategory);
            this.setState({
                productCategory
            })
        } catch (error) {
            logError(error,'getAllCategoryProduct','root/store','_getCategoryProduct');
            console.log(error);
        }

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
        return(
            <Container>
                <AppHeader rightTitle="فروشگاه" backButton={"flex"} />
                <Content>
                <Card  style={{flex:0}}>
                    <CardItem style={{flex:1,alignItems:'center'}} header bordered >
                        <Icon active name="cart" />
                        <Text style={{textAlign:'right'}}>دسته بندی فروشگاه</Text>
                        {/* <Right>
                            <Icon name="arrow-forward" />
                        </Right> */}
                    </CardItem>
                    {this.state.productCategory.map((c)=>(
                        <CardItem button key={c.idcategory} bordered
                                  onPress={()=>this.onItemPress(c)}>
                            {/* <Icon active name="logo-googleplus" /> */}
                            <Text style={{flex:5,textAlign:'right'}}>{c.namecategory}</Text>
                            <Right style={{flex:1,alignItems:'center'}}>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                    ))}
                </Card>
                </Content>
                {FooterComponent}
            </Container>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        tokenStore:(tokenapi)=>dispatch(tokenStore(tokenapi)),
    }
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.store.tokenapi,
        Count: state.basket.productBasketCount,
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Store);