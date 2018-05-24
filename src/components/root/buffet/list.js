import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import BuffetCard from './BuffetCard';
import { decrementMin, incrementMin, receiveBuffet, refreshBuffet, tokenBuffet } from '../../../redux/actions';
import { getAllBuffet, getSearchBuffet } from '../../../services/buffet';

@connect(state => ({
  buffet: state.buffet.BuffetList,
  min: state.buffet.min,
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  receiveBuffet,
  incrementMin,
  decrementMin,
  refreshBuffet,
  tokenBuffet,
})
export default class List extends Component {
  state = {
    max: 10,
    ssort: false,
    fsort: 0,
    loading: 0,
    refreshing: false,
    search: null,
    searchMode: false,
  };
  componentWillMount() {
    this.props.tokenBuffet('selfit.buffet');
    this.getBuffetList();
  }
  async getBuffetList() {
    try {
      const { max, ssort, fsort } = await this.state;
      const { tokenmember, latval, longval } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const json = await getAllBuffet(latval, longval, tokenmember, tokenapi, max, min, ssort, fsort);
      console.log(json);
      const BuffetList = await json.BuffetMapList.$values;
      await this.props.receiveBuffet(BuffetList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }
  async searchBuffet() {
    try {
      if (!this.state.search) this.refreshBuffet();
      await this.setState({
        searchMode: true
      });
      const { search, max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const json = await getSearchBuffet(search, tokenmember, tokenapi, max, min, ssort, fsort);
      const BuffetList = await json.BuffetSearch.$values;
      await this.props.receiveBuffet(BuffetList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }
  async searchText(text) {
    if (text) {
      await this.setState({
        search: text
      });
      this.searchBuffet();
    } else {
      await this.setState({
        searchMode: false,
      });
      await this.props.refreshBuffet();
      await this.getBuffetList();
    }
  }
  async handleLoadMore() {
    if (this.props.buffet.length >= 10 && !this.state.loading) {
      console.log('Request Load More');
      this.props.incrementMin();
      this.setState({ loading: true });
      if (!this.state.searchMode) {
        this.getBuffetList();
      } else {
        this.searchBuffet();
      }
    }
  }
  handleRefresh() {
    this.props.refreshBuffet();
    this.setState({ refreshing: true });
    if (!this.state.searchMode) {
      this.getBuffetList();
    } else {
      this.searchBuffet();
    }
  }
  renderItem({ item }) {
    return <BuffetCard buffet={item} />;
  }
  renderFooter() {
    if (!this.state.loading) return null;
    return <Spinner />;
  }
  render() {
    return (
      <View>
        <SearchBar
          showLoading
          onChangeText={this.searchText.bind(this)}
          placeholder="نام، آدرس..."
        />
        <FlatList
          data={this.props.buffet}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.buffetid}
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
