import React, { Component } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { Button, Card, CardItem, Container, Content, Footer, FooterTab, Left, ListItem, Right } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment-jalaali';
import AppHeader from '../../header';
import { darkColor, errorColor, mainColor, white } from '../../../assets/variables/colors';
import { persianNumber } from '../../../utils/persian';
import { Text, TextInput } from '../../Kit';
import { tokenBuffet } from '../../../redux/actions';
import { getOrderBuffet, putFactorWallet } from '../../../services/orders';
import { getPrice } from '../../../services/payment';
import { getSingleToken } from '../../../services';
import { logError } from '../../../services/log';

let codeInput = null;
@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  tokenBuffet
})
export default class FactorBuffetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffetOrder: null,
      materialOrder: null,
      totalPrice: 0,
      Wallet: 0,
      Msg: 'لطفا کد تخفیف خود را وارد کنید.'
    };
    this.handleFooterPress = this.handleFooterPress.bind(this);
  }

  async componentWillMount() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.getOrderBuffet();
    await this.getPrice();
    await this.getWallet();
  }
  async getOrderBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, item } = await this.props;
      const active = true;
      const json =
        await getOrderBuffet(item.idfactorbuffet, active, tokenmember, tokenapi, 50, 0);
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
  async getPrice(code = null) {
    const { totalPrice, Msg } =
      await getPrice(1, this.props.user.tokenmember, this.props.sendPrice, code);
    this.setState({ totalPrice, Msg });
  }
  async getWallet() {
    const { tokenmember, tokenapi } = await this.props.user;
    const { Wallet } = await getSingleToken(tokenmember, tokenapi, true);
    this.setState({ Wallet });
  }
  async handleFooterPress() {
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
            { text: 'انصراف' },
            { text: 'شارژ کیف پول', onPress: () => Actions.wallet({ Amount: Diff }) },
          ]
        );
        return;
      }
      const { tokenmember } = await this.props.user;
      const result = await putFactorWallet(tokenmember, 'selfit.buffet', codeInput);
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
      console.log(e);
      await logError(e, 'handleFooterPress', 'finalOrderProduct', 'Basket');
    }
  }
  renderItem = ({ item }) => (
    <ListItem>
      <Left>
        <Text>{persianNumber((item.pricemenufood).toLocaleString())} تومان</Text>
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
        <Text>{persianNumber((item.pricematerial).toLocaleString())} تومان</Text>
      </Left>
      <Text style={{ textAlign: 'center' }}>{item.namematerial}</Text>
      <Right>
        <Text>{persianNumber(item.numbermaterial)} عدد</Text>
      </Right>
    </ListItem>
  );
  render() {
    const { item } = this.props;
    const m = moment(`${item.datesavefactorbuffet}`, 'YYYY/MM/DDTHH:mm:ss').format('jYYYY/jMM/jDD HH:mm');
    const statePayed = item.idstatepayed === 6 ?
      (
        <Text>
          <Text style={{ color: mainColor }}>
          تایید شده
          </Text>
          {' '}و{' '}
          <Text style={{ color: errorColor }}>
          منتظر پرداخت
          </Text>
        </Text>
      )
      :
      (
        <Text>
          <Text style={{ color: mainColor }}>
          پرداخت شده
          </Text>
          {' '}و{' '}
          <Text style={{ color: mainColor }}>
          درحال آماده سازی غذا!
          </Text>
        </Text>
      );
    const stateFactor = item.acceptfactor ? statePayed :
      (
        <Text style={{ color: errorColor }}>
        منتظر تایید توسط بوفه دار.
        </Text>
      );
    const totalPrice =
      this.state.totalPrice || item.finalpricefactorbuffet + (this.props.sendPrice * (3 / 5));
    const FooterComponent = (this.state.totalPrice && this.state.Wallet)
    && (item.acceptfactor && item.idstatepayed === 6 && this.props.sendPrice)
      ? (
        <Footer>
          <FooterTab>
            <Button
              style={{ backgroundColor: mainColor }}
              onPress={this.handleFooterPress}
            >
              <Text style={{ color: white }}>
                پرداخت: {persianNumber(totalPrice.toLocaleString() || '?')} تومان
              </Text>
            </Button>
          </FooterTab>
        </Footer>) : null;
    return (
      <Container>
        <AppHeader rightTitle="فاکتور خرید" />
        <Content padder>
          <Card>
            <CardItem>
              <Left style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>{persianNumber(m)}</Text>
              </Left>
              <Right style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>فاکتور خرید شماره:{' '}{persianNumber(item.idfactorbuffet)}</Text>
              </Right>
            </CardItem>
            <Card style={{ flex: 0 }}>
              <CardItem>
                <Text type="bold" style={{ flex: 1, marginHorizontal: 10 }}>غذای آماده</Text>
              </CardItem>
            </Card>
            <FlatList
              data={this.state.buffetOrder}
              renderItem={this.renderItem}
              scrollEnabled={false}
              keyExtractor={food => food.idmenufood}
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
              keyExtractor={material => material.idmixmaterial}
            />
            <CardItem>
              <Right style={{ flex: 1 }}>
                <Text style={{ flex: 1 }}>
              به آدرس: {item.titleaddressmember}
                </Text>
                <Text style={{ flex: 1 }}>
                  هزینه ارسال:{' '}{persianNumber((this.props.sendPrice * (3 / 5)).toLocaleString())} تومان
                </Text>
                <Text style={{ flex: 1 }}>
              توضیحات: {item.descfactor || 'ندارد.'}
                </Text>
              </Right>
            </CardItem>
            {this.state.Wallet && this.state.totalPrice && item.statepayedid !== 1
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
                <CardItem bordered>
                  <Text style={{ flex: 1 }}>
                  قیمت نهایی فاکتور: {persianNumber((totalPrice).toLocaleString())} تومان
                  </Text>
                </CardItem>
            }
            <CardItem bordered>
              <Text style={{ flex: 1, textAlign: 'center' }}>
            وضعیت فاکتور: {stateFactor}
              </Text>
            </CardItem>
          </Card>
          {item.statepayedid !== 1 && this.state.totalPrice !== 0 &&
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
          </Card>}
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
