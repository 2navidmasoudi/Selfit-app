import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Card, CardItem, Left, Right, Separator, Spinner } from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment-jalaali';
import { tokenBuffet } from '../../../redux/actions';
import { getFactorBuffet } from '../../../services/orderBuffet';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { errorColor, mainColor } from '../../../assets/variables/colors';
import FactorCard from './FactorCard';

// PARDAKHT NASHODE!!!!
@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  tokenBuffet,
})
export default class List1 extends Component {
  state = {
    max: 30,
    min: 0,
    ssort: false,
    fsort: 0,
    unpayedFactors: null,
    refreshing: true,
  };
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.getUnpayedFactors();
  }
  async getUnpayedFactors() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { max, min, ssort, fsort } = await this.state;
      const unpayedFactors = await getFactorBuffet(
        1, 2,
        tokenmember, tokenapi,
        max, min, ssort, fsort
      );
      this.setState({ unpayedFactors });
      this.setState({ refreshing: false });
    } catch (e) {
      console.log(e);
      this.setState({ refreshing: false });
    }
  }
  renderItem = ({ item }) => (
    <FactorCard item={item} />
  );
  render() {
    return (
      <View>
        <Separator>
          <Text type="bold" style={{ flex: 1, textAlign: 'center', padding: 5 }}>تایید شده توسط بوفه دار</Text>
        </Separator>
        <FlatList
          data={this.state.unpayedFactors}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idfactorbuffet}
          ListEmptyComponent={<Text style={{ marginRight: 20 }}>هیچ فاکتوری دریافت نشد...</Text>}
          refreshing={this.state.refreshing}
          // onRefresh={() => <Spinner />}
          scrollEnabled={false}
          onEndReachedThreshold={0.5}
        />
        <Separator>
          <Text type="bold" style={{ flex: 1, textAlign: 'center', padding: 5 }}>منتظر تایید توسط بوفه دار </Text>
        </Separator>
        <FlatList
          data={this.props.order}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idcoach}
          ListEmptyComponent={<Text style={{ marginRight: 20 }}>هیچ فاکتوری دریافت نشد...</Text>}
          refreshing={this.state.refreshing}
          scrollEnabled={false}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}
