import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import FederationCard from './FederationCard';
import { decrementMin, incrementMin, receiveGym, refreshGym, tokenGym } from '../../../redux/actions/index';
import { logError } from '../../../services/log';
import { getAllFED, getSearchFED } from '../../../services/doctor';

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
    max: 70,
    ssort: false,
    fsort: 0,
    loading: 0,
    refreshing: false,
    search: null,
    searchMode: false,
  };
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenFED('selfit.public');
    this._getAllFED();
  }
  async searchText(text) {
    if (text) {
      await this.setState({
        search: text
      });
      this._getSearchFED();
    } else {
      await this.setState({
        searchMode: false,
      });
      await this.props.refreshFED();
      await this._getAllFED();
    }
  }
  async _getSearchFED() {
    try {
      if (!this.state.search) this.refreshFED();
      await this.setState({
        searchMode: true
      });
      const { search, max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const FEDListList =
        await getSearchFED(search, tokenmember, tokenapi, max, min, ssort, fsort);
      await this.props.receiveFED(FEDListList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }
  async _getAllFED() {
    try {
      const { max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const FEDList = await getAllFED(tokenmember, tokenapi, max, min, ssort, fsort);
      console.log(FEDList);
      await this.props.receiveFED(FEDList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, '_getAllCouch', 'FED/List', 'getAllFED');
      this.setState({ loading: false });
    }
  }
  async handleLoadMore() {
    if (this.props.FED.length >= 70 && !this.state.loading) {
      console.log('Request Load More');
      await this.props.incrementMin();
      await this.setState({ loading: true });
      if (!this.state.searchMode) {
        this._getAllFED();
      } else {
        this._getSearchFED();
      }
    }
  }
  handleRefresh() {
    this.props.refreshFED();
    this.setState({ refreshing: true });
    if (!this.state.searchMode) {
      this._getAllFED();
    } else {
      this._getSearchFED();
    }
    this.setState({ refreshing: false });
  }
  renderFooter() {
    if (!this.state.loading) return null;
    return <Spinner />;
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
          placeholder="نام، مشخصات و..."
        />
        <FlatList
          data={this.props.FED}
          renderItem={({ item }) => <FederationCard FED={item} />}
          keyExtractor={item => item.doctorid}
          ListEmptyComponent={() => <Spinner />}
          onRefresh={this.handleRefresh.bind(this)}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
      </View>
    );
  }
}