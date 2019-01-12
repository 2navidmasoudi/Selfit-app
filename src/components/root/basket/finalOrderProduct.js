import React, { Component } from 'react';
import { FlatList, Alert, View } from 'react-native';
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
  ListItem,
  Right
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Base64 } from 'js-base64';
import PropTypes from 'prop-types';
import AppHeader from '../../header';
import { setProductPriceAll, setRoad, tokenStore } from '../../../redux/actions';
import { getPrice } from '../../../services/payment';
import {
  FactorWalletProduct,
  postFactorProduct,
  putTimeFactor
} from '../../../services/orderProduct';
import { Text, TextInput } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { darkColor, mainColor, white } from '../../../assets/variables/colors';
import { logError } from '../../../services/log';
import { getSingleToken } from '../../../services';
import Loader from '../../loader';

let codeInput = null;
@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
  totalPrice: state.basket.PriceAllProduct,
  idtimefactor: state.basket.idtimefactor,
  descProduct: state.basket.descProduct,
  productBasket: state.basket.productBasket,
}), {
  tokenStore,
  setRoad,
  setProductPriceAll,
})
export default class finalOrderProduct extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    setRoad: PropTypes.func.isRequired,
    tokenStore: PropTypes.func.isRequired,
    descProduct: PropTypes.string,
  };
  static defaultProps = {
    descProduct: '',
  };
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
      Wallet: null,
      Msg: 'لطفا کد تخفیف خود را وارد کنید.'
    };
    this.handleFooterPress = this.handleFooterPress.bind(this);
  }
  async componentWillMount() {
    await this.props.tokenStore('selfit.store');
    await this.getPrice();
    await this.getWallet();
    this.props.setRoad('Store');
  }
  async getPrice(code = null) {
    const { totalPrice, Msg } =
      await getPrice(2, this.props.user.tokenmember, 0, code);
    this.setState({ totalPrice, Msg });
  }
  async getWallet() {
    const { tokenmember, tokenapi } = await this.props.user;
    const { Wallet } = await getSingleToken(tokenmember, tokenapi, true);
    this.setState({ Wallet });
  }
  async putTimeFactor(idfactor) {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, idtimefactor } = await this.props;
      await putTimeFactor(idfactor, idtimefactor, tokenmember, tokenapi);
    } catch (e) {
      await logError(e, 'postAddressProduct', 'finalOrderProduct', 'Basket');
    }
    return 0;
  }
  async handleFooterPress() {
    try {
      const { totalPrice, Wallet } = await this.state;
      if (Wallet === null) return;
      if (totalPrice > Wallet) {
        const Diff = await totalPrice - Wallet;
        const DotedDiff = Diff.toLocaleString();
        const PersianDiff = await persianNumber(DotedDiff);
        Alert.alert(
          'درخواست شارژ کیف پول',
          `برای پرداخت این فاکتور باید کیف پول خود را شارژ کنید! میزان شارژ: ${PersianDiff} تومان`,
          [
            { text: 'انصراف' },
            { text: 'شارژ کیف پول', onPress: () => Actions.wallet({ Amount: Diff }) },
          ]
        );
        return;
      }
      const { tokenmember } = await this.props.user;
      const { tokenapi, idtimefactor, descProduct } = await this.props;
      const idfactor =
        await postFactorProduct(idtimefactor, descProduct, 3, tokenmember, tokenapi, codeInput);
      if (!idfactor) {
        Alert.alert(
          'خطا',
          'میزان سفارش شما باید حداقل ده هزار تومان باشد!',
          [
            { text: 'باشه' },
          ]
        );
        return;
      }
      await this.putTimeFactor(idfactor);
      const result = await FactorWalletProduct(tokenmember, 'selfit.store', codeInput);
      if (result === 1) {
        Alert.alert(
          'موفقیت',
          'سفارش شما با موفقیت ثبت شد و از کیف پول شما کسر گردید.',
          [
            { text: 'باشه' },
          ]
        );
        Actions.reset('root');
      } else {
        Alert.alert(
          'خطا',
          'خطایی ناخواسته در پرداخت از کیف پول پیش آمده، لطفا با پشتیبانی تماس بگیرید.',
          [
            { text: 'باشه' },
          ]
        );
      }
    } catch (e) {
      await logError(e, 'handleFooterPress', 'finalOrderProduct', 'Basket');
    }
  }
  renderItem = ({ item }) => (
    <ListItem>
      <Left>
        <Text>{persianNumber((item.priceproduct).toLocaleString())} تومان</Text>
      </Left>
      <Text>{persianNumber(item.titleproduct)}</Text>
      <Right>
        <Text>{persianNumber(item.numberbasket)} عدد</Text>
      </Right>
    </ListItem>
  );
  render() {
    const addressTitle = Base64.decode(this.props.address.titleaddressmember);
    const FooterComponent = this.state.totalPrice ? (
      <Footer>
        <FooterTab>
          <Button
            style={{ backgroundColor: mainColor }}
            onPress={this.handleFooterPress}
          >
            <Text style={{ color: white }}>
              پرداخت: {persianNumber(this.state.totalPrice.toLocaleString() || '?')} تومان
            </Text>
          </Button>
        </FooterTab>
      </Footer>) : <Loader loading />;
    return (
      <Container>
        <AppHeader rightTitle="صدور فاکتور فروشگاه" />
        <Content padder>
          <Card>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text style={{ flex: 1, textAlign: 'center' }} type="bold">مشخصات فاکتور</Text>
              </CardItem>
            </Card>
            <FlatList
              data={this.props.productBasket}
              renderItem={this.renderItem}
              keyExtractor={item => item.idproduct}
              scrollEnabled={false}
            />
            <CardItem bordered>
              <Right style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>
                  به آدرس:{` ${addressTitle}`}
                </Text>
                <Text style={{ flex: 1 }}>
                  توضیحات:{` ${this.props.descProduct || 'ندارد.'}`}
                </Text>
              </Right>
            </CardItem>
            {this.state.totalPrice
              ?
                <View>
                  {this.state.Wallet ?
                    <Card style={{ flex: 0 }}>
                      <CardItem>
                        <Text style={{ flex: 1, textAlign: 'center' }} type="bold">
                          کیف پول:{` ${persianNumber(this.state.Wallet.toLocaleString() || '?')} تومان`}
                        </Text>
                      </CardItem>
                    </Card> : null}
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
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
