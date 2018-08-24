import React, { Component } from 'react';
import { FlatList, Image } from 'react-native';
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
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ProductCard from './ProductCard';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { receiveProduct, tokenStore } from '../../../redux/actions';
import { getAllAccessProduct } from '../../../services/product';
import { Modal, Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { mainColor, white } from '../../../assets/variables/colors';
import Loader from '../../loader';
import { helpDoneStore } from '../../../redux/actions/help';
import Pic1 from '../../../assets/helpPics/Store/StoreCard.png';
import Pic2 from '../../../assets/helpPics/Store/StoreBasket.png';

const MaterialSource = 'https://selfit.ir/Resource/Material/';
@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
  Count: state.basket.productBasketCount,
  help: state.help.Store,
}), {
  tokenStore,
  receiveProduct,
  helpDoneStore
})
export default class CategoryChildren extends Component {
  state = {
    productCategory: [],
    Product: [],
    max: 150,
    min: 0,
    loading: true,
    ModalNumber: 0,
  };
  componentWillMount() {
    if (!this.props.help) {
      this.setState({ ModalNumber: 1 });
    }
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
      this.setState({ loading: true });
      const { tokenmember } = await this.props.user;
      const { tokenapi, idcategory } = await this.props;
      const { max, min } = await this.state;
      const Product = await getAllAccessProduct(idcategory, tokenmember, tokenapi, max, min, null);
      console.log(Product, 'Product');
      // this.props.receiveProduct(Product,min);
      this.setState({ Product });
      this.setState({ loading: false });
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
    }
  }
  helpDone = () => this.props.helpDoneStore();
  renderProduct = ({ item }) => <ProductCard product={item} />
  render() {
    const FooterComponent = this.props.Count === 0 ? null :
      (<Footer>
        <FooterTab>
          <Button
            badge
            full
            style={{
              paddingTop: 15,
              backgroundColor: mainColor
            }}
            onPress={() => Actions.productBasket()}
          >
            <Badge style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: white }}>
                {persianNumber((this.props.Count).toLocaleString())}
              </Text>
            </Badge>
            <Icon name="basket" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }}>
              سبد سفارش
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
    return (
      <Container>
        <Modal
          isVisible={this.state.ModalNumber === 1}
          onModalHide={() => this.setState({ ModalNumber: 2 })}
          exitText="ممنون"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 150,
            }}
            source={Pic1}
            resizeMode="contain"
          />
          <Text>
            با زدن بر روی این باکس ها میتونی کالا یا محصول مورد نظرت
            رو به سبد خرید فروشگاهت اضافه یا کم کنی.
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 2}
          onModalHide={this.helpDone}
          exitText="خیلی خب"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 100,
            }}
            source={Pic2}
            resizeMode="contain"
          />
          <Text>
            با زدن دکمه سبد سفارش، سبد خریدت رو ببین و سفارشت رو نهایی کن.
          </Text>
        </Modal>
        <AppHeader rightTitle="فروشگاه" backButton="flex" />
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem style={{ flex: 1, alignItems: 'center' }} header bordered>
              <Left style={{ flex: 1 }} />
              <Text
                type="bold"
                style={{ flex: 5, textAlign: 'center' }}
              >
                {this.props.categoryTitle}
              </Text>
              <Icon active name="cart" style={{ flex: 1 }} />
            </CardItem>
            {this.props.productCategory.map(c => (
              <CardItem
                button
                key={c.idcategory}
                bordered
                onPress={() => this.onItemPress(c)}
                cardBody
              >
                <Image
                  source={{ uri: `${MaterialSource}${c.piccategory}` }}
                  style={{ width: 50, height: 50, marginHorizontal: 10 }}
                />
                <Text style={{ flex: 5 }}>{c.namecategory}</Text>
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
            ListEmptyComponent={<Loader loading={this.state.loading} />}
            scrollEnabled={false}
          />
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
