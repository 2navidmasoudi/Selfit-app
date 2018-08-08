import React, { Component } from 'react';
import { FlatList, View, Platform, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Fab, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllGym, getSearchGym } from '../../../services/gym';
import GymCard from './GymCard';
import { decrementMin, incrementMin, receiveGym, refreshGym, tokenGym } from '../../../redux/actions/index';
import { Text, Modal } from '../../Kit';
import Loader from '../../loader';
import Pic1 from '../../../assets/helpPics/GymList/SearchGym.png';
import Pic2 from '../../../assets/helpPics/GymList/SelectGymList.png';
import Pic3 from '../../../assets/helpPics/GymList/ShowMapGym.png';
import { helpDoneGymList } from '../../../redux/actions/help';

@connect(state => ({
  gym: state.gym.GymList,
  min: state.gym.min,
  user: state.user,
  tokenapi: state.gym.tokenapi,
  help: state.help.GymList,
}), {
  receiveGym,
  incrementMin,
  decrementMin,
  refreshGym,
  tokenGym,
  helpDoneGymList
})
export default class List extends Component {
  // static propTypes = {
  //   tokenGym: PropTypes.func.isRequired,
  //   refreshGym: PropTypes.func.isRequired,
  //   incrementMin: PropTypes.func.isRequired,
  //   receiveGym: PropTypes.func.isRequired,
  //   user: PropTypes.any.isRequired,
  //   gym: PropTypes.node,
  // };
  // static defaultProps = {
  //   gym: [],
  // }
  constructor() {
    super();
    this.state = {
      loading: true,
      refreshing: false,
      search: null,
      searchMode: false,
      ModalNumber: 0,
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }
  async componentWillMount() {
    await this.props.tokenGym('selfit.gym');
    this.getGymList();
    if (!this.props.help) {
      this.setState({ ModalNumber: 1 });
    }
  }
  onRefresh() {
    this.props.refreshGym();
    this.setState({ refreshing: true });
    if (!this.state.searchMode) {
      this.getGymList();
    } else {
      this.searchGym();
    }
  }
  async onEndReached() {
    if (this.props.gym.length >= 120 && !this.state.loading) {
      await this.props.incrementMin();
      if (!this.state.searchMode) {
        this.getGymList();
      } else {
        this.searchGym();
      }
    }
  }
  async onChangeText(text) {
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
  async getGymList() {
    this.setState({ loading: true });
    const { tokenmember, latval, longval } = await this.props.user;
    const { min, tokenapi } = await this.props;
    const GymList =
        await getAllGym(latval, longval, tokenmember, tokenapi, 120, min, false, 0);
    console.log(GymList);
    await this.props.receiveGym(GymList, min);
    this.setState({ loading: false, refreshing: false });
  }
  async searchGym() {
    try {
      if (!this.state.search) this.refreshGym();
      await this.setState({
        searchMode: true,
        loading: true,
      });
      const { search } = await this.state;
      const { tokenmember } = await this.props.user;
      const { min, tokenapi } = await this.props;
      const GymList = await getSearchGym(search, tokenmember, tokenapi, 120, min, false, 0);
      await this.props.receiveGym(GymList, min);
      this.setState({ loading: false, refreshing: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  }
  helpDone = () => this.props.helpDoneGymList();
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
            از اینجا میتونی اسم یا آدرس باشگاه مورد نظرتو جستجو کنی!
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 2}
          onModalHide={() => this.setState({ ModalNumber: 3 })}
          exitText="خیلی خب"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 150,
            }}
            source={Pic2}
            resizeMode="contain"
          />
          <Text>
            با زدن این باکس می تونی جزئیات باشگاه رو ببینی.
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 3}
          onModalHide={this.helpDone}
          exitText="تمام"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 200,
            }}
            source={Pic3}
            resizeMode="contain"
          />
          <Text>
            با زدن دکمه نقشه میتونی باشگاه ها رو در نقشه پیدا کنی
          </Text>
        </Modal>
        <SearchBar
          showLoading
          onChangeText={this.onChangeText}
          placeholder="نام، آدرس..."
          inputStyle={{ textAlign: Platform.OS === 'ios' ? 'right' : undefined, fontFamily: 'IRANSansMobile', fontSize: 12 }}
        />
        <FlatList
          data={this.props.gym}
          renderItem={({ item }) => <GymCard gym={item} />}
          keyExtractor={item => item.idgym}
          ListEmptyComponent={<Loader loading={this.state.loading} />}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.5}
        />
        {this.props.user.typememberid === 1 &&
        <Fab
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 120,
            right: 5,
            borderRadius: 10,
            backgroundColor: '#0F9D7A'
          }}
          position="bottomRight"
          onPress={() => Actions.fullMap()}
        >
          <Text style={{ fontSize: 18 }}>کل باشگاه ها</Text>
        </Fab>}
      </View>
    );
  }
}
