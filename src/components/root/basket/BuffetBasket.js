import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Footer, FooterTab, Separator } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getAllOrder } from '../../../services/orderBuffet';
import { getAllMixMaterial } from '../../../services/orderMaterial';
import AppHeader from '../../header';
import { reBasketBuffet, reBasketMaterial, setRoad, tokenBuffet } from '../../../redux/actions';
import { logError } from '../../../services/log';
import FoodCard from './FoodCard';
import MaterialCard from './MaterialCard';

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
})
export default class BuffetBasket extends Component {
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
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this._getBasketBuffet();
    await this._getBasketMaterial();
    this.props.setRoad('buffet');
  }
  async _getBasketBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { active, max, min } = await this.state;
      const {
        Basket,
        PriceAll
      } = await getAllOrder(active, false, tokenmember, tokenapi, max, min);
      console.log(Basket, 'basket for Buffet!', PriceAll, 'priceAll');
      this.props.reBasketBuffet(Basket, Basket.length, PriceAll);
    } catch (e) {
      console.log(e);
      logError(e, '_getBasketBuffet', 'DrawerLayout/index', 'getAllOrder');
    }
  }
  async _getBasketMaterial() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { state, max, min, fsort, ssort } = await this.state;
      const {
        Basket,
        PriceAll
      } = await getAllMixMaterial(0, state, tokenmember, tokenapi, max, min, ssort, fsort);
      console.log(Basket, 'basket for Material!', PriceAll, 'priceAll');
      this.props.reBasketMaterial(Basket, Basket.length, PriceAll);
    } catch (e) {
      console.log(e);
      logError(e, '_getBasketMaterial', 'DrawerLayout/index', 'getAllMixMaterial');
    }
  }
  returnBuffetItem({ item }) {
    return <FoodCard food={item} />;
  }
  renderMaterialItem({ item }) {
    return <MaterialCard food={item} />;
  }
  render() {
    const FooterComponent = (this.props.Count1 + this.props.Count2) === 0 ? null :
      (<Footer>
        <FooterTab>
          <Button
            style={{ backgroundColor: '#0F9D7A' }}
            onPress={() => Actions.addressRoot({ LeadFrom: 'Buffet' })}
          >
            <Text style={{
              fontFamily: 'IRANSansMobile',
              color: 'white',
            }}
            >
              انتخاب آدرس
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
    return (
      <Container>
        <AppHeader rightTitle="سبد غذا" backButton="flex" />
        <Content padder>
          <Text style={{ textAlign: 'center' }}>سبد خرید</Text>
          <Separator>
            <Text style={{ textAlign: 'center' }}>غذای آماده</Text>
          </Separator>
          <FlatList
            data={this.props.buffetBasket}
            renderItem={item => this.returnBuffetItem(item)}
            keyExtractor={item => item.idbasketbuffet}
            scrollEnabled={false}
          />
          <Separator>
            <Text style={{ textAlign: 'center' }}>متریال</Text>
          </Separator>
          <FlatList
            data={this.props.materialBasket}
            renderItem={item => this.renderMaterialItem(item)}
            keyExtractor={item => item.idmixmaterial}
            scrollEnabled={false}
          />
          <Text>کل: {this.props.PriceAll}</Text>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
