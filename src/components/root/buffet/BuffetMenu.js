import React, { Component } from 'react';
import { Alert, FlatList, ImageBackground, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import {
  Badge,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Icon,
  Tab,
  Tabs,
} from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { getMenuFood } from '../../../services/buffet';
import { logError } from '../../../services/log';
import { getAllBuffetMaterial, postBasketMaterial } from '../../../services/orderMaterial';
import {
  receiveMaterial,
  receiveMenuFood,
  resetFood,
  selectBuffet,
  setIDBasket,
  tokenBuffet
} from '../../../redux/actions';
import FoodCard from './FoodCard';
import MaterialCard from './MaterialCard';
import { TabsStyle } from '../../../assets/styles/gym';
import { checkOrderBuffet, deleteOrderAll } from '../../../services/orderBuffet';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import {errorColor, mainColor, white} from '../../../assets/variables/colors';
import Loader from '../../loader';

moment.loadPersian({ dialect: 'persian-modern' });
const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  bar: {
    flex: 1,
    margin: 10,
    // height: 32,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
});

const iddish = 1;
@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  MenuFood: state.buffet.MenuFood,
  Count2: state.basket.materialBasketCount,
  Count1: state.basket.buffetBasketCount,
  Material: state.buffet.Material,
  idbasket: state.basket.idbasket,
}), {
  selectBuffet,
  receiveMenuFood,
  receiveMaterial,
  tokenBuffet,
  setIDBasket,
  resetFood
})
export default class BuffetMenu extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    Count2: PropTypes.number,
    Count1: PropTypes.number,
    resetFood: PropTypes.func.isRequired,
    selectBuffet: PropTypes.func.isRequired,
    receiveMenuFood: PropTypes.func.isRequired,
    receiveMaterial: PropTypes.func.isRequired,
    tokenBuffet: PropTypes.func.isRequired,
    setIDBasket: PropTypes.func.isRequired,
    buffetid: PropTypes.number.isRequired,
    namebuffet: PropTypes.string.isRequired,
    datesave: PropTypes.string.isRequired,
    httpserver: PropTypes.string.isRequired,
    activebuffet: PropTypes.bool.isRequired,
    pathserver: PropTypes.string.isRequired,
    picbuffet: PropTypes.string.isRequired,
    addressgym: PropTypes.string.isRequired,
  };
  static defaultProps = {
    Count2: PropTypes.number,
    Count1: PropTypes.number,
  };
  state = {
    loadingFood: true,
    loadingMaterial: true,
  };
  async componentWillMount() {
    await this.props.resetFood();
    await this.props.tokenBuffet('selfit.buffet');
    if (this.props.user.typememberid !== 5) {
      await this.props.selectBuffet(this.props.buffetid, this.props.namebuffet);
    }
    this.getMenuFood();
    this.getMaterial();
    this.checkOrderBuffet();
  }
  async getMaterial() {
    try {
      this.setState({ loadingMaterial: true });
      const { buffetid, tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const MaterialList =
        await getAllBuffetMaterial(buffetid, false, tokenmember, tokenapi, 120, 0);
      this.props.receiveMaterial(MaterialList);
      this.setState({ loadingMaterial: false });
    } catch (err) {
      this.setState({ loadingMaterial: false });
      logError(err, 'getAllBuffetMaterial', 'Buffet/BuffetMenu', '_getMaterial');
    }
  }
  async getMenuFood() {
    try {
      this.setState({ loadingFood: true });
      const { buffetid, tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const MenuFood = await getMenuFood(buffetid, 0, tokenmember, tokenapi, 120, 0, null);
      await this.props.receiveMenuFood(MenuFood);
      this.setState({ loadingFood: false });
    } catch (err) {
      this.setState({ loadingFood: false });
      logError(err, 'getMenufood', 'Buffet/BuffetMenu', 'getMenuFood');
    }
  }
  async checkOrderBuffet() {
    try {
      const { buffetid, tokenapi, idbasket, Count1, Count2 } = await this.props;
      const { tokenmember } = await this.props.user;
      const result = await checkOrderBuffet(buffetid, tokenmember, tokenapi);
      if (!idbasket) {
        await this.postBasketMaterial();
      } else if (result === 1) {
        if (Count1 || Count2) {
          Alert.alert(
            'وضعیت سفارش',
            'شما قبلا از بوفه ی دیگری سفارش داده بودید، آیا می خواهید سفارش های قبلی خود را حذف کنید؟',
            [
              { text: 'خیر', onPress: () => Actions.pop() },
              { text: 'بله', onPress: () => this.postBasketMaterial() },
            ], {
              cancelable: false,
            }
          );
        } else this.postBasketMaterial();
      } else if (result === 2) {
        Alert.alert(
          'وضعیت سفارش',
          'شما قبلا از فاکتوری صادر کرده بودید، آیا می خواهید فاکتور قبلی خود را حذف کنید؟',
          [
            { text: 'خیر', onPress: () => Actions.pop() },
            { text: 'بله', onPress: () => this.postBasketMaterial() },
          ], {
            cancelable: false,
          }
        );
      }
    } catch (e) {
      logError(e, 'checkOrderBuffet', 'postBasketMaterial', 'checkOrderBuffet');
    }
  }
  async postBasketMaterial() {
    try {
      const { tokenapi, buffetid } = await this.props;
      const { tokenmember } = await this.props.user;
      const deleteOrder = await deleteOrderAll(tokenmember, tokenapi);
      if (deleteOrder !== 1) return;
      const idbasket = await postBasketMaterial(iddish, buffetid, tokenmember, tokenapi);
      this.props.setIDBasket(idbasket);
    } catch (e) {
      logError(e, 'postBasketMaterial', 'Buffet/BuffetMenu', 'postBasketMaterial');
    }
  }
  render() {
    const FooterComponent = (this.props.Count1 + this.props.Count2) === 0 ? null : (
      <Footer>
        <FooterTab>
          <Button
            badge
            full
            style={{
                    paddingTop: 15,
                    backgroundColor: '#0F9D7A'
                  }}
            onPress={() => Actions.buffetBasket()}
          >
            <Badge style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>
                {persianNumber(this.props.Count1 + this.props.Count2)}
              </Text>
            </Badge>
            <Icon name="basket" style={{ color: 'white' }} />
            <Text style={{ fontSize: 18, color: 'white' }}>
              سبد سفارش
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
    const {
      datesave, httpserver, activebuffet,
      pathserver, picbuffet, namebuffet, addressgym,
    } = this.props;
    const m = moment(`${datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${httpserver}${pathserver}${ImgYear}/${ImgMonth}/${picbuffet}`;
    const activity = activebuffet ? 'بوفه سفارش می پذیرد.' : 'بوفه در حال حاضر تعطیل است.';
    return (
      <Container>
        <AppHeader rightTitle="بوفه آنلاین" backButton="flex" />
        <Content>
          <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
            <ImageBackground
              source={{ uri: ImgSrc }}
              style={{ flex: 1, height: 170, backgroundColor: 'black' }}
              imageStyle={{ opacity: 0.5 }}
            >
              <View style={styles.bar}>
                <Text style={{
                  color: 'white',
                }}
                >
                  بوفه {namebuffet}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 12
                  }}
                  type="light"
                >
                  آدرس:{''}{addressgym}
                </Text>
                <Text style={{
                  textAlign: 'center',
                  color: activebuffet ? mainColor : errorColor,
                  margin: 10
                }}
                >
                  {activity}
                </Text>
              </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
          <Tabs
            locked
            ref={(c) => { this.tabs = c; }}
            tabBarUnderlineStyle={TabsStyle.underLine}
          >
            <Tab
              heading="منو بوفه"
              activeTextStyle={TabsStyle.activeText}
              textStyle={TabsStyle.text}
              activeTabStyle={TabsStyle.activeTab}
              tabStyle={TabsStyle.notActiveTabs}
            >
              <FlatList
                data={this.props.MenuFood}
                renderItem={({ item }) => <FoodCard MenuFood={item} active={activebuffet} />}
                keyExtractor={item => item.idmenufood}
                ListEmptyComponent={<Loader loading={this.state.loadingFood} />}
                scrollEnabled={false}
              />
            </Tab>
            <Tab
              heading="بشقابت رو بساز"
              activeTextStyle={TabsStyle.activeText}
              textStyle={TabsStyle.text}
              activeTabStyle={TabsStyle.activeTab}
              tabStyle={TabsStyle.notActiveTabs}
            >
              {this.props.idbasket && <FlatList
                data={this.props.Material}
                renderItem={({ item }) =>
                  <MaterialCard Material={item} active={activebuffet} />}
                keyExtractor={item => item.idmaterial}
                ListEmptyComponent={<Loader loading={this.state.loadingMaterial} />}
                scrollEnabled={false}
              />}
            </Tab>
          </Tabs>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
