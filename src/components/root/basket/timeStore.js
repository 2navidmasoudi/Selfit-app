import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Footer, FooterTab, Icon, Input, Item, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { setDescProduct, setProductIDAccess, setRoad, tokenStore } from '../../../redux/actions';
import { SignStyle } from '../../../assets/styles/sign';
import { getTimeAccessStore } from '../../../services/orderProduct';
import { Modal, Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { mainColor, white } from '../../../assets/variables/colors';
import { helpDoneStoreTime } from '../../../redux/actions/help';
import Pic1 from '../../../assets/helpPics/Store/StoreTimeSelect.png';
import Pic2 from '../../../assets/helpPics/Store/StoreAddress.png';

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
  Count: state.basket.productBasketCount,
  totalPrice: state.basket.PriceAllProduct,
  productBasket: state.basket.productBasket,
  help: state.help.StoreTime,
}), {
  tokenStore,
  setRoad,
  setDescProduct,
  setProductIDAccess,
  helpDoneStoreTime
})
export default class TimeStore extends Component {
  state = {
    active: true,
    min: 0,
    max: 30,
    fsort: 0,
    ssort: false,
    selected: false,
    selectedTime: null,
    TimeAccess: null,
    descProducet: '',
    ModalNumber: 0,
  };
  componentWillMount() {
    if (!this.props.help) {
      this.setState({ ModalNumber: 1 });
    }
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenStore('selfit.store');
    await this._getTimeAccessStore();
  }
  async _getTimeAccessStore() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { max, min, ssort } = await this.state;
      const TimeAccess = await getTimeAccessStore(tokenmember, tokenapi, max, min, ssort);
      console.log(TimeAccess);
      this.setState({ TimeAccess });
    } catch (e) {
      console.log(e);
    }
  }
  async _putTimeFactor(idtimefactor) {
    try {
      this.props.setProductIDAccess(idtimefactor);
      this.setState({ selected: true });
    } catch (e) {
      console.log(e);
    }
  }
  handleFooterButton() {
    this.props.setDescProduct(this.state.descProducet);
    this.props.setRoad('Store');
    Actions.addressRoot({ LeadFrom: 'Store' });
  }
  render() {
    const {
      item, formInputText
    } = SignStyle;
    const FooterComponent = ((this.props.Count !== 0) && this.state.selected) ?
      (<Footer>
        <FooterTab>
          <Button
            style={{ backgroundColor: '#0F9D7A' }}
            onPress={this.handleFooterButton.bind(this)}
          >
            <Text style={{ color: 'white' }}>
              انتخاب آدرس
            </Text>
          </Button>
        </FooterTab>
       </Footer>) : null;
    return (
      <Container>
        <Modal
          isVisible={this.state.ModalNumber === 1}
          onModalHide={() => this.setState({ ModalNumber: 2 })}
          exitText="ممنون"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 220,
            }}
            source={Pic1}
            resizeMode="contain"
          />
          <Text>
            یکی از زمان های بالا رو انتخاب کن تا فردا همون موقع برات ارسال شه،
            توجه کن که رنگ زمان انتخاب شده با دیگر زمان ها متفاوته!
            برای سفارشت هم میتونی یه توضیح (اختیاری) بنویسی.
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 2}
          onModalHide={this.helpDone}
          exitText="خیلی خب"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 100,
            }}
            source={Pic2}
            resizeMode="contain"
          />
          <Text>
            وقتی یکی زمان ها اتنخاب شد با زدن دکمه انتخاب آدرس،
            محل دریافت سفارشت رو مشخص کن.
          </Text>
        </Modal>
        <AppHeader rightTitle="سبد محصول" backButton="flex" />
        <Content padder>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>انتخاب زمان ارسال فردا</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignContent: 'center',
            }}
            >
              {this.state.TimeAccess &&
              this.state.TimeAccess.map(c => (
                <Button
                  key={c.idtimefactor}
                  light={c.activetimefactor !== this.state.selectedTime}
                  disabled={!c.activetimefactor}
                  onPress={() => {
                    this._putTimeFactor(c.idtimefactor);
                    this.setState({ selectedTime: c.idtimefactor });
                  }}
                  style={{
                    margin: 5,
                    backgroundColor: c.idtimefactor === this.state.selectedTime ? mainColor : white,
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: 5,
                      color: c.idtimefactor === this.state.selectedTime ? white : '#000',
                    }}
                  >
                    {persianNumber(c.fromdatehour)} الی {persianNumber(c.todatehour)}
                  </Text>
                </Button>
              ))}
            </View>
          </View>
          <Item style={[item, { flex: 1 }]}>
            <Icon active name="clipboard" />
            <Input
              style={formInputText}
              value={this.state.descgym}
              multiline
              onChangeText={descProducet => this.setState({ descProducet })}
            />
            <Label>توضیحات</Label>
          </Item>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
