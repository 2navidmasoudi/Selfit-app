import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Card, CardItem, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { errorColor, mainColor, white } from '../../../assets/variables/colors';
import { persianNumber } from '../../../utils/persian';
import { Text } from '../../Kit';
import { tokenBuffet } from '../../../redux/actions';
import PayButton from './payButton';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  tokenBuffet
})
export default class FactorBuffet extends Component {
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
    const payBtn = (item.acceptfactor && item.idstatepayed === 2) ?
      <PayButton />
      : null;
    return (
      <TouchableOpacity onPress={() => Actions.followBuffet({ item })}>
        <Card>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <Text style={{ flex: 1 }}>{persianNumber(m)}</Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <Text style={{ flex: 1 }}>فاکتور خرید شماره: {persianNumber(item.idfactorbuffet)}</Text>
            </Right>
          </CardItem>
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
          <CardItem bordered>
            <Text style={{ flex: 1 }}>
            قیمت نهایی فاکتور: {persianNumber(item.finalpricefactorbuffet.toLocaleString())} تومان
            </Text>
          </CardItem>
          <CardItem bordered>
            <Text style={{ flex: 1, textAlign: 'center' }}>
            وضعیت فاکتور: {stateFactor}
            </Text>
          </CardItem>
          {payBtn}
        </Card>
      </TouchableOpacity>
    );
  }
}
