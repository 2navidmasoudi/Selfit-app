import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Card, CardItem, Content, Separator } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { getFactorBuffet } from '../../../services/orderBuffet';
import { tokenBuffet, tokenStore } from '../../../redux/actions';
import { Text } from '../../Kit';
import { getFactorProduct } from '../../../services/orderProduct';
import FactorCard from './FactorCardBuffet';
import { persianNumber } from '../../../utils/persian';
import { mainColor } from '../../../assets/variables/colors';

@connect(state => ({
  user: state.user,
  tokenapiBuffet: state.buffet.tokenapi,
  tokenapiProduct: state.store.tokenapi,

}), {
  tokenBuffet,
  tokenStore,
})
export default class List2 extends Component {
  state = {
    max: 50,
    min: 0,
    ssort: false,
    fsort: 0,
    payedFactor: null,
    payedFactorProduct: null,
    refreshing: true,
    refreshingP: true,

  };
  async componentWillMount() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.props.tokenStore('selfit.store');
    this.getInfo();
  }
  async getInfo() {
    this.getPayedFactors();
    this.getPayedFactorsProduct();
  }
  async getPayedFactors() {
    try {
      this.setState({ refreshing: true });
      const { tokenmember } = await this.props.user;
      const { tokenapiBuffet } = await this.props;
      const { max, min, ssort, fsort } = await this.state;
      const payedFactor = await getFactorBuffet(
        1, 1,
        tokenmember, 'selfit.buffet',
        max, min, ssort, fsort
      );
      this.setState({ payedFactor });
      this.setState({ refreshing: false });
    } catch (e) {
      console.log(e);
      this.setState({ refreshing: false });
    }
  }
  async getPayedFactorsProduct() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapiProduct } = await this.props;
      const { max, min, ssort, fsort } = await this.state;
      const payedFactorProduct = await getFactorProduct(
        false,
        tokenmember, 'selfit.store',
        max, min, null
      );
      console.log('payedFactorProduct');
      console.log(payedFactorProduct);
      this.setState({ payedFactorProduct });
      this.setState({ refreshingP: false });
    } catch (e) {
      console.log(e);
      this.setState({ refreshingP: false });
    }
  }
  renderItem = ({ item }) => {
    const m = moment(`${item.datesavefactorbuffet}`, 'YYYY/MM/DDTHH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss');
    return (
      <FactorCard item={item} />
    );
  };
  renderItem2 = ({ item }) => {
    const m = moment(`${item.datesaveorder}`, 'YYYY/MM/DDTHH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss');
    return (
      <TouchableOpacity onPress={() => Actions.followProduct({ factor: item })}>
        <Card>
          <CardItem>
            <Text style={{ flex: 1 }}>
              تاریخ: {persianNumber(m)}
            </Text>
            <Text style={{ flex: 1 }}>
              فاکتور شماره: {persianNumber(item.factorid)}
            </Text>
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
                {persianNumber(item.finalpricefactor.toLocaleString())} تومان
              </Text>
            </Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <Content padder>
        <Separator>
          <Text type="bold" style={{ flex: 1, textAlign: 'center', padding: 5 }}>بوفه</Text>
        </Separator>
        <FlatList
          data={this.state.payedFactor}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idfactorbuffet}
          ListEmptyComponent={<Text style={{ marginRight: 20 }}>هیچ فاکتوری دریافت نشد...</Text>}
          refreshing={this.state.refreshing}
          // onRefresh={() => <Spinner />}
          scrollEnabled={false}
          onEndReachedThreshold={0.5}
        />
        <Separator>
          <Text type="bold" style={{ flex: 1, textAlign: 'center', padding: 5 }}>فروشگاه</Text>
        </Separator>
        <FlatList
          data={this.state.payedFactorProduct}
          renderItem={item => this.renderItem2(item)}
          keyExtractor={item => item.factorid}
          ListEmptyComponent={<Text style={{ marginRight: 20 }}>هیچ فاکتوری دریافت نشد...</Text>}
          refreshing={this.state.refreshingP}
          scrollEnabled={false}
          onEndReachedThreshold={0.5}
        />
      </Content>
    );
  }
}
