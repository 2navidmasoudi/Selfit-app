import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { receiveMaterial, receiveMenuFood, tokenBuffet } from '../../../redux/actions/index';
import { logError } from '../../../services/log';
import ActiveFood from './activeFood';
import { getMenuFood } from '../../../services/buffet';
import Loader from '../../loader';

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
export default class ListFood extends Component {
  state = {
    loading: false,
    refreshing: false,
    FoodCategory: 0,
  };
  componentWillMount() {
    this.getAllMenuFood(0);
  }
  async getAllMenuFood(catid = 0) {
    try {
      this.setState({ loading: true });
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const MenuFoodList =
        await getMenuFood(buffetid, catid, tokenmember, tokenapi, 120, 0, true, 0);
      console.log(MenuFoodList, 'catid:', catid);
      await this.props.receiveMenuFood(MenuFoodList);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      this.setState({ loading: false, refreshing: false });
      console.log(error);
      logError(error, 'GetAllMenuFood', 'BuffetKeeper/FoodList', '_getAllMenuFood');
    }
  }
  handleRefresh() {
    this.setState({ refreshing: true });
    this.getAllMenuFood(this.state.FoodCategory);
  }
  renderItem = ({ item }) => <ActiveFood food={item} />
  render() {
    return (
      <Container>
        <AppHeader rightTitle="منو آماده" backButton="flex" />
        <FlatList
          data={this.props.MenuFood}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idmenufood}
          ListEmptyComponent={<Loader loading={this.state.loading} />}
          onRefresh={this.handleRefresh.bind(this)}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.5}
        />
      </Container>
    );
  }
}
