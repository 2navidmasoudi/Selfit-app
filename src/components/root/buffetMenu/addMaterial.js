import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Spinner } from 'native-base';
import { connect } from 'react-redux';
import MaterialCard from './MaterialCard';
import AppHeader from '../../header';
import { receiveMaterial, tokenBuffet } from '../../../redux/actions/index';
import { logError } from '../../../services/log';
import { putCheckToken } from '../../../services';
import { getAllMaterial } from '../../../services/orderMaterial';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  Material: state.buffet.Material,
}), {
  receiveMaterial,
  tokenBuffet,
})
export default class AddMaterial extends Component {
  state = {
    max: 120,
    ssort: true,
    fsort: 0,
    loading: false,
    refreshing: false,
  };
  componentWillMount() {
    this.setInfo();
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
  }
  async setInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this._getAllMaterial();
  }
  async _getAllMaterial() {
    try {
      this.setState({ loading: true });
      const { max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const MaterialList = await getAllMaterial(tokenmember, tokenapi, max, 0);
      console.log(MaterialList);
      await this.props.receiveMaterial(MaterialList);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, 'GetAllMaterial', 'BuffetKeeper/FoodList', '_getAllMaterial');
      this.setState({ loading: false, refreshing: false });
    }
  }
  renderMaterial = ({ item }) => <MaterialCard food={item} />
  render() {
    return (
      <Container>
        <AppHeader rightTitle="منو آماده" backButton="flex" />
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
      </Container>
    );
  }
}
