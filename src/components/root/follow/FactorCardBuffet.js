import React from 'react';
import moment from 'moment-jalaali';
import { Card, CardItem, Left, Right } from 'native-base';
import { errorColor, mainColor } from '../../../assets/variables/colors';
import { persianNumber } from '../../../utils/persian';
import { Text } from '../../Kit';

export default ({ item }) => {
  const m = moment(`${item.datesavefactorbuffet}`, 'YYYY/MM/DDTHH:mm:ss').format('jYYYY/jMM/jDD HH:mm');
  return (
    <Card>
      <CardItem>
        <Left style={{ flex: 1 }}>
          <Text style={{ flex: 1 }}>به تاریخ: {persianNumber(m)}</Text>
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
      <CardItem>
        <Text style={{ flex: 1, color: item.idstatepayed === 2 ? errorColor : mainColor }}>
        وضعیت فاکتور: {item.namestatepayed}
        </Text>
      </CardItem>
    </Card>
  );
};
