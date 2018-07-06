import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import FoodCard from './FoodCard';
import AppHeader from '../../header';
import { receiveMenuFood, tokenBuffet } from '../../../redux/actions/index';
import { getAllMenuFood, getFoodCategory, getSearchMenuFood } from '../../../services/MenuFood';
import { logError } from '../../../services/log';
import { putCheckToken } from '../../../services';

@connect(state => ({
  user: state.user,
  MenuFood: state.buffet.MenuFood,
  tokenapi: state.buffet.tokenapi,
}), {
  receiveMenuFood,
  tokenBuffet,
})
export default class AddFood extends Component {
  state = {
    max: 120,
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
    this.setInfo();
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
  }

  async setInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this._getFoodCategory();
    await this._getAllMenuFood(0);
  }

  async searchText(text) {
    if (text) {
      await this.setState({
        search: text
      });
      this._getSearchMenuFood();
    } else {
      await this.setState({
        searchMode: false, search: ''
      });
      this._getAllMenuFood();
    }
  }

  searchButton() {
    this.setState({ SelectedBar: true, SelectedBarName: 'search' });
  }

  categoryButton() {
    this.setState({ SelectedBar: true, SelectedBarName: 'category' });
  }

  FoodCategoryChanged(value) {
    this.setState({
      FoodCategory: value
    });
    console.log(
      'value', value,
      'foodCategory', this.state.FoodCategory
    );
    this._getAllMenuFood(value);
  }

  cancleSearch() {
    this.setState({ SelectedBar: false });
    if (this.state.searchMode) {
      this.searchText(null);
    }
  }

  cancleCategory() {
    this.setState({ SelectedBar: false });
    if (this.state.FoodCategory) {
      this._getAllMenuFood(0);
    }
  }

  async _getSearchMenuFood() {
    try {
      await this.setState({
        searchMode: true, loading: true
      });
      const { search, max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const MenuFoodList = await getSearchMenuFood(search, tokenmember, tokenapi, 50, 0, ssort, fsort);
      await this.props.receiveMenuFood(MenuFoodList);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, 'getSearchAll', 'BuffetKeeper/FoodList', '_getSearchMenuFood');
    }
  }

  async _getAllMenuFood(catid = 0) {
    try {
      this.setState({ loading: true });
      const { max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const MenuFoodList = await getAllMenuFood(catid, tokenmember, tokenapi, 50, 0, ssort, fsort);
      console.log(MenuFoodList, 'catid:', catid);
      await this.props.receiveMenuFood(MenuFoodList);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, 'GetAllMenuFood', 'BuffetKeeper/FoodList', '_getAllMenuFood');
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
    return <FoodCard food={item} />;
  }

  renderFooter() {
    if (!this.state.loading) return null;
    return <Spinner />;
  }

  render() {
    return (
      <Container>
        <AppHeader rightTitle="منو آماده" backButton="flex" />
        {/* {searchOrCategory} */}
        <SearchBar
          showLoading
          onChangeText={this.searchText.bind(this)}
          placeholder="نام غذا ..."
        />
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
      </Container>
    );
  }
}
