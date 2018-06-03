import React, { Component } from 'react';
import { FlatList, ImageBackground, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import {
  Badge,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Icon,
  Left,
  Right,
  Spinner,
  Tab,
  Tabs,
} from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { getMenuFood } from '../../../services/buffet';
import { logError } from '../../../services/log';
import { getFoodCategory } from '../../../services/MenuFood';
import { getAllBuffetMaterial, postBasketMaterial } from '../../../services/orderMaterial';
import { receiveMaterial, receiveMenuFood, selectBuffet, setIDBasket, tokenBuffet } from '../../../redux/actions';
import FoodCard from './FoodCard';
import MaterialCard from './MaterialCard';
import { TabsStyle } from '../../../assets/styles/gym';
import { checkOrderBuffet, deleteOrderAll } from '../../../services/orderBuffet';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';

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

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  MenuFood: state.buffet.MenuFood,
  Count2: state.basket.materialBasketCount,
  Count1: state.basket.buffetBasketCount,
  // Count: state.basket.materialBasketCount + state.basket.buffetBasketCount,
  Material: state.buffet.Material,
  idbasket: state.basket.idbasket,
}), {
  selectBuffet,
  receiveMenuFood,
  receiveMaterial,
  tokenBuffet,
  setIDBasket,
})
export default class BuffetMenu extends Component {
  state = {
    ImgSrc: null,
    MenuFood: [],
    CountReady: false,
    totalPrice: 0,
    iddish: 1,
    max: 30,
    min: 0,
    ssort: true,
    fsort: 0,
  };
  componentWillMount() {
    this.getInfo();
  }
  componentDidMount() {
    setTimeout(this._tabs.goToPage.bind(this._tabs, 1), 100);
    setTimeout(this._tabs2.goToPage.bind(this._tabs2, 1), 500);
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.props.selectBuffet(this.props.buffetid);
    await this._getFoodCategory();
    await this._getMenuFood();
    await this._getMaterial();
    // await this._getDish();
    await this._checkOrderBuffet();
  }
  async _getFoodCategory() {
    try {
      const { tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const FoodCategory = await getFoodCategory(tokenmember, tokenapi);
      console.log('FoodCategory:', FoodCategory);
    } catch (error) {
      console.log(error);
    }
  }
  async _getMaterial() {
    try {
      const { buffetid, tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const MaterialList = await getAllBuffetMaterial(buffetid, false, tokenmember, tokenapi, 20, 0, false, 0);
      console.log(MaterialList);
      this.props.receiveMaterial(MaterialList);
    } catch (err) {
      logError(err, 'getAllBuffetMaterial', 'Buffet/BuffetMenu', '_getMaterial');
      console.log(err);
    }
  }
  async _getMenuFood() {
    try {
      const { buffetid, tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const MenuFood = await getMenuFood(buffetid, 0, tokenmember, tokenapi, 30, 0, true, 0);
      await this.props.receiveMenuFood(MenuFood);
      this.setState({ MenuFood });
      this.setState({ CountReady: true });
    } catch (err) {
      logError(err, '_getMenufood', 'Buffet/BuffetMenu', 'getMenuFood');
      console.log(err);
    }
  }
  // async _getDish() {
  //   try {
  //     const { tokenapi } = await this.props;
  //     const { tokenmember } = await this.props.user;
  //     const { max, min, ssort } = await this.state;
  //     const DishSize = await getAllDish(tokenmember, tokenapi, max, min, ssort);
  //     await this.setState({ iddish: DishSize[0].iddish });
  //     console.log(this.state);
  //   } catch (e) {
  //     console.log(e);
  //     logError(e, '_getDish', 'Buffet/BuffetMenu', 'getAllDish');
  //   }
  // }
  // TODO: get permission to delete the last basket;
  async _checkOrderBuffet() {
    try {
      const { buffetid, tokenapi, idbasket } = await this.props;
      const { tokenmember } = await this.props.user;
      const result = await checkOrderBuffet(buffetid, tokenmember, tokenapi);
      console.log(result, 'checkOrder');
      if (!idbasket || result === 1 || result === 2) {
        await this._postBasketMaterial();
      }
    } catch (e) {
      console.log(e);
    }
  }
  async _postBasketMaterial() {
    try {
      const { tokenapi, buffetid } = await this.props;
      const { tokenmember } = await this.props.user;
      const { iddish } = await this.state;
      const deleteOrder = await deleteOrderAll(tokenmember, tokenapi);
      console.log(deleteOrder, 'deleteOrder?');
      const idbasket = await postBasketMaterial(iddish, buffetid, tokenmember, tokenapi);
      this.props.setIDBasket(idbasket);
      console.log(idbasket, 'idbasket?');
    } catch (e) {
      console.log(e);
      logError(e, '_postBasketMaterial', 'Buffet/BuffetMenu', 'postBasketMaterial');
    }
  }
  renderItem({ item }) {
    return <FoodCard MenuFood={item} />;
  }
  renderMaterial({ item }) {
    return <MaterialCard Material={item} />;
  }
  render() {
    const FooterComponent = (this.props.Count1 + this.props.Count2) === 0 ? null :
      (<Footer>
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
      datesave, RateNumber, httpserver,
      pathserver, picbuffet, namebuffet, addressgym,
    } = this.props;
    const m = moment(`${datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${httpserver}${pathserver}${ImgYear}/${ImgMonth}/${picbuffet}`;
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
                  textAlign: 'center',
                  color: 'white',
                  margin: 10
                }}
                >
                  بوفه {namebuffet}
                </Text>
              </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
          <Tabs
            initialPage={1}
            locked
            ref={c => this._tabs = c}
            tabBarUnderlineStyle={TabsStyle.underLine}
          >
            <Tab
              heading="نظرات و اطلاعات"
              activeTextStyle={TabsStyle.activeText}
              textStyle={TabsStyle.text}
              activeTabStyle={TabsStyle.activeTab}
              tabStyle={TabsStyle.notActiveTabs}
            >
              <Card>
                <CardItem>
                  <Text>
                    آدرس: {addressgym}
                  </Text>
                </CardItem>
                <CardItem>
                  <Left style={{ flex: 1 }} />
                  <Right style={{ flex: 1 }}>
                    <Button
                      transparent
                      textStyle={{ color: '#87838B' }}
                    >
                      <Icon name="md-star" />
                      <Text>امتیاز: 5/{RateNumber}</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            </Tab>
            <Tab
              heading="منو"
              activeTextStyle={TabsStyle.activeText}
              textStyle={TabsStyle.text}
              activeTabStyle={TabsStyle.activeTab}
              tabStyle={TabsStyle.notActiveTabs}
            >
              <Tabs
                initialPage={1}
                ref={c => this._tabs2 = c}
                tabBarUnderlineStyle={TabsStyle.underLine}
              >
                <Tab
                  heading="منو انتخابی"
                  activeTextStyle={TabsStyle.activeText}
                  textStyle={TabsStyle.text}
                  activeTabStyle={TabsStyle.activeTab}
                  tabStyle={TabsStyle.notActiveTabs}
                >
                  {this.props.idbasket && <FlatList
                    data={this.props.Material}
                    renderItem={item => this.renderMaterial(item)}
                    keyExtractor={item => item.idmaterial}
                    ListEmptyComponent={() => <Spinner />}
                    scrollEnabled={false}
                    // onRefresh={this.handleRefresh.bind(this)}
                    // refreshing={this.state.refreshing}
                    // onEndReachedThreshold={0.5}
                    // ListFooterComponent={this.renderFooter.bind(this)}
                  />}
                </Tab>
                <Tab
                  heading="منو آماده"
                  activeTextStyle={TabsStyle.activeText}
                  textStyle={TabsStyle.text}
                  activeTabStyle={TabsStyle.activeTab}
                  tabStyle={TabsStyle.notActiveTabs}
                >
                  <FlatList
                    data={this.props.MenuFood}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.idmenufood}
                    ListEmptyComponent={() => <Spinner />}
                    scrollEnabled={false}
                    // onRefresh={this.handleRefresh.bind(this)}
                    // refreshing={this.state.refreshing}
                    // onEndReachedThreshold={0.5}
                    // ListFooterComponent={this.renderFooter.bind(this)}
                  />
                </Tab>
              </Tabs>
            </Tab>
          </Tabs>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
