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
import { Actions } from 'react-native-router-flux';
import { postAddressOrderBuffet, postFactor } from '../../../services/orderBuffet';
import AppHeader from '../../header';
import { reBasketBuffet, reBasketMaterial, setRoad, tokenBuffet } from '../../../redux/actions';
import { SignStyle } from '../../../assets/styles/sign';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { FlatList } from 'react-native';
import { sendPrice } from '../../../services/Alopeyk';
import { getSingleBuffet } from '../../../services/buffet';
// TODO: ADD LIST FOR FINAL ORDER
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
})
export default class finalOrderBuffet extends Component {
  state = {
    active: true,
    state: false,
    min: 0,
    max: 30,
    fsort: 0,
    ssort: false,
    total: 0,
    descfactor: '',
    sendServicePrice: 3500,
    lat: null,
    long: null,
  };
  componentWillMount() {
    this.getInfo();
    console.log(this.props, 'props');
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.props.setRoad('buffet');
    await this._getSingleBuffet();
    // this._sendPrice();
  }
  async sendOrderBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const { descfactor } = await this.state;
      const idfactor = await postFactor(buffetid, descfactor, 1, tokenmember, tokenapi);
      console.log(idfactor);
      const result = await postAddressOrderBuffet(idfactor, tokenmember, tokenapi);
      if (result === 1) {
        alert('سفارش شما با موفقیت ثبت شد.');
        Actions.reset('root');
      }
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  async _getSingleBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { buffetid, tokenapi } = await this.props;
      const buffetInfo = await getSingleBuffet(buffetid, tokenmember, tokenapi);
      console.log('buffetInfo');
      console.log(buffetInfo);
      await this.setState({
        lat: buffetInfo.latgym,
        long: buffetInfo.longgym,
      });
    } catch (e) {
      console.log(e);
    }
  }
  // async _sendPrice() {
  //   try {
  //     const { lataddressmember, longaddressmember } = await this.props.address;
  //     const { lat, long } = await this.state;
  //     const sendServicePrice = await sendPrice(lat, long, lataddressmember, longaddressmember);
  //     console.log(sendServicePrice);
  //     await this.setState({
  //       sendServicePrice: sendServicePrice.object.price,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
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
    const totalPrice =
      (this.props.PriceAllBuffet + this.props.PriceAllMaterial + this.state.sendServicePrice*3/5)
        .toLocaleString();
    const addressTitle = Base64.decode(this.props.address.titleaddressmember);
    const {
      item, formInputText
    } = SignStyle;
    const FooterComponent = ((this.props.Count1 + this.props.Count2) === 0 && this.state.sendServicePrice === 0)  ? null :
      (<Footer>
        <FooterTab>
          <Button
            style={{ backgroundColor: '#0F9D7A' }}
            onPress={this.sendOrderBuffet.bind(this)}
          >
            <Text style={{
              color: 'white',
            }}
            >
              صدور فاکتور
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
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
              keyExtractor={item => item.idmenufood}
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
              keyExtractor={item => item.idmixmaterial}
            />
            <CardItem bordered>
              <Right style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>
                    به آدرس:{` ${addressTitle}`}
                </Text>
                <Text style={{ flex: 1 }}>
                    هزینه ارسال:{` ${persianNumber(this.state.sendServicePrice * 3 / 5)}تومان`}
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
