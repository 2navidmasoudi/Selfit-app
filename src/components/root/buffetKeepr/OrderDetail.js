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
import { persianNumber } from '../../../utils/persian';
import { mainColor } from '../../../assets/variables/colors';
import {tokenBuffet} from "../../../redux/actions";

@connect(state => ({
  user: state.user,
  tokenmember: state.user.tokenmember,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}), {
  tokenBuffet
})
export default class OrderDetail extends Component {
  state = {
    disableAddButton: false,
    disableRemoveButton: false,
    buffetOrder: null,
    idbasketmaterial: null,
    materialOrder: null,
    Accepted: false,
  };
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    this._getBasketOrderAllBuffet();
    this._getBasketOrderMaterial();
    // this._getMixMaterial(0);
    console.log(this.props);
  }
  async _getBasketOrderAllBuffet() {
    try {
      const { idmember, buffetidfactor, activemethodpayed } = await this.props.order;
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      let buffetOrder = await getBasketOrderAllBuffet(
        idmember,
        buffetidfactor,
        activemethodpayed,
        false,
        tokenmember,
        tokenapi, 30, 0, true
      );
      if (!buffetOrder) {
        this.setState({ Accepted: true });
        buffetOrder = await getBasketOrderAllBuffet(
          idmember,
          buffetidfactor,
          activemethodpayed,
          true,
          tokenmember,
          tokenapi, 30, 0, true
        );
      }
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
      const materialOrderid = await getBasketOrderMaterial(
        idmember,
        buffetidfactor,
        false,
        tokenmember,
        tokenapi, 30, 0, true
      );
      console.log(materialOrderid, 'MaterialOrderid');
      const id = await materialOrderid[0].idbasketmaterial;
      // TODO: FIX THIS SHIT PLEASE
      this._getMixMaterial(id);
    } catch (e) {
      console.log(e);
    }
  }
  async _getMixMaterial(id) {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { Basket, PriceAll } = await getAllMixMaterial(
        id,
        false,
        tokenmember,
        tokenapi, 30, 0, false
      );
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
      const result = await putAcceptBuffet(
        order.idmember,
        order.idfactorbuffet,
        active,
        tokenmember,
        tokenapi
      );
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
        <Text>{persianNumber(item.pricemenufood.toLocaleString())} تومان</Text>
      </Left>
      <Text style={{ textAlign: 'center' }}>{item.namemenufood}</Text>
      <Right>
        <Text>{persianNumber(item.numbermenufood)} عدد</Text>
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
    const FooterComponent = (!this.state.Accepted) ?
      (<Footer>
        <FooterTab>
          <Button
            full
            danger={!this.state.disableAddButton}
            disabled={this.state.disableAddButton}
            onPress={() => this.sendAccept(false)}
          >
            <Text style={{ color: 'white' }}>
              رد فاکتور
            </Text>
          </Button>
          <Button
            full
            success={!this.state.disableAddButton}
            disabled={this.state.disableAddButton}
            onPress={() => this.sendAccept(true)}
          >
            <Text style={{ color: 'white', }}>
              قبول فاکتور
            </Text>
          </Button>
        </FooterTab>
       </Footer>)
      :
      (<Footer>
        <FooterTab>
          <Button
            style={{ backgroundColor: mainColor }}
          >
            <Text style={{ color: 'white' }}>
              فاکتور قبول شده.
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
    const { order } = this.props;
    return (
      <Container>
        <AppHeader rightTitle="مشخصات سفارش" backButton="flex" />
        <Content padder>
          <Text type="bold" style={{ textAlign: 'center', margin: 10 }}>{order.namefamilymember}</Text>
          <Card>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text type="bold" style={{ flex: 1, marginHorizontal: 10 }}>غذای آماده</Text>
              </CardItem>
            </Card>
            <FlatList
              data={this.state.buffetOrder}
              renderItem={this.renderItem}
              keyExtractor={item => item.idmenufood}
            />
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text type="bold" style={{ flex: 1, marginHorizontal: 10 }}>غذای انتخابی</Text>
              </CardItem>
            </Card>
            <FlatList
              data={this.state.materialOrder}
              renderItem={this.renderItem2}
              keyExtractor={item => item.idmaterial}
            />
            <CardItem bordered footer>
              <Text style={{ flex: 1, marginHorizontal: 10 }}>
                توضیحات:  {order.descfactor ? order.descfactor : 'ندارد.'}
              </Text>
            </CardItem>
            <CardItem bordered footer>
              <Text style={{ flex: 1, marginHorizontal: 10 }}>
                قیمت نهایی سفارش: {persianNumber(order.allpricefactorbuffet.toLocaleString())} تومان
              </Text>
            </CardItem>
          </Card>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}

