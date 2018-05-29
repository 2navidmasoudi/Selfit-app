import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import CoachCard from './CoachCard';
import { decrementMin, incrementMin, receiveGym, refreshGym, tokenGym } from '../../../redux/actions/index';
import { getAllCoach, getSearchCoach } from '../../../services/coach';
import { logError } from '../../../services/log';

const mapDispatchToProps = dispatch => ({
  receiveCoach: (gym, min) => dispatch(receiveGym(gym, min)),
  incrementMin: () => dispatch(incrementMin()),
  decrementMin: () => dispatch(decrementMin()),
  refreshCoach: () => dispatch(refreshGym()),
  tokenCoach: tokenapi => dispatch(tokenGym(tokenapi)),
});
@connect(state => ({
  coach: state.gym.GymList,
  min: state.gym.min,
  user: state.user,
  tokenapi: state.gym.tokenapi,
}), mapDispatchToProps)
export default class List1 extends Component {
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
      const { search, max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const CoachList = await getSearchCoach(search, tokenmember, tokenapi, max, min, ssort, fsort);
      await this.props.receiveCoach(CoachList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }
  async _getAllCoach() {
    try {
      const { max, ssort, fsort } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const CoachList = await getAllCoach(tokenmember, tokenapi, max, min, ssort, fsort);
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
    if (this.props.gym.length >= 70 && !this.state.loading) {
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
  renderItem({ item }) {
    return <CoachCard coach={item} />;
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
          data={this.props.coach}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idcoach}
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
