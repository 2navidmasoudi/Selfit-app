import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Left,
  ListItem, Right, Spinner, Body
} from 'native-base';
import { Alert, FlatList, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Base64 } from 'js-base64';
import PropTypes from 'prop-types';
import { postFactor } from '../../../services/orderBuffet';
import AppHeader from '../../header';
import { refreshBuffet, setRoad, setWallet, tokenBuffet } from '../../../redux/actions';
import { Text, TextInput } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { sendPrice } from '../../../services/Alopeyk';
import { getSingleBuffet } from '../../../services/buffet';
import { darkColor, mainColor } from '../../../assets/variables/colors';
import { logError } from '../../../services/log';
import { getSingleToken } from '../../../services';
import Loader from '../../loader';

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
  setRoad,
  refreshBuffet,
  setWallet
})
export default class finalOrderBuffet extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    Count1: PropTypes.number,
    Count2: PropTypes.number,
    PriceAllBuffet: PropTypes.number,
    PriceAllMaterial: PropTypes.number,
    tokenBuffet: PropTypes.func.isRequired,
    setRoad: PropTypes.func.isRequired,
    refreshBuffet: PropTypes.func.isRequired,
    address: PropTypes.objectOf(PropTypes.node).isRequired,
  };
  static defaultProps = {
    Count1: 0,
    Count2: 0,
    PriceAllBuffet: 0,
    PriceAllMaterial: 0,
  };
  constructor() {
    super();
    this.state = {
      descfactor: '',
      sendServicePrice: 0,
      disableSendFactor: false,
    };
    this.sendOrderBuffet = this.sendOrderBuffet.bind(this);
  }
  async componentWillMount() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.props.setRoad('buffet');
    await this.getSingleBuffet();
    await this.getWallet();
    await this.sendPrice();
  }
  componentWillUnmount() {
    this.props.refreshBuffet();
  }
  async getSingleBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { buffetid, tokenapi } = await this.props;
      const buffetInfo = await getSingleBuffet(buffetid, tokenmember, tokenapi);
      lat = buffetInfo.latgym;
      long = buffetInfo.longgym;
    } catch (e) {
      logError(e, 'getSingleBuffet', 'finalOrderBuffet', 'Basket');
    }
  }
  async getWallet() {
    const { tokenmember, tokenapi } = await this.props.user;
    const { wallet } = await getSingleToken(tokenmember, tokenapi, true);
    this.props.setWallet(wallet);
  }
  async sendOrderBuffet() {
    try {
      const totalPrice =
        await (this.props.PriceAllBuffet +
          this.props.PriceAllMaterial +
          (this.state.sendServicePrice * (3 / 5)));
      if (totalPrice < 15000) {
        Alert.alert(
          'خطا',
          'میزان سفارش شما باید حداقل پانزده هزار تومان باشد!',
          [
            { text: 'باشه' },
          ]
        );
        return;
      }
      this.setState({ disableSendFactor: true });
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const { descfactor, sendServicePrice } = await this.state;
      const idfactor =
        await postFactor(buffetid, descfactor, 3, sendServicePrice, tokenmember, tokenapi);
      if (idfactor) {
        if (idfactor === -15) {
          Alert.alert(
            'خطا',
            'میزان سفارش شما باید حداقل بیست هزار تومان باشد!',
            [
              { text: 'باشه' },
            ]
          );
          return;
        }
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
        Alert.alert(
          'خطا',
          'خطا در صدور فاکتور، لطفا با پشتیبانی تماس بگیرید.',
          [
            { text: 'بازگشت' },
          ]
        );
        this.setState({ disableSendFactor: false });
      }
    } catch (e) {
      this.setState({ disableSendFactor: false });
      logError(e, 'sendOrderBuffet', 'finalOrderBuffet', 'Basket');
    }
  }
  async sendPrice() {
    try {
      const { lataddressmember, longaddressmember } = await this.props.address;
      const sendServicePrice = await sendPrice(lat, long, lataddressmember, longaddressmember);
      await this.setState({
        sendServicePrice: sendServicePrice.object.price,
      });
    } catch (e) {
      logError(e, 'sendPrice', 'finalOrderBuffet', 'Basket');
    }
  }
  renderItem = ({ item }) => (
    <ListItem>
      <Left style={{ flex: 0 }}>
        <Text>{persianNumber((item.pricemenufood).toLocaleString())} تومان</Text>
      </Left>
      <Body style={{ flex: 1, marginHorizontal: 5 }}>
        <Text style={{ textAlign: 'center' }}>{persianNumber(item.namemenufood)}</Text>
      </Body>
      <Right style={{ flex: 0 }}>
        <Text>{persianNumber(item.numbermenufood)} عدد</Text>
      </Right>
    </ListItem>
  );
  renderItem2 = ({ item }) => (
    <ListItem>
      <Left style={{ flex: 0 }}>
        <Text>{persianNumber((item.pricematerial).toLocaleString())} تومان</Text>
      </Left>
      <Body style={{ flex: 1, marginHorizontal: 5 }}>
        <Text style={{ textAlign: 'center' }}>{persianNumber(item.namematerial)}</Text>
      </Body>
      <Right style={{ flex: 0 }}>
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
    const sendPrices =
      this.state.sendServicePrice ?
        `${(this.state.sendServicePrice * (3 / 5)).toLocaleString()} تومان` :
        'در حال بررسی';
    const FooterComponent =
      ((this.props.Count1 + this.props.Count2) === 0
        || this.state.sendServicePrice === 0
        || this.state.disableSendFactor
      )
        ?
        (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Spinner color={mainColor} />
            <Text>
              درحال برقراری ارتباط با بوفه دار...
            </Text>
          </View>
        )
        :
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
            {this.props.materialBasket.length > 0 ?
              <Card style={{ flex: 0 }}>
                <CardItem>
                  <Text type="bold" style={{ flex: 1, marginHorizontal: 10 }}>غذای انتخابی</Text>
                </CardItem>
              </Card> : null}
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
                  هزینه ارسال:{` ${persianNumber(sendPrices)}`}
                </Text>
                {this.state.descfactor ?
                  <Text style={{ flex: 1 }}>
                  توضیحات:{` ${this.state.descfactor}`}
                  </Text> : null}
              </Right>
            </CardItem>
            <TextInput
              placeholder="توضیحات:"
              placeholderTextColor={darkColor}
              onChangeText={descfactor => this.setState({ descfactor })}
              style={{ backgroundColor: mainColor, marginHorizontal: 5 }}
              multiline
            />
            {totalPrice
              ?
                <View>
                  {this.props.user.wallet ?
                    <Card style={{ flex: 0 }}>
                      <CardItem>
                        <Text style={{ flex: 1, textAlign: 'center' }} type="bold">
                          کیف پول:{` ${persianNumber(this.props.user.wallet.toLocaleString() || '?')} تومان`}
                        </Text>
                      </CardItem>
                    </Card> : null}
                  <Card style={{ flex: 0 }}>
                    <CardItem>
                      <Text style={{ flex: 1, textAlign: 'center' }} type="bold">
                      قیمت نهایی:{` ${persianNumber(totalPrice.toLocaleString() || '?')} تومان`}
                      </Text>
                    </CardItem>
                  </Card>
                </View>
              :
                <Loader loading />
            }
          </Card>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
