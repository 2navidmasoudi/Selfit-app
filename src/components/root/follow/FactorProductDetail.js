import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Card, CardItem, Container, Content, Left, ListItem, Right, } from 'native-base';
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
    product: [],
    time: null,
  };
  componentWillMount() {
    this.getFactorDetail();
  }

  async getFactorDetail() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, factor } = await this.props;
      const { product, time } =
        await getFactorDetailProduct(factor.idorder, tokenmember, tokenapi, 50, 0);
      this.setState({ product, time });
      console.log('factorDetailProduct');
      console.log(product, time);
    } catch (e) {
      console.log(e);
    }
  }
  renderDay = (day) => {
    switch (day) {
      case 1: return 'یک شنبه';
      case 2: return 'دو شنبه';
      case 3: return 'سه شنبه';
      case 4: return 'چهار شنبه';
      case 5: return 'پنج شنبه';
      case 6: return 'جمعه';
      default: return 'شنبه';
    }
  };
  renderItem = ({ item }) => (
    <ListItem style={{ flex: 1 }}>
      <Left>
        <Text>{persianNumber((item.priceproduct).toLocaleString())} تومان</Text>
      </Left>
      <Text>{item.titleproduct}</Text>
      <Right>
        <Text >{persianNumber(item.numberbasket)} عدد</Text>
      </Right>
    </ListItem>
  );
  render() {
    const { time } = this.state;
    const { factor } = this.props;
    const m = moment(`${factor.datesaveorder}`, 'YYYY/MM/DDTHH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss');
    return (
      <Container>
        <AppHeader rightTitle="فاکتور خرید" />
        <Content padder>
          <Card>
            <CardItem>
              <Text style={{ flex: 3 }}>
                تاریخ: {persianNumber(m)}
              </Text>
              <Text style={{ flex: 2 }}>
                فاکتور شماره: {persianNumber(factor.factorid)}
              </Text>
            </CardItem>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text
                  type="bold"
                  style={{ flex: 1, textAlign: 'center' }}
                >
                ریز سفارشات
                </Text>
              </CardItem>
            </Card>
            <CardItem cardBody>
              <FlatList
                data={this.state.product}
                renderItem={this.renderItem}
                keyExtractor={item => item.idbasket}
              />
            </CardItem>
            <CardItem bordered>
              <Text style={{ flex: 1 }}>
                وضعیت فاکتور:{' '}<Text style={{ color: mainColor }}>پرداخت شده</Text>
              </Text>
            </CardItem>
            {time &&
            <CardItem bordered>
              <Text style={{ flex: 1 }}>
                {'ساعت ارسال:'}
                {' '}
                {persianNumber(time.timefactor)}
                {' '}
                {this.renderDay(time.dateday)}
                {' '}
                {persianNumber(moment(time.dates).format('jYYYY/jM/jD'))}
              </Text>
            </CardItem>}
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
