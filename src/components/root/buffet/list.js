import React, { Component } from 'react';
import { FlatList, Platform, View, Image } from 'react-native';
import { Fab, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';
import BuffetCard from './BuffetCard';
import { decrementMin, incrementMin, receiveBuffet, refreshBuffet, tokenBuffet } from '../../../redux/actions';
import { getAllBuffet, getAllBuffets, getSearchBuffet } from '../../../services/buffet';
import { Text, Modal } from '../../Kit';
import Loader from '../../loader';
import Pic1 from '../../../assets/helpPics/BuffetList/BuffetSearch.png';
import Pic2 from '../../../assets/helpPics/BuffetList/BuffetDetailList.png';
import { helpDoneBuffetList } from '../../../redux/actions/help';

@connect(state => ({
  buffet: state.buffet.BuffetList,
  min: state.buffet.min,
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  help: state.help.BuffetList,
}), {
  receiveBuffet,
  incrementMin,
  decrementMin,
  refreshBuffet,
  tokenBuffet,
  helpDoneBuffetList
})
export default class List extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      refreshing: false,
      search: null,
      searchMode: false,
      ModalNumber: 0,
    };
    this.searchText = this.searchText.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  async componentWillMount() {
    if (!this.props.help) {
      this.setState({ ModalNumber: 1 });
    }
    await this.props.tokenBuffet('selfit.buffet');
    this.getBuffetList();
    console.log('componentMountedNow');
  }
  async getBuffetList() {
    try {
      this.setState({ loading: true });
      const { tokenmember, latval, longval } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const json = await getAllBuffets(tokenmember, tokenapi, 120, min, false, 0);
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
        searchMode: true,
        loading: true,
      });
      const { search } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const json = await getSearchBuffet(search, tokenmember, tokenapi, 120, min, false, 0);
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
  helpDone = () => this.props.helpDoneBuffetList();
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}
      >
        <Modal
          isVisible={this.state.ModalNumber === 1}
          onModalHide={() => this.setState({ ModalNumber: 2 })}
          exitText="ممنون"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 100,
            }}
            source={Pic1}
            resizeMode="contain"
          />
          <Text>
            از اینجا میتونی بوفه مورد نظر خودت رو بر اساس اسم یا آدرس
            اون جستجو کنی.
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 2}
          onModalHide={this.helpDone}
          exitText="تمام"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 140,
            }}
            source={Pic2}
            resizeMode="contain"
          />
          <Text>
            با زدن این باکس می تونی جزئیات و منو بوفه رو ببینی و سفارش غذای رژیمی بدی!
          </Text>
        </Modal>
        <SearchBar
          showLoading
          onChangeText={this.searchText}
          placeholder="نام، آدرس..."
          inputStyle={{ textAlign: Platform.OS === 'ios' ? 'right' : undefined, fontFamily: 'IRANSansMobile', fontSize: 12 }}
        />
        <FlatList
          data={this.props.buffet}
          renderItem={({ item }) => <BuffetCard buffet={item} />}
          keyExtractor={item => item.buffetid}
          ListEmptyComponent={<Loader loading={this.state.loading} />}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
        />
        { this.props.user.typememberid === 1 &&
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
          onPress={() => Actions.fullMapBuffet()}
        >
          <Text style={{ fontSize: 18 }}>کل بوفه ها</Text>
        </Fab>}
      </View>
    );
  }
}
