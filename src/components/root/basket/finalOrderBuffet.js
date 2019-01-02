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
  ListItem, Right, Spinner
} from 'native-base';
import { Alert, FlatList, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Base64 } from 'js-base64';
import PropTypes from 'prop-types';
import { postFactor } from '../../../services/orderBuffet';
import AppHeader from '../../header';
import { refreshBuffet, setRoad, tokenBuffet } from '../../../redux/actions';
import { SignStyle } from '../../../assets/styles/sign';
import { Text, TextInput } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { sendPrice } from '../../../services/Alopeyk';
import { getSingleBuffet } from '../../../services/buffet';
import { darkColor, mainColor, white } from '../../../assets/variables/colors';
import { logError } from '../../../services/log';
import { getPrice } from '../../../services/payment';
import { getSingleToken } from '../../../services';
import Loader from '../../loader';

let lat;
let long;
let codeInput = null;
@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  materialBasket: state.basket.materialBasket,
  buffetBasket: state.basket.buffetBasket,
  buffetid: state.buffet.buffetid,
}), {
  tokenBuffet,
  setRoad,
  refreshBuffet
})
export default class finalOrderBuffet extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    tokenBuffet: PropTypes.func.isRequired,
    setRoad: PropTypes.func.isRequired,
    refreshBuffet: PropTypes.func.isRequired,
    buffetBasket: PropTypes.arrayOf(PropTypes.node),
    materialBasket: PropTypes.arrayOf(PropTypes.node),
  };
  static defaultProps = {
    buffetBasket: [],
    materialBasket: [],
  };
  constructor() {
    super();
    this.state = {
      descfactor: '',
      sendServicePrice: 0,
      disableSendFactor: false,
      totalPrice: 0,
      Wallet: 0,
      Msg: 'لطفا کد تخفیف خود را وارد کنید.'
    };
    this.sendOrderBuffet = this.sendOrderBuffet.bind(this);
  }
  async componentWillMount() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.getSingleBuffet();
    await this.sendPrice();
    await this.getPrice();
    await this.getWallet();
    this.props.setRoad('buffet');
  }
  componentWillUnmount() {
    this.props.refreshBuffet();
  }
  async getPrice(code = null) {
    const { sendServicePrice } = await this.state;
    const { totalPrice, Msg } =
      await getPrice(1, this.props.user.tokenmember, sendServicePrice, code);
    this.setState({ totalPrice, Msg });
  }
  async getWallet() {
    const { tokenmember, tokenapi } = await this.props.user;
    const { Wallet } = await getSingleToken(tokenmember, tokenapi, true);
    this.setState({ Wallet });
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
  async sendOrderBuffet() {
    try {
      const { totalPrice, Wallet } = await this.state;
      if (totalPrice > Wallet) {
        const Diff = await totalPrice - Wallet;
        const DotedDiff = Diff.toLocaleString();
        const PersianDiff = await persianNumber(DotedDiff);
        Alert.alert(
          'درخواست شارژ کیف پول',
          `برای پرداخت این فاکتور باید کیف پول خود را شارژ کنید! میزان شارژ: ${PersianDiff} تومان`,
          [
            { text: 'بعدا' },
            { text: 'شارژ کیف پول', onPress: () => Actions.wallet({ Amount: Diff }) },
          ]
        );
      }
      this.setState({ disableSendFactor: true });
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const { descfactor, sendServicePrice } = await this.state;
      const idfactor = await postFactor(
        buffetid, descfactor, 3,
        sendServicePrice, tokenmember, tokenapi, codeInput
      );
      if (idfactor) {
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
    const addressTitle = Base64.decode(this.props.address.titleaddressmember);
    const sendPrices =
      this.state.sendServicePrice ?
        `${(this.state.sendServicePrice * (3 / 5)).toLocaleString()} تومان` :
        'در حال بررسی';
    const {
      item, formInputText
    } = SignStyle;
    const FooterComponent = this.state.totalPrice && this.state.Wallet ? (
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
      </Footer>) : (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color={mainColor} />
          <Text>
            درحال برقراری ارتباط با بوفه دار...
          </Text>
        </View>);
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
                    هزینه ارسال:{` ${persianNumber(sendPrices)}`}
                </Text>
              </Right>
            </CardItem>
            {this.state.Wallet && this.state.totalPrice
              ?
                <View>
                  <Card style={{ flex: 0 }}>
                    <CardItem>
                      <Text style={{ flex: 1, textAlign: 'center' }} type="bold">
                      کیف پول:{` ${persianNumber(this.state.Wallet.toLocaleString() || '?')} تومان`}
                      </Text>
                    </CardItem>
                  </Card>
                  <Card style={{ flex: 0 }}>
                    <CardItem>
                      <Text style={{ flex: 1, textAlign: 'center' }} type="bold">
                      قیمت نهایی:{` ${persianNumber(this.state.totalPrice.toLocaleString() || '?')} تومان`}
                      </Text>
                    </CardItem>
                  </Card>
                </View>
              :
                <Loader loading />
            }
          </Card>
          <Card>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text style={{ flex: 1, textAlign: 'center' }} type="bold">کد تخفیف</Text>
              </CardItem>
            </Card>
            <TextInput
              placeholder="کد تخفیف را اینجا وارد کنید."
              placeholderTextColor={darkColor}
              onChangeText={(text) => { codeInput = text; }}
              style={{ backgroundColor: mainColor, marginHorizontal: 10 }}
            />
            <CardItem bordered>
              <Text style={{ flex: 1 }}>
                پیام:{' '}{this.state.Msg}{'.'}
              </Text>
            </CardItem>
            <CardItem cardBody>
              <Button
                full
                style={{ flex: 1, backgroundColor: mainColor }}
                onPress={() => this.getPrice(codeInput)}
              >
                <Text style={{ color: white }}>اعمال کد تخفیف</Text>
              </Button>
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
            <Label>:توضیحات</Label>
          </Item>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
