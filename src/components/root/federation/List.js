import React, { Component } from 'react';
import {FlatList, Platform, View} from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import FederationCard from './FederationCard';
import { decrementMin, incrementMin, receiveGym, refreshGym, tokenGym } from '../../../redux/actions/index';
import { logError } from '../../../services/log';
import { getAllFED, getSearchFED } from '../../../services/doctor';
import Loader from '../../loader';

const mapDispatchToProps = dispatch => ({
  receiveFED: (gym, min) => dispatch(receiveGym(gym, min)),
  incrementMin: () => dispatch(incrementMin()),
  decrementMin: () => dispatch(decrementMin()),
  refreshFED: () => dispatch(refreshGym()),
  tokenFED: tokenapi => dispatch(tokenGym(tokenapi)),
});
@connect(state => ({
  FED: state.gym.GymList,
  min: state.gym.min,
  user: state.user,
  tokenapi: state.gym.tokenapi,
}), mapDispatchToProps)
export default class List extends Component {
  state = {
    max: 120,
    loading: true,
    refreshing: false,
    search: null,
    searchMode: false,
  };
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenFED('selfit.public');
    this.getAllFED();
  }
  async getSearchFED() {
    try {
      if (!this.state.search) this.refreshFED();
      await this.setState({
        searchMode: true
      });
      const { search, max } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const FEDListList =
        await getSearchFED(search, tokenmember, tokenapi, max, min, null);
      await this.props.receiveFED(FEDListList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }
  async getAllFED() {
    try {
      this.setState({ loading: true });
      const { max } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const FEDList = await getAllFED(tokenmember, tokenapi, max, min, null);
      console.log(FEDList);
      await this.props.receiveFED(FEDList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, 'getAllCouch', 'FED/List', 'getAllFED');
      this.setState({ loading: false });
    }
  }
  async searchText(text) {
    if (text) {
      await this.setState({
        search: text
      });
      this.getSearchFED();
    } else {
      await this.setState({
        searchMode: false,
      });
      await this.props.refreshFED();
      await this.getAllFED();
    }
  }
  async handleLoadMore() {
    if (this.props.FED.length >= 120 && !this.state.loading) {
      console.log('Request Load More');
      await this.props.incrementMin();
      await this.setState({ loading: true });
      if (!this.state.searchMode) {
        this.getAllFED();
      } else {
        this.getSearchFED();
      }
    }
  }
  handleRefresh() {
    this.props.refreshFED();
    this.setState({ refreshing: true });
    if (!this.state.searchMode) {
      this.getAllFED();
    } else {
      this.getSearchFED();
    }
    this.setState({ refreshing: false });
  }
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}
      >
        <SearchBar
          showLoading
          onChangeText={this.searchText.bind(this)}
          placeholder="نام فدراسیون ..."
          inputStyle={{ textAlign: Platform.OS === 'ios' ? 'right' : undefined, fontFamily: 'IRANSansMobile', fontSize: 12 }}
        />
        <FlatList
          data={this.props.FED}
          renderItem={({ item }) => <FederationCard FED={item} />}
          keyExtractor={item => item.doctorid}
          ListEmptyComponent={<Loader loading={this.state.loading} />}
          onRefresh={this.handleRefresh.bind(this)}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}
