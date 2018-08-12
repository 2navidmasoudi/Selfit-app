import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Content, Separator } from 'native-base';
import { connect } from 'react-redux';
import { tokenBuffet } from '../../../redux/actions';
import { getFactorBuffet } from '../../../services/orderBuffet';
import { Text } from '../../Kit';
import FactorCard from './FactorCardBuffet';

// PARDAKHT NASHODE!!!!
@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  tokenBuffet,
})
export default class List1 extends Component {
  state = {
    max: 50,
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
      this.setState({ refreshing: true });
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { max, min, ssort, fsort } = await this.state;
      const unpayedFactors = await getFactorBuffet(
        1, 2,
        tokenmember, tokenapi,
        max, min, 'idfactorbuffet%20desc'
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
      <Content padder scrollEnabled={false}>
        <FlatList
          data={this.state.unpayedFactors}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idfactorbuffet}
          ListEmptyComponent={<Text style={{ marginRight: 20 }}>هیچ فاکتوری دریافت نشد...</Text>}
          refreshing={this.state.refreshing}
          onRefresh={this.getUnpayedFactors.bind(this)}
        />
      </Content>
    );
  }
}
