import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardItem, Container, Content, Footer, FooterTab } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { getAllOrder } from '../../../services/orderBuffet';
import { getAllBasketMaterial } from '../../../services/orderMaterial';
import AppHeader from '../../header';
import { reBasketBuffet, reBasketMaterial, selectBuffet, setRoad, tokenBuffet } from '../../../redux/actions';
import FoodCard from './FoodCard';
import MaterialCard from './MaterialCard';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';

const active = true;
const max = 100;
const min = 0;

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  materialBasket: state.basket.materialBasket,
  buffetBasket: state.basket.buffetBasket,
  Count1: state.basket.materialBasketCount,
  Count2: state.basket.buffetBasketCount,
  PriceAll: state.basket.PriceAllBuffet + state.basket.PriceAllMaterial,
}), {
  tokenBuffet,
  reBasketBuffet,
  reBasketMaterial,
  setRoad,
  selectBuffet
})
export default class BuffetBasket extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    Count1: PropTypes.number,
    Count2: PropTypes.number,
    PriceAll: PropTypes.number,
    tokenBuffet: PropTypes.func.isRequired,
    reBasketBuffet: PropTypes.func.isRequired,
    reBasketMaterial: PropTypes.func.isRequired,
    setRoad: PropTypes.func.isRequired,
    selectBuffet: PropTypes.func.isRequired,
    buffetBasket: PropTypes.arrayOf(PropTypes.node),
    materialBasket: PropTypes.arrayOf(PropTypes.node),
  };
  static defaultProps = {
    Count1: 0,
    Count2: 0,
    PriceAll: 0,
    buffetBasket: [],
    materialBasket: [],
  }
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.getBasketBuffet();
    await this.getBasketMaterial();
    this.props.setRoad('buffet');
  }
  async getBasketBuffet() {
    const { tokenmember } = await this.props.user;
    const { tokenapi } = await this.props;
    const { Basket, PriceAll } =
        await getAllOrder(active, tokenmember, tokenapi, max, min, null);
    this.props.reBasketBuffet(Basket, Basket.length, PriceAll);
  }
  async getBasketMaterial() {
    const { tokenmember } = await this.props.user;
    const { tokenapi } = await this.props;
    const { Basket, PriceAll, idbuffet } =
        await getAllBasketMaterial(active, tokenmember, tokenapi, max, min);
    this.props.reBasketMaterial(Basket, Basket.length, PriceAll);
    this.props.selectBuffet(idbuffet);
  }
  returnBuffetItem = ({ item }) => <FoodCard food={item} />;
  renderMaterialItem = ({ item }) => <MaterialCard food={item} />;
  render() {
    const FooterComponent = (this.props.Count1 + this.props.Count2) === 0 ? null : (
      <Footer>
        <FooterTab>
          <Button
            style={{ backgroundColor: '#0F9D7A' }}
            onPress={() => Actions.addressRoot({ LeadFrom: 'Buffet' })}
          >
            <Text style={{ color: 'white' }}>
              انتخاب آدرس
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    );
    const { buffetBasket, materialBasket, PriceAll } = this.props;
    return (
      <Container>
        <AppHeader rightTitle="سبد غذا" backButton="flex" />
        <Content padder>
          <Card>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text type="bold" style={{ flex: 1, textAlign: 'center' }}>سبد خرید غذای آماده</Text>
              </CardItem>
            </Card>
            <FlatList
              data={buffetBasket}
              renderItem={this.returnBuffetItem}
              ListEmptyComponent={<Text style={{ marginRight: 20 }}>هیچ سفارشی دریافت نشد...</Text>}
              keyExtractor={item => item.idbasketbuffet}
              scrollEnabled={false}
            />
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text type="bold" style={{ flex: 1, textAlign: 'center' }}>سبد خرید مواد اولیه</Text>
              </CardItem>
            </Card>
            <FlatList
              data={materialBasket}
              renderItem={this.renderMaterialItem}
              ListEmptyComponent={<Text style={{ marginRight: 20 }}>هیچ سفارشی دریافت نشد...</Text>}
              keyExtractor={item => item.idmixmaterial}
              scrollEnabled={false}
            />
            <CardItem footer bordered>
              <Text type="bold" style={{ flex: 1 }}>
                جمع کل: {persianNumber(PriceAll.toLocaleString())} تومان
              </Text>
            </CardItem>
          </Card>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
