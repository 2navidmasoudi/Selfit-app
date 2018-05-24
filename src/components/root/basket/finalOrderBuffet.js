import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Footer, FooterTab, Icon, Input, Item, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { postAddressOrderBuffet, postFactor } from '../../../services/orderBuffet';
import AppHeader from '../../header';
import { reBasketBuffet, reBasketMaterial, setRoad, tokenBuffet } from '../../../redux/actions';
import { SignStyle } from '../../../assets/styles/sign';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  materialBasket: state.basket.materialBasket,
  buffetBasket: state.basket.buffetBasket,
  buffetid: state.buffet.buffetid,
  Count1: state.basket.materialBasketCount,
  Count2: state.basket.buffetBasketCount,
}), {
  tokenBuffet,
  reBasketMaterial,
  reBasketBuffet,
  setRoad,
})
export default class finalOrderBuffet extends Component {
  state = {
    active: true,
    state: false,
    min: 0,
    max: 30,
    fsort: 0,
    ssort: false,
    total: 0,
    descfactor: '',
  };
  componentWillMount() {
    this.getInfo();
    console.log(this.props, 'props');
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    this.props.setRoad('buffet');
  }
  async sendOrderBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const { descfactor } = await this.state;
      const idfactor = await postFactor(buffetid, descfactor, 1, tokenmember, tokenapi);
      console.log(idfactor);
      const result = await postAddressOrderBuffet(idfactor, tokenmember, tokenapi);
      if (result === 1) {
        alert('سفارش شما با موفقیت ثبت شد.');
        Actions.reset('root');
      }
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const {
      item, formInputText
    } = SignStyle;
    const FooterComponent = (this.props.Count1 + this.props.Count2) === 0 ? null :
      (<Footer>
        <FooterTab>
          <Button
            style={{ backgroundColor: '#0F9D7A' }}
            onPress={this.sendOrderBuffet.bind(this)}
          >
            <Text style={{
              fontFamily: 'IRANSansMobile',
              color: 'white',
            }}
            >
              صدور فاکتور
            </Text>
          </Button>
        </FooterTab>
      </Footer>);
    return (
      <Container>
        <AppHeader rightTitle="سبد غذا" backButton="flex" />
        <Content padder>
          <Text>صدور فاکتور</Text>
          <Item style={[item, { flex: 1 }]}>
            <Icon active name="clipboard" />
            <Input
              style={formInputText}
              value={this.state.descgym}
              multiline
              onChangeText={descfactor => this.setState({ descfactor })}
            />
            <Label>توضیحات</Label>
          </Item>
        </Content>
        {FooterComponent}
      </Container>
    );
  }
}
