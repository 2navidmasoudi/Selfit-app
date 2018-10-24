import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Left,
  ListItem,
  Right
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Base64 } from 'js-base64';
import PropTypes from 'prop-types';
import AppHeader from '../../header';
import { setProductPriceAll, setRoad, tokenStore } from '../../../redux/actions';
import { getPayment, getRequestPayment } from '../../../services/payment';
import { postAddressProduct, postFactorProduct, putTimeFactor } from '../../../services/orderProduct';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { mainColor, white } from '../../../assets/variables/colors';
import { logError } from '../../../services/log';

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
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    Count: PropTypes.number,
    totalPrice: PropTypes.number,
    setRoad: PropTypes.func.isRequired,
    setProductPriceAll: PropTypes.func.isRequired,
    tokenStore: PropTypes.func.isRequired,
    address: PropTypes.objectOf(PropTypes.node).isRequired,
    productBasket: PropTypes.arrayOf(PropTypes.node),
    descProduct: PropTypes.string,
  }
  static defaultProps = {
    Count: 0,
    totalPrice: 0,
    productBasket: [],
    descProduct: '',
  }
  constructor() {
    super();
    this.handleFooterPress = this.handleFooterPress.bind(this);
  }
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenStore('selfit.store');
    await this.getPayment();
    this.props.setRoad('Store');
  }
  async getPayment() {
    const totalPrice = await getPayment(2, this.props.user.tokenmember, 0, 'selfit.member');
    this.props.setProductPriceAll(totalPrice);
  }
  async putTimeFactor(idfactor) {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, idtimefactor } = await this.props;
      const result = await putTimeFactor(idfactor, idtimefactor, tokenmember, tokenapi);
      if (result === 1) return result;
    } catch (e) {
      logError(e, 'postAddressProduct', 'finalOrderProduct', 'Basket');
    }
    return 0;
  }

  async postAddressProduct(idfactor) {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, address } = await this.props;
      const result =
        await postAddressProduct(idfactor, address.idaddressmember, tokenmember, tokenapi);
      if (result === 1) return result;
    } catch (e) {
      logError(e, 'postAddressProduct', 'finalOrderProduct', 'Basket');
    }
    return 0;
  }

  async handleFooterPress() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, idtimefactor, descProduct } = await this.props;
      const idfactor = await postFactorProduct(idtimefactor, descProduct, 1, tokenmember, tokenapi);
      await this.putTimeFactor(idfactor);
      await this.postAddressProduct(idfactor);
      getRequestPayment(2, this.props.user.tokenmember);
      Actions.reset('root');
    } catch (e) {
      logError(e, 'handleFooterPress', 'finalOrderProduct', 'Basket');
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
    const FooterComponent = (this.props.Count) === 0 ? null : (
      <Footer>
        <FooterTab>
          <Button
            style={{ backgroundColor: mainColor }}
            onPress={this.handleFooterPress}
          >
            <Text style={{ color: white }}>
              پرداخت: {persianNumber(totalPrice)} تومان
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
    return (
      <Container>
        <AppHeader rightTitle="صدور فاکتور فروشگاه" />
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
