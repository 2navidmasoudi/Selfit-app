import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Icon,
  Input,
  Item,
  Label, Left,
  ListItem, Right
} from 'native-base';
import { Alert, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { postAddressOrderBuffet, postFactor } from '../../../services/orderBuffet';
import AppHeader from '../../header';
import {reBasketBuffet, reBasketMaterial, refreshBuffet, setRoad, tokenBuffet} from '../../../redux/actions';
import { SignStyle } from '../../../assets/styles/sign';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { sendPrice } from '../../../services/Alopeyk';
import { getSingleBuffet } from '../../../services/buffet';

let lat;
let long;

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  materialBasket: state.basket.materialBasket,
  buffetBasket: state.basket.buffetBasket,
  buffetid: state.buffet.buffetid,
  Count1: state.basket.materialBasketCount,
  Count2: state.basket.buffetBasketCount,
  PriceAllBuffet: state.basket.PriceAllBuffet,
  PriceAllMaterial: state.basket.PriceAllMaterial,
}), {
  tokenBuffet,
  reBasketMaterial,
  reBasketBuffet,
  setRoad,
  refreshBuffet
})
export default class finalOrderBuffet extends Component {
  constructor() {
    super();
    this.state = {
      descfactor: '',
      sendServicePrice: 0,
      disableSendFactor: false,
    };
    this.sendOrderBuffet = this.sendOrderBuffet.bind(this);
  }
  componentWillMount() {
    this.getInfo();
    console.log(this.props, 'props');
  }
  componentWillUnmount() {
    this.props.refreshBuffet();
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.props.setRoad('buffet');
    await this.getSingleBuffet();
    this.sendPrice();
  }
  async getSingleBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { buffetid, tokenapi } = await this.props;
      const buffetInfo = await getSingleBuffet(buffetid, tokenmember, tokenapi);
      console.log('buffetInfo');
      console.log(buffetInfo);
      lat = buffetInfo.latgym;
      long = buffetInfo.longgym;
    } catch (e) {
      console.log(e);
    }
  }
  async sendOrderBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const { descfactor, sendServicePrice } = await this.state;
      const idfactor =
        await postFactor(buffetid, descfactor, 1, sendServicePrice, tokenmember, tokenapi);
      console.log(idfactor);
      const result = await postAddressOrderBuffet(idfactor, tokenmember, tokenapi);
      if (result === 1) {
        Alert.alert(
          'صدور فاکتور',
          'سفارش شما ثبت شد و به بوفه دار ارسال شد. لطفا منتظر تایید توسط بوفه دار باشید.',
          [
            { text: 'پیگیری سفارش', onPress: () => Actions.follow() },
            { text: 'بازگشت' },
          ]
        );
        Actions.reset('root');
        this.setState({ disableSendFactor: true });
      } else {
        this.setState({ disableSendFactor: false });
      }
      console.log(result);
    } catch (e) {
      this.setState({ disableSendFactor: false });
      console.log(e);
    }
  }
  async sendPrice() {
    try {
      const { lataddressmember, longaddressmember } = await this.props.address;
      const sendServicePrice = await sendPrice(lat, long, lataddressmember, longaddressmember);
      console.log(sendServicePrice);
      await this.setState({
        sendServicePrice: sendServicePrice.object.price,
      });
    } catch (e) {
      console.log(e);
    }
  }
  renderItem = ({ item }) => (
    <ListItem>
      <Left>
        <Text>{persianNumber((item.pricemenufood).toLocaleString())} تومان</Text>
      </Left>
      <Body>
        <Text style={{ textAlign: 'center' }}>{persianNumber(item.namemenufood)}</Text>
      </Body>
      <Right>
        <Text>{persianNumber(item.numbermenufood)} عدد</Text>
      </Right>
    </ListItem>
  );
  renderItem2 = ({ item }) => (
    <ListItem>
      <Left>
        <Text>{persianNumber((item.pricematerial).toLocaleString())} تومان</Text>
      </Left>
      <Body>
        <Text style={{ textAlign: 'center' }}>{persianNumber(item.namematerial)}</Text>
      </Body>
      <Right>
        <Text>{persianNumber(item.numbermaterial)} عدد</Text>
      </Right>
    </ListItem>
  );
  render() {
    const totalPrice =
      (this.props.PriceAllBuffet +
        this.props.PriceAllMaterial +
        (this.state.sendServicePrice * (3 / 5)))
        .toLocaleString();
    const addressTitle = Base64.decode(this.props.address.titleaddressmember);
    const sendPrice =
      this.state.sendServicePrice ? `${(this.state.sendServicePrice * (3 / 5)).toLocaleString()} تومان` : 'در حال بررسی';
    const {
      item, formInputText
    } = SignStyle;
    const FooterComponent =
      ((this.props.Count1 + this.props.Count2) === 0 || this.state.sendServicePrice === 0) ? null :
        (
          <Footer>
            <FooterTab>
              <Button
                style={{ backgroundColor: '#0F9D7A' }}
                disabled={this.state.disableSendFactor}
                onPress={this.sendOrderBuffet}
              >
                <Text style={{ color: 'white' }}>
                  صدور فاکتور
                </Text>
              </Button>
            </FooterTab>
          </Footer>
        );
    return (
      <Container>
        <AppHeader rightTitle="صدور فاکتور بوفه" backButton="flex" />
        <Content padder>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Text style={{ flex: 1, textAlign: 'center' }} type="bold">مشخصات فاکتور</Text>
            </CardItem>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text type="bold" style={{ flex: 1, marginHorizontal: 10 }}>غذای آماده</Text>
              </CardItem>
            </Card>
            <FlatList
              data={this.props.buffetBasket}
              renderItem={this.renderItem}
              scrollEnabled={false}
              keyExtractor={Food => Food.idmenufood}
            />
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text type="bold" style={{ flex: 1, marginHorizontal: 10 }}>غذای انتخابی</Text>
              </CardItem>
            </Card>
            <FlatList
              data={this.props.materialBasket}
              renderItem={this.renderItem2}
              scrollEnabled={false}
              keyExtractor={Material => Material.idmixmaterial}
            />
            <CardItem bordered>
              <Right style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>
                    به آدرس:{` ${addressTitle}`}
                </Text>
                <Text style={{ flex: 1 }}>
                    هزینه ارسال:{` ${persianNumber(sendPrice)}`}
                </Text>
                <Text style={{ flex: 1 }}>
                    توضیحات:{` ${this.state.descfactor}`}
                </Text>
              </Right>

            </CardItem>
            <CardItem bordered>
              <Text style={{ flex: 1 }}>
                  قیمت نهایی:{` ${persianNumber(totalPrice)} تومان`}
              </Text>
            </CardItem>
          </Card>
          <Item style={[item, { flex: 1 }]}>
            <Icon active name="clipboard" />
            <Input
              style={formInputText}
              value={this.state.descfactor}
              multiline
              onChangeText={descfactor => this.setState({ descfactor })}
            />
            <Label>توضیحات</Label>
          </Item>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
