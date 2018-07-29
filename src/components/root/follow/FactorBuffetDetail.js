import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Body, Card, CardItem, Container, Content, Left, ListItem, Right } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import AppHeader from '../../header';
import { errorColor, mainColor } from '../../../assets/variables/colors';
import { persianNumber } from '../../../utils/persian';
import { Text } from '../../Kit';
import { tokenBuffet } from '../../../redux/actions';
import { getOrderBuffet } from '../../../services/orders';
import PayButton from './payButton';


@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  tokenBuffet
})
export default class FactorBuffetDetail extends Component {
  state= {
    buffetOrder: null,
    materialOrder: null,
    refreshing: true,
  };
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this._getOrderBuffet();
  }
  async _getOrderBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, item } = await this.props;
      const active = await item.statepayedid === 2;
      const json =
        await getOrderBuffet(item.idfactorbuffet, active, tokenmember, tokenapi, 50, 0, true);
      const buffetOrder = await json.Buffet_BasketBuffetOrderList.$values;
      const basketMaterial = await json.Buffet_BasketMaterialOrderList.$values;
      let materialOrder = [];
      for (let i = 0; i < basketMaterial.length; i++) {
        for (let j = 0; j < basketMaterial[i].MixMaterialList.$values.length; j++) {
          materialOrder = [...materialOrder, basketMaterial[i].MixMaterialList.$values[j]];
        }
      }
      // console.log('buffetOrder');
      // console.log(buffetOrder);
      // console.log('materialOrder');
      // console.log(materialOrder);
      this.setState({ buffetOrder, materialOrder });
    } catch (e) {
      console.log(e);
    }
  }
  renderItem = ({ item }) => (
    <ListItem>
      <Left>
        <Text>{persianNumber(item.pricemenufood.toLocaleString())} تومان</Text>
      </Left>
      <Body>
        <Text style={{ textAlign: 'center' }}>{item.namemenufood}</Text>
      </Body>
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
      <Body>
        <Text style={{ textAlign: 'center' }}>{item.namematerial}</Text>
      </Body>
      <Right>
        <Text>{persianNumber(item.numbermaterial)} عدد</Text>
      </Right>
    </ListItem>
  );
  render() {
    const { item } = this.props;
    const m = moment(`${item.datesavefactorbuffet}`, 'YYYY/MM/DDTHH:mm:ss').format('jYYYY/jMM/jDD HH:mm');
    const statePayed = item.idstatepayed === 2 ?
      (<Text>
        <Text style={{ color: mainColor }}>
          تایید شده
        </Text>
        {' '}و{' '}
        <Text style={{ color: errorColor }}>
          منتظر پرداخت
        </Text>
      </Text>)
      :
      (<Text>
        <Text style={{ color: mainColor }}>
          پرداخت شده
        </Text>
        {' '}و{' '}
        <Text style={{ color: mainColor }}>
          درحال آماده سازی غذا!
        </Text>
      </Text>);
    const stateFactor = item.acceptfactor ? statePayed :
      (<Text style={{ color: errorColor }}>
        منتظر تایید توسط بوفه دار.
      </Text>);
    const payBtn = (item.acceptfactor && item.idstatepayed === 2 && this.props.sendPrice) ?
      <PayButton sendPrice={this.props.sendPrice} />
      : null;
    const totalPrice = item.finalpricefactorbuffet + this.props.sendPrice * 3 / 5;
    return (
      <Container>
        <AppHeader rightTitle="فاکتور خرید" />
        <Content padder>
          <Card>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text type="bold" style={{ flex: 1, marginHorizontal: 10 }}>غذای آماده</Text>
              </CardItem>
            </Card>
            <FlatList
              data={this.state.buffetOrder}
              renderItem={this.renderItem}
              scrollEnabled={false}
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
              scrollEnabled={false}
              keyExtractor={item => item.idmixmaterial}
            />
            <CardItem>
              <Right style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>
              به آدرس: {item.titleaddressmember}
                </Text>
                <Text style={{ flex: 1 }}>
              توضیحات: {item.descfactor || 'ندارد.'}
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>{persianNumber(m)}</Text>
              </Left>
              <Right style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>فاکتور خرید شماره: {persianNumber(item.idfactorbuffet)}</Text>
              </Right>
            </CardItem>
            <CardItem bordered>
              <Text style={{ flex: 1 }}>
                هزینه ارسال: {persianNumber((this.props.sendPrice * 3 / 5).toLocaleString())} تومان
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ flex: 1 }}>
            قیمت نهایی فاکتور: {persianNumber(totalPrice.toLocaleString())} تومان
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ flex: 1, textAlign: 'center' }}>
            وضعیت فاکتور: {stateFactor}
              </Text>
            </CardItem>
            {payBtn}
          </Card>
        </Content>
      </Container>
    );
  }
}
