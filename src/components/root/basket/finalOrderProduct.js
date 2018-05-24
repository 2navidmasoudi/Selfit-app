import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Content, Footer, FooterTab } from 'native-base';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { setRoad, tokenStore } from '../../../redux/actions';
import { getRequestPayment } from '../../../services/payment';
import { postAddressProduct, postFactorProduct, putTimeFactor } from '../../../services/orderProduct';

// todo: add list for final order

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
  Count: state.basket.productBasketCount,
  totalPrice: state.basket.PriceAllProduct,
  idtimefactor: state.basket.idtimefactor,
  descProducet: state.basket.descProducet,
}), {
  tokenStore,
  setRoad,
})
export default class finalOrderProduct extends Component {
    state = {
      active: true,
      state: false,
      min: 0,
      max: 30,
      fsort: 0,
      ssort: false,
      total: 0,
    };
    componentWillMount() {
      this.getInfo();
      console.log(this.props, 'props');
    }
    async getInfo() {
      await this.props.tokenStore('selfit.store');
      this.props.setRoad('Store');
    }
    async _getRequestPayment() {
      getRequestPayment(2, this.props.user.tokenmember);
    }
    async _putTimeFactor(idfactor) {
      try {
        const { tokenmember } = await this.props.user;
        const { tokenapi, idtimefactor } = await this.props;
        const result = await putTimeFactor(idfactor, idtimefactor, tokenmember, tokenapi);
        console.log(result, 'putTimeFactor');
        this.setState({ selected: true });
      } catch (e) {
        console.log(e);
      }
    }
    async _postAddressProduct(idfactor) {
      try {
        const { tokenmember } = await this.props.user;
        const { tokenapi, address } = await this.props;
        const result = await postAddressProduct(idfactor, address.idaddressmember, tokenmember, tokenapi);
        console.log(result, 'postAddressProduct');
        this.setState({ selected: true });
      } catch (e) {
        console.log(e);
      }
    }
    async handleFooterPress() {
      try {
        const { tokenmember } = await this.props.user;
        const { tokenapi, idtimefactor, descProduct } = await this.props;
        const idfactor = await postFactorProduct(idtimefactor, descProduct, 1, tokenmember, tokenapi);
        await this._putTimeFactor(idfactor);
        await this._postAddressProduct(idfactor);
        this._getRequestPayment();
        Actions.reset('root');
      } catch (e) {
        console.log(e);
      }
    }
    render() {
      const FooterComponent = (this.props.Count) === 0 ? null :
        (<Footer>
          <FooterTab>
            <Button
              style={{
                            backgroundColor: '#0F9D7A'
                        }}
              onPress={this.handleFooterPress.bind(this)}
            >
              <Text style={{
                            fontFamily: 'IRANSansMobile',
                            color: 'white',
                        }}
              >پرداخت: {this.props.totalPrice.toLocaleString('fa')} تومان
              </Text>
            </Button>
          </FooterTab>
         </Footer>);
      return (
        <Container>
          <AppHeader rightTitle="صدور فاکتور فروشگاه" backButton="flex" />
          <Content padder>
            <Text>صدور فاکتور</Text>
          </Content>
          {FooterComponent}
        </Container>
      );
    }
}
