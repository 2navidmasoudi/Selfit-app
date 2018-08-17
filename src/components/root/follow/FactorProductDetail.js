import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Body, Card, CardItem, Container, Content, Left, ListItem, Right, } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import AppHeader from '../../header';
import { Text } from '../../Kit';
import { mainColor } from '../../../assets/variables/colors';
import { persianNumber } from '../../../utils/persian';
import { getFactorDetailProduct } from '../../../services/orderProduct';

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
}))
export default class FactorProductDetail extends Component {
  state = {
    orders: [],
  };

  componentWillMount() {
    this.getFactorDetail();
  }

  async getFactorDetail() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, factor } = await this.props;
      const orders = await getFactorDetailProduct(factor.idorder, tokenmember, tokenapi, 50, 0);
      this.setState({ orders });
      console.log('factorDetailProduct');
      console.log(orders);
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
        <Text style={{ textAlign: 'center' }}>{item.titleproduct}</Text>
      </Body>
      <Right>
        <Text>{persianNumber(item.numberbasket)} عدد</Text>
      </Right>
    </ListItem>
  );
  render() {
    const { factor } = this.props;
    const m = moment(`${factor.datesaveorder}`, 'YYYY/MM/DDTHH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss');
    return (
      <Container>
        <AppHeader rightTitle="فاکتور خرید" />
        <Content padder>
          <Card>
            <CardItem>
              <Text style={{ flex: 1 }}>
                تاریخ: {persianNumber(m)}
              </Text>
              <Text style={{ flex: 1 }}>
                فاکتور شماره: {persianNumber(factor.factorid)}
              </Text>
            </CardItem>
            <CardItem cardBody>
              <FlatList
                data={this.state.orders}
                renderItem={this.renderItem}
                keyExtractor={item => item.idbasket}
              />
            </CardItem>
            <CardItem bordered>
              <Text style={{ flex: 1 }}>
                وضعیت فاکتور:{' '}<Text style={{ color: mainColor }}>پرداخت شده</Text>
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ flex: 1 }}>
                مبلغ پرداخت شده:{' '}
                <Text style={{ color: mainColor }}>
                  {persianNumber((factor.finalpricefactor).toLocaleString())} تومان
                </Text>
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
