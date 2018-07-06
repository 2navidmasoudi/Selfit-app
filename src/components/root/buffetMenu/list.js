import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Spinner, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { receiveMaterial, receiveMenuFood, tokenBuffet } from '../../../redux/actions/index';
import { logError } from '../../../services/log';
import { putCheckToken } from '../../../services';
import { getAllBuffetMaterial } from '../../../services/orderMaterial';
import ActiveFood from './activeFood';
import ActiveMaterial from './activeMaterial';
import { getMenuFood } from '../../../services/buffet';
import { TabsStyle } from '../../../assets/styles/gym';

@connect(state => ({
  user: state.user,
  MenuFood: state.buffet.MenuFood,
  Material: state.buffet.Material,
  tokenapi: state.buffet.tokenapi,
  buffetid: state.buffet.buffetid,
}), {
  receiveMenuFood,
  receiveMaterial,
  tokenBuffet,
})
export default class MenuList extends Component {
  state = {
    max: 120,
    ssort: false,
    fsort: 0,
    loading: false,
    refreshing: false,
    search: '',
    searchMode: false,
    SelectedBar: false,
    SelectedBarName: 'search',
    FoodCategory: 0,
  };
  componentWillMount() {
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.setInfo();
  }

  async setInfo() {
    await this._getAllMenuFood(0);
    this._getAllMaterial();
    setTimeout(this._tabs.goToPage.bind(this._tabs, 1), 500);
  }
  async _getAllMenuFood(catid = 0) {
    try {
      this.setState({ loading: true });
      const { max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const MenuFoodList = await getMenuFood(buffetid, catid, tokenmember, tokenapi, max, 0, true, fsort);
      console.log(MenuFoodList, 'catid:', catid);
      await this.props.receiveMenuFood(MenuFoodList);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, 'GetAllMenuFood', 'BuffetKeeper/FoodList', '_getAllMenuFood');
    }
  }
  async _getAllMaterial() {
    try {
      this.setState({ loading: true });
      const { max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const MaterialList = await getAllBuffetMaterial(buffetid, false, tokenmember, tokenapi, max, 0, ssort, fsort);
      console.log(MaterialList);
      await this.props.receiveMaterial(MaterialList);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, 'GetAllMaterial', 'BuffetKeeper/FoodList', '_getAllMaterial');
      this.setState({ loading: false });
    }
  }
  handleRefresh() {
    this.setState({ refreshing: true });
    if (!this.state.searchMode) {
      this._getAllMenuFood(this.state.FoodCategory);
    } else {
      this._getSearchMenuFood();
    }
  }
  renderItem({ item }) {
    return <ActiveFood food={item} />;
  }
  renderMaterial({ item }) {
    return <ActiveMaterial food={item} />;
  }
  renderFooter() {
    if (!this.state.loading) return null;
    return <Spinner />;
  }
  render() {
    return (
      <Container>
        <AppHeader rightTitle="منو آماده" backButton="flex" />
        <Tabs
          initialPage={1}
          ref={component => this._tabs = component}
          tabBarUnderlineStyle={TabsStyle.underLine}
        >

          <Tab
            heading="منو انتخابی"
            activeTextStyle={TabsStyle.activeText}
            textStyle={TabsStyle.text}
            activeTabStyle={TabsStyle.activeTab}
            tabStyle={TabsStyle.notActiveTabs}
          >
            <FlatList
              data={this.props.Material}
              renderItem={item => this.renderMaterial(item)}
              keyExtractor={item => item.idmaterial}
              ListEmptyComponent={() => <Spinner />}
              // onRefresh={this.handleRefresh.bind(this)}
              // refreshing={this.state.refreshing}
              // onEndReachedThreshold={0.5}
              // ListFooterComponent={this.renderFooter.bind(this)}
            />
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
              onRefresh={this.handleRefresh.bind(this)}
              refreshing={this.state.refreshing}
              onEndReachedThreshold={0.5}
              // ListFooterComponent={this.renderFooter.bind(this)}
            />
          </Tab>
        </Tabs>

      </Container>
    );
  }
}
