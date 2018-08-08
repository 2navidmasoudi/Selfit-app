import React, { Component } from 'react';
import { ImageBackground, TouchableWithoutFeedback, View, Alert } from 'react-native';
import { Icon, Item, Badge, Left, Content } from 'native-base';
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

@connect(state => ({
  user: state.user,
  buffetBasketCount: state.basket.buffetBasketCount,
  materialBasketCount: state.basket.materialBasketCount,
  productBasketCount: state.basket.productBasketCount,
}), { setUser })
export default class DrawerLayout extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    setUser: PropTypes.func.isRequired,
    buffetBasketCount: PropTypes.number.isRequired,
    materialBasketCount: PropTypes.number.isRequired,
    productBasketCount: PropTypes.number.isRequired,
  }
  componentDidMount() {
    this.getSingleMember();
  }
  async getSingleMember() {
    const { tokenmember, tokenapi } = await this.props.user;
    const json = await getSingleToken(tokenmember, tokenapi);
    await this.props.setUser(json.MemberSingleToken);
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
        <Content>
          <Item
            style={drawer.item}
            onPress={() => {
            Actions.profile();
          }}
          >
            <Text>پروفایل</Text>
            <Icon name="person" style={drawer.itemIcon} />
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
            <Text>سبد خرید غذا</Text>
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
            <Text>سبد خرید فروشگاه</Text>
            <Icon name="basket" style={drawer.itemIcon} />
          </Item>
          <Item style={drawer.item} onPress={() => Actions.follow()}>
            <Text>پیگیری سفارش</Text>
            <Icon name="call" style={drawer.itemIcon} />
          </Item>
          <Item style={drawer.item} onPress={() => Actions.support()}>
            <Text>پشتیبانی</Text>
            <Icon name="call" style={drawer.itemIcon} />
          </Item>
          <Item
            style={drawer.item}
            onPress={() => Actions.webView({ title: 'درباره ما', url: 'https://selfit.ir/#/Home/Index' })}
          >
            <Text>درباره ما</Text>
            <Icon name="bookmarks" style={drawer.itemIcon} />
          </Item>
          <Item style={drawer.item} onPress={() => Actions.complaints()}>
            <Text>شکایات و پیشنهادات</Text>
            <Icon name="bookmarks" style={drawer.itemIcon} />
          </Item>
          <Item style={drawer.item}>
            <Text>راهنمای برنامه</Text>
            <Icon name="help" style={drawer.itemIcon} />
          </Item>
          <Item
            style={drawer.item}
            onPress={() => Actions.webView({ title: 'قوانین و تعهدات', url: 'https://selfit.ir/#/Home/Law' })}
          >
            <Text>قوانین و تعهدات</Text>
            <Icon name="help" style={drawer.itemIcon} />
          </Item>
          <Item style={drawer.item} onPress={() => this.getRequestLogout()}>
            <Text>خروج از حساب</Text>
            <Icon name="backspace" style={drawer.itemIcon} />
          </Item>
        </Content>
      </View>
    );
  }
}

