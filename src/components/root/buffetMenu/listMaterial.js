import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { receiveMaterial, receiveMenuFood, tokenBuffet } from '../../../redux/actions/index';
import { logError } from '../../../services/log';
import { getAllBuffetMaterial } from '../../../services/orderMaterial';
import ActiveMaterial from './activeMaterial';
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
export default class ListMaterial extends Component {
  state = {
    loading: false,
    refreshing: false,
    searchMode: false,
  };
  componentWillMount() {
    this.getAllMaterial();
  }
  async getAllMaterial() {
    try {
      this.setState({ loading: true });
      const { tokenmember } = await this.props.user;
      const { tokenapi, buffetid } = await this.props;
      const MaterialList =
        await getAllBuffetMaterial(buffetid, false, tokenmember, tokenapi, 120, 0);
      console.log(MaterialList);
      await this.props.receiveMaterial(MaterialList);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      this.setState({ loading: false, refreshing: false });
      console.log(error);
      logError(error, 'GetAllMaterial', 'BuffetKeeper/FoodList', 'getAllMaterial');
    }
  }
  handleRefresh() {
    this.setState({ refreshing: true });
    this.getAllMaterial();
  }
  renderMaterial = ({ item }) => <ActiveMaterial food={item} />
  render() {
    return (
      <Container>
        <AppHeader rightTitle="منو آماده" backButton="flex" />
        <FlatList
          data={this.props.Material}
          renderItem={item => this.renderMaterial(item)}
          keyExtractor={item => item.idmaterial}
          ListEmptyComponent={<Loader loading={this.state.loading} />}
          onRefresh={this.handleRefresh.bind(this)}
          refreshing={this.state.refreshing}
        />
      </Container>
    );
  }
}
