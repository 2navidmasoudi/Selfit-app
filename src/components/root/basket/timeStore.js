import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Footer, FooterTab, Icon, Input, Item, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { setDescProduct, setProductIDAccess, setRoad, tokenStore } from '../../../redux/actions';
import { SignStyle } from '../../../assets/styles/sign';
import { getTimeAccessStore } from '../../../services/orderProduct';

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
  Count: state.basket.productBasketCount,
  totalPrice: state.basket.PriceAllProduct,
  productBasket: state.basket.productBasket,
}), {
  tokenStore,
  setRoad,
  setDescProduct,
  setProductIDAccess,
})
export default class TimeStore extends Component {
  state = {
    active: true,
    min: 0,
    max: 30,
    fsort: 0,
    ssort: false,
    selected: false,
    TimeAccess: null,
    descProducet: '',
  };
  componentWillMount() {
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
            style={{backgroundColor: '#0F9D7A'}}
            onPress={this.handleFooterButton.bind(this)}
          >
            <Text style={{
              fontFamily: 'IRANSansMobile',
              color: 'white',
            }}
            >
              انتخاب آدرس
            </Text>
          </Button>
        </FooterTab>
       </Footer>) : null;
    return (
      <Container>
        <AppHeader rightTitle="سبد محصول" backButton="flex" />
        <Content padder>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>انتخاب زمان ارسال</Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignContent: 'center',
              margin: 10
            }}
            >
              {this.state.TimeAccess &&
              this.state.TimeAccess.map(c => (
                <Button
                  key={c.idtimefactor}
                  light={c.activetimefactor}
                  disabled={!c.activetimefactor}
                  onPress={() => this._putTimeFactor(c.idtimefactor)}
                >
                  <Text>
                    {c.fromdatehour} الی {c.todatehour.toLocaleString('fa')}
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
