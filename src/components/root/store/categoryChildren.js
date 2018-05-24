import React, { Component } from 'react';
import { FlatList } from 'react-native';
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
  Text
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ProductCard from './ProductCard';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { receiveProduct, tokenStore } from '../../../redux/actions';
import { getAllAccessProduct } from '../../../services/product';

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
  Count: state.basket.productBasketCount,
}), {
  tokenStore,
  receiveProduct,
})
export default class CategoryChildren extends Component {
  state = {
    productCategory: [],
    Product: [],
    max: 30,
    min: 0,
    ssort: false,
    fsort: 0,
  };
  // TODO: LIST FOR PRODUCT
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this._getAllAccessProduct();
  }
  onItemPress(item) {
    Actions.categoryChildren({
      productCategory: item.children,
      categoryTitle: item.namecategory,
      idcategory: item.idcategory
    });
    console.log(item);
  }
  async _getAllAccessProduct() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, idcategory } = await this.props;
      const { max, min, fsort, ssort } = await this.state;
      const Product = await getAllAccessProduct(idcategory, tokenmember, tokenapi, max, min, ssort, fsort);
      console.log(Product, 'Product');
      // this.props.receiveProduct(Product,min);
      this.setState({ Product });
    } catch (e) {
      console.log(e);
    }
  }
  renderProduct({ item }) {
    return <ProductCard product={item} />;
  }
  render() {
    const FooterComponent = this.props.Count === 0 ? null :
      (<Footer>
        <FooterTab>
          <Button
            badge
            full
            style={{
                    paddingTop: 10,
                    backgroundColor: '#0F9D7A'
                  }}
            onPress={() => Actions.productBasket()}
          >
            <Badge><Text>{(this.props.Count).toLocaleString('fa')}</Text></Badge>
            <Icon name="basket" style={{ color: 'white' }} />
            <Text style={{
              fontFamily: 'IRANSansMobile',
              fontSize: 18,
              color: 'white',
              paddingTop: 12
            }}
            >
              سبد سفارش
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
    return (
      <Container>
        <AppHeader rightTitle="فروشگاه" backButton="flex" />
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem style={{ flex: 1, alignItems: 'center' }} header bordered>
              <Left style={{ flex: 1 }} />
              <Text style={{ flex: 5, textAlign: 'center' }}>{this.props.categoryTitle}</Text>
              <Icon active name="cart" style={{ flex: 1 }} />
            </CardItem>
            {this.props.productCategory.map(c => (
              <CardItem
                button
                key={c.idcategory}
                bordered
                onPress={() => this.onItemPress(c)}
              >
                {/* <Icon active name="logo-googleplus" /> */}
                <Text style={{ flex: 5, textAlign: 'right' }}>{c.namecategory}</Text>
                <Right style={{ flex: 1, alignItems: 'center' }}>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            ))}
          </Card>
          <FlatList
            data={this.state.Product}
            renderItem={item => this.renderProduct(item)}
            keyExtractor={item => item.idproduct}
            ListEmptyComponent={() => <Spinner />}
            scrollEnabled={false}
            // onRefresh={this.handleRefresh.bind(this)}
            // refreshing={this.state.refreshing}
            // onEndReachedThreshold={0.5}
            // ListFooterComponent={this.renderFooter.bind(this)}
          />
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
