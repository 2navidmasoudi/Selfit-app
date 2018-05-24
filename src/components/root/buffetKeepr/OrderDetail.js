import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Button, Container, Content, Footer, FooterTab, Left, ListItem, Right, Separator, Text } from 'native-base';
import { connect } from 'react-redux';
import { logError } from '../../../services/log';
import AppHeader from '../../header';
import { getBasketOrderAllBuffet } from '../../../services/orderBuffet';
import { getAllMixMaterial, getBasketOrderMaterial } from '../../../services/orderMaterial';
import { putAcceptBuffet } from '../../../services/buffet';

@connect(state => ({
  user: state.user,
  tokenmember: state.user.tokenmember,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}))
export default class OrderDetail extends Component {
  state = {
    disableAddButton: false,
    disableRemoveButton: false,
    buffetOrder: null,
    materialOrderid: null,
    materialOrder: null,
  };

  componentWillMount() {
    this.getInfo();
  }

  async getInfo() {
    this._getBasketOrderAllBuffet();
    this._getBasketOrderMaterial();
    // this._getMixMaterial(0);
  }

  async _getBasketOrderAllBuffet() {
    try {
      const { idmember, buffetidfactor, activemethodpayed } = await this.props.order;
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const buffetOrder = await getBasketOrderAllBuffet(idmember, buffetidfactor, activemethodpayed, tokenmember, tokenapi, 30, 0, true);
      console.log(buffetOrder, 'BuffetOrder');
      this.setState({ buffetOrder });
    } catch (e) {
      console.log(e);
    }
  }

  async _getBasketOrderMaterial() {
    try {
      const { idmember, buffetidfactor } = await this.props.order;
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const materialOrderid = await getBasketOrderMaterial(idmember, buffetidfactor, tokenmember, tokenapi, 30, 0, true);
      console.log(materialOrderid, 'MaterialOrderid');
      await this.setState({ materialOrderid });
      // TODO: FIX THIS SHIT PLEASE
      this._getMixMaterial(materialOrderid[0].idbasketmaterial);
    } catch (e) {
      console.log(e);
    }
  }

  async _getMixMaterial(id) {
    try {
      // let {idmember, buffetidfactor} = await this.props.order;
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { Basket, PriceAll } = await getAllMixMaterial(id || 0, false, tokenmember, tokenapi, 30, 0, false);
      console.log(Basket, 'materialOrder');
      this.setState({ materialOrder: Basket });
    } catch (e) {
      console.log(e);
    }
  }

  async sendAccept(active) {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, order } = await this.props;
      const result = await putAcceptBuffet(order.idmember, order.idfactorbuffet, active, tokenmember, tokenapi);
      console.log(result, 'accept Result');
      if (result == 1) {
        await this.setState({
          disableAddButton: true,
          disableRemoveButton: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const FooterComponent = (this.props.Count1 + this.props.Count2) === 0 ? null :
      (<Footer>
        <FooterTab>
          <Button
            // style={{
            //     // paddingTop: 10,
            //     backgroundColor: '#0F9D7A'
            // }}1
            danger={!this.state.disableAddButton}
            disabled={this.state.disableAddButton}
            onPress={() => this.sendAccept(false)}
          >
            {/* <Badge><Text>{(this.props.Count1 + this.props.Count2).toLocaleString('fa')}</Text></Badge> */}
            {/* <Icon name="basket" style={{color: 'white'}}/> */}
            <Text style={{
              fontFamily: 'IRANSansMobile',
              // fontSize: 18,
              color: 'white',
              // paddingTop: 12
            }}
            >رد فاکتور
            </Text>
          </Button>
          <Button
            style={{
              // paddingTop: 10,
              backgroundColor: '#0F9D7A'
            }}
            disabled={this.state.disableAddButton}
            onPress={() => this.sendAccept(true)}
          >
            {/* <Badge><Text>{(this.props.Count1 + this.props.Count2).toLocaleString('fa')}</Text></Badge> */}
            {/* <Icon name="basket" style={{color: 'white'}}/> */}
            <Text style={{
              fontFamily: 'IRANSansMobile',
              // fontSize: 18,
              color: 'white',
              // paddingTop: 12
            }}
            >قبول فاکتور
            </Text>
          </Button>
        </FooterTab>
       </Footer>);
    const { order } = this.props;
    // const m = moment(`${food.datesave}`,'YYYY/MM/DDTHH:mm:ss');
    // const jM = m.format('jYYYY/jMM');
    // const ImgYear = m.jYear();
    // const ImgMonth = m.jMonth()+1;
    // const ImgSrc = `${food.httpserver}${food.pathserver}${ImgYear}/${ImgMonth}/${food.picmenufood}`;
    return (
      <Container>
        <AppHeader rightTitle="مشخصات سفارش" backButton="flex" />
        <Content>
          <Text style={{ textAlign: 'center', fontSize: 20, margin: 10 }}>{order.namefamilymember}</Text>
          <Separator bordered style={{ flex: 0 }}>
            <Text style={{ fontSize: 24, marginHorizontal: 10 }}>غذای آماده</Text>
          </Separator>
          <FlatList
            data={this.state.buffetOrder}
            renderItem={this.renderItem}
            keyExtractor={item => item.idmenufood}
            // ListEmptyComponent={()=><Spinner/>}
            // onRefresh={this.handleRefresh.bind(this)}
            // refreshing={this.state.refreshing}
            // onEndReachedThreshold={0.5}
            // ListFooterComponent={this.renderFooter.bind(this)}
          />
          <Separator bordered style={{ flex: 0 }}>
            <Text style={{ fontSize: 24, marginHorizontal: 10 }}>غذای انتخابی</Text>
          </Separator>
          <FlatList
            data={this.state.materialOrder}
            renderItem={this.renderItem2}
            keyExtractor={item => item.idmaterial}
            // ListEmptyComponent={()=><Spinner/>}
            // onRefresh={this.handleRefresh.bind(this)}
            // refreshing={this.state.refreshing}
            // onEndReachedThreshold={0.5}
            // ListFooterComponent={this.renderFooter.bind(this)}
          />
        </Content>
        {FooterComponent}
      </Container>
    );
  }

  renderItem = ({ item }) => (
    <ListItem>
      <Left>
        <Text>{item.pricemenufood.toLocaleString('fa')} تومان</Text>
      </Left>
      <Text style={{ textAlign: 'center' }}>{item.namemenufood}</Text>
      <Right>
        <Text>{item.numbermenufood.toLocaleString('fa')} عدد</Text>
      </Right>
    </ListItem>
  );
  renderItem2 = ({ item }) => (
    <ListItem>
      <Left>
        <Text>{item.pricematerial.toLocaleString('fa')} تومان</Text>
      </Left>
      <Text style={{ textAlign: 'center' }}>{item.namematerial}</Text>
      <Right>
        <Text>{item.numbermaterial.toLocaleString('fa')} عدد</Text>
      </Right>
    </ListItem>
  );
  async _putAccept(active) {
    try {
      const { tokenapi, buffetid, tokenmember } = this.props;
      const result = await (buffetid, food.idmenufood, true, tokenmember, tokenapi);
      console.log(result);

      return result;
    } catch (error) {
      logError(error, '_postMenuFood', 'BuffetMenu/FoodCard', 'postMenuFoodBuffet');
    }
  }
}
