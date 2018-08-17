import React, { Component } from 'react';
import { Image, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Card, CardItem, Icon, Left, Right } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { reBasketProduct } from '../../../redux/actions';
import { logError } from '../../../services/log';
import { deleteBasketProduct, getBasketProduct, postOrderProduct } from '../../../services/orderProduct';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { white } from '../../../assets/variables/colors';

@connect(state => ({
  user: state.user,
  tokenapi: state.store.tokenapi,
}), {
  reBasketProduct,

})
export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberProduct: 0,
      stateproductid: props.product.stateproductid,
    };
  }
  async removeButtonHandle() {
    try {
      this.setState({
        numberProduct: 0
      });
      const { product, tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      console.log(tokenapi, 'tokenapi??');
      let deletedOrder;
      const ProductOrdered = await getBasketProduct(true, tokenmember, tokenapi, 50, 0);
      console.log(ProductOrdered);
      for (let i = 0; i < ProductOrdered.length; i++) {
        if (product.idproduct === ProductOrdered[i].idproduct) {
          deletedOrder =
            await deleteBasketProduct(ProductOrdered[i].idbasket, tokenmember, tokenapi);
          console.log('this is it!', ProductOrdered[i], 'deleted?', deletedOrder);
          break;
        }
      }
      const Basket = await getBasketProduct(true, tokenmember, tokenapi, 50, 0);
      this.props.reBasketProduct(Basket, Basket.length);
    } catch (error) {
      console.log(error);
      logError(error, 'removeButtonHandle', 'store/ProductCard', 'getBasketProduct');
    }
  }
  async addButtonHandle(active) {
    if (!active) return;
    try {
      const { numberProduct } = await this.state;
      const { tokenmember } = await this.props.user;
      const { tokenapi, product } = await this.props;
      this.setState({
        numberProduct: numberProduct + 1
      });
      const result =
        await postOrderProduct(numberProduct + 1, product.idproduct, tokenmember, tokenapi);
      console.log('postOrderProduct for', numberProduct + 1, product.idproduct, product.priceproduct, result);
      const Basket = await getBasketProduct(true, tokenmember, tokenapi, 30, 0);
      this.props.reBasketProduct(Basket, Basket.length);
    } catch (error) {
      console.log(error);
      logError(error, 'addButtonHandle', 'store/ProductCard', 'postOrderProduct');
    }
  }
  render() {
    const { product } = this.props;
    const m = moment(`${product.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${product.httpserver}${product.pathserver}${ImgYear}/${ImgMonth}/${product.picproduct}`;
    const display = (this.state.stateproductid !== 2 && product.numberproduct);
    return (
      <TouchableOpacity
        // disabled={!product.numberproduct}
        onPress={() => this.addButtonHandle(display)}
      >
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                <Image
                  source={{ uri: ImgSrc }}
                  style={{ flex: 1, height: 100, width: null, resizeMode: 'cover' }}
                  onPress={() => Actions.showImage({ uri: ImgSrc })}
                />
              </TouchableWithoutFeedback>
            </Left>
            <Right style={{ flex: 2 }}>
              <Text>
                {persianNumber(product.titleproduct)}
              </Text>
              <Text type="light">
                {persianNumber(product.priceproduct.toLocaleString())} تومان
              </Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <Button
                  bordered={this.state.numberProduct !== 0}
                  style={{ marginLeft: 10, display: this.state.numberProduct <= 0 ? 'none' : 'flex' }}
                  danger
                  onPress={() => this.removeButtonHandle()}
                >
                  <Icon name="close-circle" />
                </Button>
                <Text style={{
                  paddingHorizontal: 10,
                  display: this.state.numberProduct <= 0 ? 'none' : 'flex'
                }}
                >
                  {persianNumber(this.state.numberProduct.toLocaleString())}
                </Text>
                {display &&
                <Button
                  disabled={!product.numberproduct}
                  success={!!product.numberproduct}
                  bordered={!!product.numberproduct}
                  onPress={() => this.addButtonHandle(display)}
                >
                  <Icon name="add-circle" />
                </Button>}
                {!display &&
                <Button disabled>
                  <Text style={{ color: white, paddingHorizontal: 20 }}>ناموجود</Text>
                </Button>}
              </View>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
