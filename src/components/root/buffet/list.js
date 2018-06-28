import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Fab, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';
import BuffetCard from './BuffetCard';
import { decrementMin, incrementMin, receiveBuffet, refreshBuffet, tokenBuffet } from '../../../redux/actions';
import { getAllBuffet, getAllBuffets, getSearchBuffet } from '../../../services/buffet';
import { Text } from '../../Kit';

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
    max: 70,
    ssort: false,
    fsort: 0,
    loading: false,
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
      const json = await getAllBuffets(tokenmember, tokenapi, max, min, ssort, fsort);
      // const json = await getAllBuffet(latval, longval, tokenmember, tokenapi, max, min, ssort, fsort);
      console.log(json);
      const BuffetList = await json.BuffetMapList.$values;
      await this.props.receiveBuffet(BuffetList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, refreshing: false });
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
      this.setState({ loading: false, refreshing: false });
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
    if (this.props.buffet.length >= 70 && !this.state.loading) {
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
          placeholder="نام، آدرس..."
        />
        <FlatList
          data={this.props.buffet}
          renderItem={({ item }) => <BuffetCard buffet={item} />}
          keyExtractor={item => item.buffetid}
          ListEmptyComponent={() => <Spinner />}
          onRefresh={this.handleRefresh.bind(this)}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
        { this.props.user.typememberid === 1 && <Fab
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 120,
            right: 5,
            bottom: 5,
            borderRadius: 10,
            backgroundColor: '#0F9D7A'
          }}
          position="bottomRight"
          onPress={() => Actions.fullMap()}
        >
          <Text style={{ fontSize: 18 }}>کل بوفه ها</Text>
        </Fab>}
      </View>
    );
  }
}
