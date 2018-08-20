import React, { Component } from 'react';
import {FlatList, Linking} from 'react-native';
import { connect } from 'react-redux';
import { Body, Button, Card, CardItem, Container, Content, Footer, FooterTab, Left, ListItem, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { setProductPriceAll, setRoad, tokenStore } from '../../../redux/actions';
import { getPayment, getRequestPayment } from '../../../services/payment';
import { postAddressProduct, postFactorProduct, putTimeFactor } from '../../../services/orderProduct';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
  Count: state.basket.productBasketCount,
  totalPrice: state.basket.PriceAllProduct,
  idtimefactor: state.basket.idtimefactor,
  descProduct: state.basket.descProduct,
  productBasket: state.basket.productBasket,
}), {
  tokenStore,
  setRoad,
  setProductPriceAll,
})
export default class finalOrderProduct extends Component {
  state = {
    active: true,
    state: false,
    min: 0,
    max: 30,
    fsort: 0,
    ssort: false,
    total: 0,
  };

  componentWillMount() {
    this.getInfo();
    console.log(this.props, 'props');
  }
  async getInfo() {
    await this.props.tokenStore('selfit.store');
    await this._getPayment();
    this.props.setRoad('Store');
  }
  async _getPayment() {
    const totalPrice = await getPayment(2, this.props.user.tokenmember, 0, 'selfit.member');
    this.props.setProductPriceAll(totalPrice);
  }
  async _putTimeFactor(idfactor) {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, idtimefactor } = await this.props;
      const result = await putTimeFactor(idfactor, idtimefactor, tokenmember, tokenapi);
      console.log(result, 'putTimeFactor');
      this.setState({ selected: true });
    } catch (e) {
      console.log(e);
    }
  }

  async _postAddressProduct(idfactor) {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, address } = await this.props;
      const result =
        await postAddressProduct(idfactor, address.idaddressmember, tokenmember, tokenapi);
      console.log(result, 'postAddressProduct');
      this.setState({ selected: true });
    } catch (e) {
      console.log(e);
    }
  }

  async handleFooterPress() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, idtimefactor, descProduct } = await this.props;
      const idfactor = await postFactorProduct(idtimefactor, descProduct, 1, tokenmember, tokenapi);
      await this._putTimeFactor(idfactor);
      await this._postAddressProduct(idfactor);
      const url = getRequestPayment(2, this.props.user.tokenmember);
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          Linking.openURL(url);
        }
      });
      Actions.reset('root');
    } catch (e) {
      console.log(e);
    }
  }

  renderItem = ({ item }) => (
    <ListItem style={{ flex: 1 }}>
      <Left>
        <Text>{persianNumber((item.priceproduct).toLocaleString())} تومان</Text>
      </Left>
      <Body>
        <Text style={{ textAlign: 'center' }}>{persianNumber(item.titleproduct)}</Text>
      </Body>
      <Right>
        <Text>{persianNumber(item.numberbasket)} عدد</Text>
      </Right>
    </ListItem>
  );

  render() {
    const totalPrice = (this.props.totalPrice).toLocaleString();
    const addressTitle = Base64.decode(this.props.address.titleaddressmember);
    const FooterComponent = (this.props.Count) === 0 ? null :
      (<Footer>
        <FooterTab>
          <Button
            style={{ backgroundColor: '#0F9D7A' }}
            onPress={this.handleFooterPress.bind(this)}
          >
            <Text style={{ color: 'white' }}>
              پرداخت: {persianNumber(totalPrice)} تومان
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
    return (
      <Container>
        <AppHeader rightTitle="صدور فاکتور فروشگاه" backButton="flex" />
        <Content padder>
          <Card>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text style={{ flex: 1, textAlign: 'center' }} type="bold">مشخصات فاکتور</Text>
              </CardItem>

            </Card>
            <FlatList
              data={this.props.productBasket}
              renderItem={this.renderItem}
              keyExtractor={item => item.idproduct}
              scrollEnabled={false}
            />
            <CardItem bordered>
              <Right style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>
                  به آدرس:{` ${addressTitle}`}
                </Text>
                <Text style={{ flex: 1 }}>
                  توضیحات:{` ${this.props.descProduct}`}
                </Text>
              </Right>

            </CardItem>
            <CardItem bordered>
              <Text style={{ flex: 1 }}>
                قیمت نهایی:{` ${persianNumber(totalPrice)} تومان`}
              </Text>
            </CardItem>
          </Card>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
