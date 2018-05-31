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
      const MenuFoodList = await getSearchMenuFood(search, tokenmember, tokenapi, 30, 0, ssort, fsort);
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
      const MenuFoodList = await getAllMenuFood(catid, tokenmember, tokenapi, 30, 0, ssort, fsort);
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
    // const ShowWhichButton = this.state.SelectedBarName === 'search' ?
    //   (<Header searchBar rounded style={{ backgroundColor: 'white' }}>
    //     <Item style={{ flex: 4 }}>
    //       <Icon name="search" />
    //       <Input placeholder="نام غذا..." onChangeText={text => this.searchText(text)} />
    //       <Icon name="people" />
    //     </Item>
    //     <TouchableWithoutFeedback
    //       style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 20, width: 30 }}
    //       onPress={() => this.cancleSearch()}
    //     >
    //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //         <Icon name="close" />
    //       </View>
    //     </TouchableWithoutFeedback>
    //    </Header>)
    //   :
    //   (<Header rounded style={{ backgroundColor: 'white' }}>
    //     <View style={{ flex: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
    //       <Picker
    //         iosHeader="انتخاب دسته بندی"
    //         mode="dropdown"
    //         placeholder="همه"
    //         style={{ flex: 1, width: undefined }}
    //         selectedValue={this.state.FoodCategory}
    //         onValueChange={this.FoodCategoryChanged.bind(this)}
    //       >
    //         <Picker.Item label="همه غذاها" value={null} key={100} />
    //         {this.state.CategoryList.map(category => (
    //           <Picker.Item
    //             label={category.namecategoryfood}
    //             value={category.idcategoryfood}
    //             key={category.idcategoryfood}
    //           />
    //         ))}
    //       </Picker>
    //       <Text>
    //         دسته بندی بر اساس:
    //       </Text>
    //     </View>
    //     <TouchableWithoutFeedback
    //       style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 20, width: 30 }}
    //       onPress={() => this.cancleCategory()}
    //     >
    //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //         <Icon name="close" />
    //       </View>
    //     </TouchableWithoutFeedback>
    //    </Header>);
    // const searchOrCategory = this.state.SelectedBar ? ShowWhichButton :
    //   (<Header rounded style={{ backgroundColor: 'white' }} androidStatusBarColor="#313131" iosBarStyle="light-content">
    //     <View style={{ flex: 1, flexDirection: 'row' }}>
    //       <Button
    //         iconLeft
    //         bordered
    //         success
    //         style={{ flex: 1, marginHorizontal: 6 }}
    //         onPress={this.categoryButton.bind(this)}
    //       >
    //         <Icon name="clipboard" />
    //         <Text style={{ flex: 1, textAlign: 'center' }}>دسته بندی</Text>
    //       </Button>
    //       <Button
    //         iconLeft
    //         bordered
    //         success
    //         style={{ flex: 1, marginHorizontal: 6 }}
    //         onPress={this.searchButton.bind(this)}
    //       >
    //         <Icon name="search" />
    //         <Text style={{ flex: 1, textAlign: 'center' }}>جستجو</Text>
    //       </Button>
    //
    //     </View>
    //   </Header>);
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
