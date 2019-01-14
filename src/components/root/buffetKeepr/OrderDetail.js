import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Button, Card, CardItem, Container, Content, Footer, FooterTab, Left, ListItem, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { errorColor, mainColor } from '../../../assets/variables/colors';
import { tokenBuffet } from '../../../redux/actions';
import { getOrderBuffet, putAcceptBuffet } from '../../../services/orders';

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
    buffetOrder: null,
    materialOrder: null,
  };
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.getOrderBuffet();
  }
  async getOrderBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, order } = await this.props;
      const active = await order.statepayedid === 6;
      const json =
        await getOrderBuffet(order.idfactorbuffet, active, tokenmember, tokenapi, 50, 0);
      const buffetOrder = await json.DataFirst.$values;
      const basketMaterial = await json.DataSecond.$values;
      let materialOrder = [];
      for (let i = 0; i < basketMaterial.length; i += 1) {
        for (let j = 0; j < basketMaterial[i].MixMaterialList.$values.length; j += 1) {
          materialOrder = [...materialOrder, basketMaterial[i].MixMaterialList.$values[j]];
        }
      }
      this.setState({ buffetOrder, materialOrder });
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
        Actions.pop({ refresh: { refresh: Math.random() } });
      }
    } catch (e) {
      console.log(e);
    }
  }
  renderStatePayed() {
    const { idstatepayed, acceptfactor } = this.props.order;
    if (idstatepayed === 6 && acceptfactor === true) {
      return (
        <Text>
          <Text style={{ color: mainColor }}>
            تایید شده
          </Text>
          {' '}و{' '}
          <Text style={{ color: errorColor }}>
            منتظر پرداخت
          </Text>
        </Text>
      );
    }
    if (idstatepayed === 1 && acceptfactor === true) {
      return (
        <Text>
          <Text style={{ color: mainColor }}>
            تایید شده
          </Text>
          {' '}و{' '}
          <Text style={{ color: mainColor }}>
            پرداخت شده، سفارش را آماده کنید!
          </Text>
        </Text>
      );
    }
    if (idstatepayed === 6 && acceptfactor === null) {
      return (
        <Text style={{ color: errorColor }}>
          منتظر تایید.
        </Text>
      );
    }
    if (idstatepayed === 6 && acceptfactor === false) {
      return (
        <Text style={{ color: errorColor }}>
          فاکتور رد شده.
        </Text>
      );
    }
    return (
      <Text style={{ color: errorColor }}>
        در حال بررسی!.
      </Text>
    );
  }
  renderFooter() {
    const { idstatepayed, acceptfactor } = this.props.order;
    if (idstatepayed === 6 && acceptfactor === true) {
      return (
        <Footer>
          <FooterTab>
            <Button
              success
            >
              <Text style={{ color: 'white' }}>
                فاکتور قبول شده و منتظر پرداخت است.
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
    if (idstatepayed === 1 && acceptfactor === true) {
      return (
        <Footer>
          <FooterTab>
            <Button
              style={{ backgroundColor: mainColor }}
            >
              <Text style={{ color: 'white' }}>
                درحال آماده سازی غذا
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
    if (idstatepayed === 6 && acceptfactor === null) {
      return (
        <Footer>
          <FooterTab>
            <Button
              full
              danger
              onPress={() => this.sendAccept(false)}
            >
              <Text style={{ color: 'white' }}>
                رد فاکتور
              </Text>
            </Button>
            <Button
              full
              success
              onPress={() => this.sendAccept(true)}
            >
              <Text style={{ color: 'white' }}>
                قبول فاکتور
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
    if (idstatepayed === 6 && acceptfactor === false) {
      return (
        <Footer>
          <FooterTab>
            <Button
              danger
            >
              <Text style={{ color: 'white' }}>
                فاکتور رد شده.
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
    return (
      <Footer>
        <FooterTab>
          <Button
            warning
          >
            <Text style={{ color: 'white' }}>
              درحال بررسی!
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    );
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
            <CardItem bordered>
              <Text style={{ flex: 1, marginHorizontal: 10 }}>
                توضیحات:  {order.descfactor ? order.descfactor : 'ندارد.'}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ flex: 1, textAlign: 'center' }}>
                وضعیت فاکتور: {this.renderStatePayed()}
              </Text>
            </CardItem>
            <CardItem bordered footer>
              <Right style={{ flex: 1 }}>
                <Text style={{ flex: 1, marginHorizontal: 10 }}>
                  هزینه ارسال:
                  {persianNumber(order.delivery.toLocaleString())} تومان
                </Text>
                <Text style={{ flex: 1, marginHorizontal: 10 }}>
                  سهم شما از هزینه ارسال:
                  {persianNumber((order.delivery * (3 / 10)).toLocaleString())} تومان
                </Text>
                <Text style={{ flex: 1, marginHorizontal: 10 }}>
                  قیمت نهایی سفارش:
                  {persianNumber(order.allpricefactorbuffet.toLocaleString())} تومان
                </Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
        {this.renderFooter()}
      </Container>
    );
  }
}

