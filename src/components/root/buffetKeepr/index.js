import React, { Component } from 'react';
import { Container, Header, Left, Right, Switch, Button, Icon } from 'native-base';
import { Alert, FlatList, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { getOrderBuffet, tokenBuffet } from '../../../redux/actions';
import { getSingleBuffet, putActiveBuffet } from '../../../services/buffet';
import { logError } from '../../../services/log';
import { getOrderBuffetAll } from '../../../services/orderBuffet';
import OrderCard from './orderCard';
import { Text } from '../../Kit';
import Loader from '../../loader';
import { darkColor, errorColor, mainColor, white } from '../../../assets/variables/colors';
// import { putCheckoutAll } from '../../../services/orders';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
  idOrderBuffet: state.basket.idOrderBuffet,
  idOrderMaterial: state.basket.idOrderMaterial,
  orderList: state.basket.orderBuffet,
  namebuffet: state.buffet.namebuffet,
}), {
  tokenBuffet,
  getOrderBuffet,
})
export default class BuffetKeeper extends Component {
  constructor() {
    super();
    this.state = {
      Active: true,
      refreshing: true,
      refresh: true,
      loading: true,
      pannelBtn: 'md-add',
      display: 'none'
    };
    this.putActiveBuffet = this.putActiveBuffet.bind(this);
    this.getOrderBuffet = this.getOrderBuffet.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
  }
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.setInfo();
  }
  async componentWillReceiveProps() {
    await this.setState({ refresh: true });
    console.log('GetProps!');
    if (this.state.refresh) { this.getOrderBuffet(); }
  }
  async setInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.checkActiveBuffet();
    await this.getOrderBuffet();
  }
  async getSingleBuffet() {
    try {
      const { tokenapi, buffetid } = await this.props;
      const { tokenmember } = await this.props.user;
      return await getSingleBuffet(buffetid, tokenmember, tokenapi);
    } catch (err) {
      console.log(err);
      logError(err, 'getSingleBuffet', 'root/buffetKeeper/index', 'getSingleBuffet');
    }
    return null;
  }
  async getOrderBuffet() {
    try {
      this.setState({ loading: true });
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const order =
        await getOrderBuffetAll(0, 0, 0, buffetid, tokenmember, tokenapi, 50, 0, 'idfactorbuffet%20desc');
      console.log(order);
      this.props.getOrderBuffet(order);
      this.setState({ refreshing: false, refresh: false, loading: false });
    } catch (e) {
      console.log(e);
      this.setState({ refreshing: false, refresh: false, loading: false });
    }
  }
  handleViewRef = (ref) => { this.view = ref; }
  async checkActiveBuffet() {
    try {
      const buffetInformation = await this.getSingleBuffet();
      const Active = await buffetInformation.activebuffet;
      this.setState({ Active });
    } catch (err) {
      console.log(err);
      logError(err, 'putActiveBuffet', 'root/buffetKeeper/index', 'putActiveBuffet77');
    }
  }
  async putActiveBuffet(Active) {
    try {
      const { tokenapi, buffetid } = await this.props;
      const { tokenmember } = await this.props.user;
      const result = await putActiveBuffet(buffetid, Active, tokenmember, tokenapi);
      if (result === 1) {
        const buffetInformation = await this.getSingleBuffet();
        const { activebuffet } = await buffetInformation;
        if (activebuffet) {
          Alert.alert('فعالیت بوفه', 'بوفه فعال شد.', [{ text: 'باشه' }]);
        } else {
          Alert.alert('فعالیت بوفه', 'بوفه تعطیل شد.', [{ text: 'باشه' }]);
        }
        this.setState({ Active: activebuffet });
      } else {
        Alert.alert('خطا', 'خطا در ارتباط با سرور', [{ text: 'باشه' }]);
      }
    } catch (err) {
      console.log(err);
      logError(err, 'putActiveBuffet', 'root/buffetKeeper/index', 'putActiveBuffet77');
    }
  }
  // async PutCheckoutAll() {
  //   const { tokenmember } = await this.props.user;
  //   const { tokenapi } = await this.props;
  //   try {
  //     const result = await putCheckoutAll(tokenmember, tokenapi);
  //     if (result === 1) {
  //       Alert.alert(
  //         'موفقیت',
  //         'درخواست شما با موفقیت ثبت شد. جهت اطلاعات بیشتر با پشتیبانی تماس بگیرید!',
  //         [{ text: 'باشه' }]
  //       );
  //     } else if (result === -4) {
  //       Alert.alert(
  //         'خطا',
  //         'فاکتوری از قبل ثبت نشده! جهت اطلاعات بیشتر با پشتیبانی تماس بگیرید!',
  //         [{ text: 'باشه' }]
  //       );
  //     } else {
  //       Alert.alert(
  //         'خطا',
  //         'مشکلی پیش آمده! جهت اطلاعات بیشتر با پشتیبانی تماس بگیرید!',
  //         [{ text: 'باشه' }]
  //       );
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   this.getOrderBuffet();
  //   Actions.refresh({ refresh: { refresh: Math.random() } });
  // }
  // togglePanel = () => {
  //   const { pannelBtn } = this.state;
  //   if (pannelBtn === 'md-add') {
  //     this.setState({ pannelBtn: 'md-close', display: 'flex' });
  //     this.view.slideInDown();
  //   } else {
  //     this.setState({ pannelBtn: 'md-add' });
  //     this.view.slideOutUp();
  //     setTimeout(() => this.setState({ display: 'none' }), 1000);
  //   }
  // }
  renderItem = ({ item }) => <OrderCard order={item} />
  render() {
    const YesOrNo = this.state.Active ? ' بله (سفارش می پذیرم)' : ' خیر (بوفه تعطیل است)';
    const color = this.state.Active ? darkColor : errorColor;
    const name = this.props.namebuffet || 'نامشخص';
    return (
      <Container>
        <AppHeader rightTitle="دریافت سفارش" backButton="flex" />
        <Header
          style={{ justifyContent: 'center', backgroundColor: mainColor }}
          androidStatusBarColor={darkColor}
          iosBarStyle="light-content"
        >
          <Left style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Icon
                name={this.state.pannelBtn}
                style={{ padding: 20 }}
                onPress={this.togglePanel}
                color={darkColor}
              />
              <Switch
                onTintColor={darkColor}
                thumbTintColor={darkColor}
                value={this.state.Active}
                onValueChange={this.putActiveBuffet}
              />
            </View>
          </Left>
          <Right style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: white, textAlign: 'center' }}>
                نام بوفه:{' '}
                <Text type="bold" style={{ color: darkColor }}>
                  {name}
                </Text>
              </Text>
              <Text style={{ color: white }}>
                فعالیت بوفه:
                <Text style={{ color }}>
                  {YesOrNo}
                </Text>
              </Text>
            </View>
          </Right>
        </Header>
        <View style={{ height: 1, backgroundColor: darkColor }} />
        <View ref={this.handleViewRef}>
          {/* <Header */}
          {/* style={{ justifyContent: 'center', backgroundColor: 'transparent', alignItems: 'center' }} */}
          {/* androidStatusBarColor={darkColor} */}
          {/* iosBarStyle="light-content" */}
          {/* > */}
          <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
            <Button
              style={{ backgroundColor: darkColor }}
              onPress={() => Actions.buffet()}
            >
              <Text style={{ color: white }}>
                  بوفه های اطراف
              </Text>
            </Button>
            <Button
              style={{ backgroundColor: darkColor }}
              onPress={() => Actions.support()}
            >
              <Text style={{ color: white }}>
                  تماس با پشتیبانی
              </Text>
            </Button>
          </View>
          {/* </Header> */}
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <FlatList
            data={this.props.orderList}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.idfactorbuffet}
            onRefresh={this.getOrderBuffet}
            refreshing={this.state.refreshing}
            ListEmptyComponent={<Loader loading={this.state.loading} />}
          />
        </View>
      </Container>
    );
  }
}
