import React, { Component } from 'react';
import { ImageBackground, TouchableWithoutFeedback, View, Alert } from 'react-native';
import { Icon, Item, Badge, Left, Content, Switch } from 'native-base';
import PropTypes from 'prop-types';
import { Base64 } from 'js-base64';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { drawer } from '../../assets/styles/index';
import { getSingleToken, putUserLogout } from '../../services';
import { Text } from '../Kit';
import { persianNumber } from '../../utils/persian';
import { setUser } from '../../redux/actions';
import { darkColor, mainColor, white } from '../../assets/variables/colors';
import { helpOff, helpReset } from '../../redux/actions/help';
import { setUserProperty } from '../../utils/analytics';

@connect(state => ({
  user: state.user,
  buffetBasketCount: state.basket.buffetBasketCount,
  materialBasketCount: state.basket.materialBasketCount,
  productBasketCount: state.basket.productBasketCount,
}), { setUser, helpReset, helpOff })
export default class DrawerLayout extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    setUser: PropTypes.func.isRequired,
    buffetBasketCount: PropTypes.number.isRequired,
    materialBasketCount: PropTypes.number.isRequired,
    productBasketCount: PropTypes.number.isRequired,
    helpReset: PropTypes.func.isRequired,
    helpOff: PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {
      Active: true
    };
    this.toggleHelp = this.toggleHelp.bind(this);
  }
  state = {
    Active: true,
  }
  async componentDidMount() {
    await this.getSingleMember();
  }
  async getSingleMember() {
    const {
      tokenmember,
      tokenapi,
      namefamilymember,
      phone,
      mailmember,
    } = await this.props.user;
    const MemberSingleToken = await getSingleToken(tokenmember, tokenapi);
    await this.props.setUser(MemberSingleToken);
    const nameFamily = await Base64.decode(namefamilymember);
    const mobile = await Base64.decode(phone);
    const email = await Base64.decode(mailmember);
    setUserProperty({
      name_family: nameFamily,
      mobile,
      email
    });
  }
  getRequestLogout() {
    Alert.alert(
      'اجازه خروج',
      'آیا می خواهید از حساب کاربری خود خارج شوید؟',
      [
        { text: 'خیر' },
        { text: 'بله', onPress: () => this.putUserLogout() },
      ], {
        cancelable: false,
      }
    );
  }
  toggleHelp(Active) {
    if (Active) {
      this.props.helpReset();
    } else {
      this.props.helpOff();
    }
    this.setState({ Active });
  }
  async putUserLogout() {
    const { tokenapi, tokenmember } = await this.props.user;
    const json = await putUserLogout(tokenmember, tokenapi);
    if (json === 1) {
      Actions.reset('sign');
    } else {
      Alert.alert(
        'خطا',
        'خطا در خروج از حساب کاربری!',
        [{ text: 'باشه' }]
      );
    }
  }
  render() {
    const {
      namefamilymember, phone,
      datesave, httpserver, pathserver, picmember
    } = this.props.user;
    const m = moment(`${datesave}`, 'YYYY-MM-DDTHH:mm:ss');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${Base64.decode(httpserver)}${Base64.decode(pathserver)}${ImgYear}/${ImgMonth}/${picmember}`;
    const Name = Base64.decode(namefamilymember);
    const phoneNumber = Base64.decode(phone);
    return (
      <View style={drawer.container}>
        <TouchableWithoutFeedback onPress={() => Actions.profile()}>
          <ImageBackground source={{ uri: ImgSrc }} style={drawer.imageHeader}>
            <View style={drawer.info}>
              <Text style={drawer.infoText}>{Name}</Text>
              <Text style={drawer.infoText}>{persianNumber(phoneNumber)}</Text>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
        <Content style={{ backgroundColor: darkColor }}>
          <Item
            style={drawer.item}
            onPress={() => {
            Actions.profile();
          }}
          >
            <Text style={drawer.itemTitle}>پروفایل</Text>
            <Icon name="person" color={mainColor} style={drawer.itemIcon} />
          </Item>
          <Item
            style={drawer.item}
            onPress={() => {
              Actions.buffetBasket();
            }}
          >
            <Left style={{ justifyContent: 'center' }}>
              <Badge style={{
                backgroundColor: '#0F9D7A',
                height: 30,
                width: 30,
                display: !(this.props.buffetBasketCount + this.props.materialBasketCount) ? 'none' : 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>
                  {persianNumber(this.props.buffetBasketCount + this.props.materialBasketCount)}
                </Text>
              </Badge>
            </Left>
            <Text style={drawer.itemTitle}>سبد خرید غذا</Text>
            <Icon name="basket" style={drawer.itemIcon} />
          </Item>
          <Item
            style={drawer.item}
            onPress={() => {
              Actions.productBasket();
            }}
          >
            <Left style={{ justifyContent: 'center' }}>
              <Badge style={{
                backgroundColor: '#0F9D7A',
                height: 30,
                width: 30,
                display: !(this.props.productBasketCount) ? 'none' : 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>
                  {persianNumber(this.props.productBasketCount)}
                </Text>
              </Badge>
            </Left>
            <Text style={drawer.itemTitle}>سبد خرید فروشگاه</Text>
            <Icon name="basket" style={drawer.itemIcon} />
          </Item>
          <Item style={drawer.item} onPress={() => Actions.follow()}>
            <Text style={drawer.itemTitle}>پیگیری سفارش</Text>
            <Icon name="card" style={drawer.itemIcon} />
          </Item>
          <Item style={drawer.item}>
            <Left style={{ justifyContent: 'center' }}>
              <Switch
                onTintColor={white}
                thumbTintColor={this.state.Active ? mainColor : undefined}
                value={this.state.Active}
                onValueChange={this.toggleHelp}

              />
            </Left>
            <Text style={drawer.itemTitle}>راهنمای برنامه</Text>
            <Icon name="help" style={[drawer.itemIcon, { marginHorizontal: 5 }]} />
          </Item>
          <Item style={drawer.item} onPress={() => Actions.support()}>
            <Text style={drawer.itemTitle}>پشتیبانی</Text>
            <Icon name="call" style={drawer.itemIcon} />
          </Item>
          <Item
            style={drawer.item}
            onPress={() => Actions.webView({ title: 'سایت سلفیت', url: 'https://selfit.ir/' })}
          >
            <Text style={drawer.itemTitle}>سایت سلفیت</Text>
            <Icon name="globe" style={drawer.itemIcon} />
          </Item>
          <Item style={drawer.item} onPress={() => Actions.complaints()}>
            <Text style={drawer.itemTitle}>شکایات و پیشنهادات</Text>
            <Icon name="bookmarks" style={drawer.itemIcon} />
          </Item>
          <Item style={drawer.item} onPress={() => this.getRequestLogout()}>
            <Text style={drawer.itemTitle}>خروج از حساب</Text>
            <Icon name="backspace" style={drawer.itemIcon} />
          </Item>
        </Content>
      </View>
    );
  }
}

