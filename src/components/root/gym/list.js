import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Fab, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { getAllGym, getSearchGym } from '../../../services/gym';
import GymCard from './GymCard';
import { decrementMin, incrementMin, receiveGym, refreshGym, tokenGym } from '../../../redux/actions/index';
import { Text } from '../../Kit';

@connect(state => ({
  gym: state.gym.GymList,
  min: state.gym.min,
  user: state.user,
  tokenapi: state.gym.tokenapi,
}), {
  receiveGym,
  incrementMin,
  decrementMin,
  refreshGym,
  tokenGym,
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
    this.setInfo();
  }
  async setInfo() {
    await this.props.tokenGym('selfit.gym');
    await this.getGymList();
  }
  async getGymList() {
    try {
      const { max, ssort, fsort } = await this.state;
      const { tokenmember, latval, longval } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const GymList = await getAllGym(latval, longval, tokenmember, tokenapi, 10, min, ssort, fsort);
      console.log(GymList);
      await this.props.receiveGym(GymList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
    }
  }
  async searchGym() {
    try {
      if (!this.state.search) this.refreshGym();
      await this.setState({
        searchMode: true
      });
      const { search, max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const GymList = await getSearchGym(search, tokenmember, tokenapi, max, min, ssort, fsort);
      await this.props.receiveGym(GymList, min);
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
      await this.searchGym();
    } else {
      await this.setState({
        searchMode: false,
      });
      await this.props.refreshGym();
      await this.getGymList();
    }
  }
  async handleLoadMore() {
    if (this.props.gym.length >= 10 && !this.state.loading) {
      console.log('Request Load More');
      await this.props.incrementMin();
      await this.setState({ loading: true });
      if (!this.state.searchMode) {
        this.getGymList();
      } else {
        this.searchGym();
      }
    }
  }
  handleRefresh() {
    this.props.refreshGym();
    this.setState({ refreshing: true });
    if (!this.state.searchMode) {
      this.getGymList();
    } else {
      this.searchGym();
    }
  }
  renderItem({ item }) {
    return <GymCard gym={item} />;
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
          data={this.props.gym}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idgym}
          ListEmptyComponent={() => <Spinner />}
          onRefresh={this.handleRefresh.bind(this)}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
        <Fab
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
          <Text style={{ fontSize: 18 }}>کل باشگاه ها</Text>
        </Fab>
      </View>
    );
  }
}
