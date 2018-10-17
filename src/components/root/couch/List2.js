import React, { Component } from 'react';
import {FlatList, Platform, View} from 'react-native';
import { Spinner } from 'native-base';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import CoachCard from './CoachCard';
import {
  decrementMin,
  incrementMin,
  receiveBuffet,
  refreshGym,
  tokenGym
} from '../../../redux/actions/index';
import { getAllCoach, getSearchCoach } from '../../../services/coach';
import { logError } from '../../../services/log';
import Loader from "../../loader/index";

const mapDispatchToProps = dispatch => ({
  receiveCoach: (gym, min) => dispatch(receiveBuffet(gym, min)),
  incrementMin: () => dispatch(incrementMin()),
  decrementMin: () => dispatch(decrementMin()),
  refreshCoach: () => dispatch(refreshGym()),
  tokenCoach: tokenapi => dispatch(tokenGym(tokenapi)),
});
@connect(state => ({
  coach: state.buffet.BuffetList,
  min: state.gym.min,
  user: state.user,
  tokenapi: state.gym.tokenapi,
}), mapDispatchToProps)
export default class List2 extends Component {
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
    await this.props.tokenCoach('selfit.public');
    this._getAllCoach();
  }
  async searchText(text) {
    if (text) {
      await this.setState({
        search: text
      });
      this._getSearchCoach();
    } else {
      await this.setState({
        searchMode: false,
      });
      await this.props.refreshCoach();
      await this._getAllCoach();
    }
  }
  async _getSearchCoach() {
    try {
      if (!this.state.search) this.refreshCoach();
      await this.setState({
        searchMode: true
      });
      const { search, max } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const CoachList = await getSearchCoach(search, tokenmember, tokenapi, max, min, null);
      await this.props.receiveCoach(CoachList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }
  async _getAllCoach() {
    try {
      const { max } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const CoachList = await getAllCoach(2, tokenmember, tokenapi, max, min, null);
      console.log(CoachList);
      await this.props.receiveCoach(CoachList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      logError(error, '_getAllCouch', 'Coach/List1(Comments)', 'getAllCoach');
      this.setState({ loading: false });
    }
  }
  async handleLoadMore() {
    if (this.props.coach.length >= 120 && !this.state.loading) {
      console.log('Request Load More');
      await this.props.incrementMin();
      await this.setState({ loading: true });
      if (!this.state.searchMode) {
        this._getAllCoach();
      } else {
        this._getSearchCoach();
      }
    }
  }
  handleRefresh() {
    this.props.refreshCoach();
    this.setState({ refreshing: true });
    if (!this.state.searchMode) {
      this._getAllCoach();
    } else {
      this._getSearchCoach();
    }
    this.setState({ refreshing: false });
  }
  renderItem = ({ item }) => <CoachCard coach={item} />
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
          inputStyle={{ textAlign: Platform.OS === 'ios' ? 'right' : undefined, fontFamily: 'IRANSansMobile', fontSize: 12 }}
        />
        <FlatList
          data={this.props.coach}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idcoach}
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
