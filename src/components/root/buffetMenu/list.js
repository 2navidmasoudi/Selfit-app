import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Spinner, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { receiveMaterial, receiveMenuFood, tokenBuffet } from '../../../redux/actions/index';
import { getFoodCategory } from '../../../services/MenuFood';
import { logError } from '../../../services/log';
import { putCheckToken } from '../../../services';
import Loader from '../../loader';
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
  receiveMenuFood: MenuFood => dispatch(receiveMenuFood(MenuFood)),
  receiveMaterial: Material => dispatch(receiveMaterial(Material)),
  tokenBuffet: tokenapi => dispatch(tokenBuffet(tokenapi)),
})
export default class MenuList extends Component {
  state = {
    max: 10,
    ssort: true,
    fsort: 0,
    loading: false,
    refreshing: false,
    search: '',
    searchMode: false,
    SelectedBar: false,
    SelectedBarName: 'search',
    FoodCategory: 0,
    CategoryList: [],
  };
  componentWillMount() {
    this._getAllMenuFood(0);
    this._getAllMaterial();
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.setInfo();
  }

  async setInfo() {
    await this._getFoodCategory();
    setTimeout(this._tabs.goToPage.bind(this._tabs, 1), 500);
  }

  async _getAllMenuFood(catid = 0) {
    try {
      this.setState({ loading: true });
      const { max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const MenuFoodList = await getMenuFood(buffetid, catid, tokenmember, tokenapi, 30, 0, ssort, fsort);
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
      const MaterialList = await getAllBuffetMaterial(buffetid, false, tokenmember, tokenapi, 20, 0, false, 0);
      console.log(MaterialList);
      await this.props.receiveMaterial(MaterialList);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, 'GetAllMaterial', 'BuffetKeeper/FoodList', '_getAllMaterial');
      this.setState({ loading: false });
    }
  }



  async _getFoodCategory() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const CategoryList = await getFoodCategory(tokenmember, tokenapi);
      console.log('Category:', CategoryList);
      this.setState({ CategoryList });
    } catch (error) {
      console.log(error);
      logError(error, 'getCategory', 'BuffetKeeper/FoodList', '_getFoodCategory');
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
        <Loader
          loading={this.state.loading}
        />
        <AppHeader rightTitle="منو آماده" backButton="flex" />
        <Tabs initialPage={1} ref={component => this._tabs = component}>

          <Tab
            heading="منو انتخابی"
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
            textStyle={TabsStyle.text}
            activeTabStyle={TabsStyle.activeTab}
            tabStyle={TabsStyle.notActiveTabs}
          >
            {/* {searchOrCategory} */}
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
