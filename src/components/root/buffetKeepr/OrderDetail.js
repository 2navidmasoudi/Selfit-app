import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Left,
  ListItem,
  Right,
  Separator
} from 'native-base';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { getBasketOrderAllBuffet } from '../../../services/orderBuffet';
import { getAllMixMaterial, getBasketOrderMaterial } from '../../../services/orderMaterial';
import { putAcceptBuffet } from '../../../services/buffet';
import { Text } from '../../Kit';
import {persianNumber} from "../../../utils/persian";

@connect(state => ({
  user: state.user,
  tokenmember: state.user.tokenmember,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}))
export default class OrderDetail extends Component {
  state = {
    disableAddButton: false,
    disableRemoveButton: false,
    buffetOrder: null,
    materialOrderid: null,
    materialOrder: null,
  };
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    this._getBasketOrderAllBuffet();
    this._getBasketOrderMaterial();
    // this._getMixMaterial(0);
  }
  async _getBasketOrderAllBuffet() {
    try {
      const { idmember, buffetidfactor, activemethodpayed } = await this.props.order;
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const buffetOrder = await getBasketOrderAllBuffet(idmember, buffetidfactor, activemethodpayed, tokenmember, tokenapi, 30, 0, true);
      console.log(buffetOrder, 'BuffetOrder');
      this.setState({ buffetOrder });
    } catch (e) {
      console.log(e);
    }
  }
  async _getBasketOrderMaterial() {
    try {
      const { idmember, buffetidfactor } = await this.props.order;
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const materialOrderid = await getBasketOrderMaterial(idmember, buffetidfactor, tokenmember, tokenapi, 30, 0, true);
      console.log(materialOrderid, 'MaterialOrderid');
      await this.setState({ materialOrderid });
      // TODO: FIX THIS SHIT PLEASE
      this._getMixMaterial(materialOrderid[0].idbasketmaterial);
    } catch (e) {
      console.log(e);
    }
  }
  async _getMixMaterial(id) {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { Basket, PriceAll } = await getAllMixMaterial(id || 0, false, tokenmember, tokenapi, 30, 0, false);
      console.log(Basket, 'materialOrder');
      this.setState({ materialOrder: Basket });
    } catch (e) {
      console.log(e);
    }
  }
  async sendAccept(active) {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, order } = await this.props;
      const result = await putAcceptBuffet(order.idmember, order.idfactorbuffet, active, tokenmember, tokenapi);
      console.log(result, 'accept Result');
      if (result === 1) {
        await this.setState({
          disableAddButton: true,
          disableRemoveButton: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  renderItem = ({ item }) => (
    <ListItem>
      <Left>
        <Text>{item.pricemenufood.toLocaleString('fa')} تومان</Text>
      </Left>
      <Text style={{ textAlign: 'center' }}>{item.namemenufood}</Text>
      <Right>
        <Text>{item.numbermenufood.toLocaleString('fa')} عدد</Text>
      </Right>
    </ListItem>
  );
  renderItem2 = ({ item }) => (
    <ListItem>
      <Left>
        <Text>{persianNumber(item.pricematerial.toLocaleString())} تومان</Text>
      </Left>
      <Text style={{ textAlign: 'center' }}>{item.namematerial}</Text>
      <Right>
        <Text>{persianNumber(item.numbermaterial)} عدد</Text>
      </Right>
    </ListItem>
  );
  render() {
    const FooterComponent = (this.props.Count1 + this.props.Count2) === 0 ? null :
      (<Footer>
        <FooterTab>
          <Button
            danger={!this.state.disableAddButton}
            disabled={this.state.disableAddButton}
            onPress={() => this.sendAccept(false)}
          >
            <Text style={{ color: 'white' }}>
              رد فاکتور
            </Text>
          </Button>
          <Button
            success={!this.state.disableAddButton}
            disabled={this.state.disableAddButton}
            onPress={() => this.sendAccept(true)}
          >
            <Text style={{ color: 'white', }}>
              قبول فاکتور
            </Text>
          </Button>
        </FooterTab>
       </Footer>);
    const { order } = this.props;
    return (
      <Container>
        <AppHeader rightTitle="مشخصات سفارش" backButton="flex" />
        <Content padder>
          <Text style={{ textAlign: 'center', fontSize: 20, margin: 10 }}>{order.namefamilymember}</Text>
          <Card>
            <CardItem bordered>
              <Text style={{ flex: 1, fontSize: 24, marginHorizontal: 10 }}>غذای آماده</Text>
            </CardItem>
            <FlatList
              data={this.state.buffetOrder}
              renderItem={this.renderItem}
              keyExtractor={item => item.idmenufood}
            />
            <Separator bordered style={{ flex: 0 }}>
              <Text style={{ fontSize: 24, marginHorizontal: 10 }}>غذای انتخابی</Text>
            </Separator>
            <FlatList
              data={this.state.materialOrder}
              renderItem={this.renderItem2}
              keyExtractor={item => item.idmaterial}
            />
          </Card>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}

