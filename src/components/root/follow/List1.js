import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import { tokenBuffet } from '../../../redux/actions';
import { getFactorBuffet } from '../../../services/orderBuffet';
import { Text } from '../../Kit';
import FactorCard from './FactorCardBuffet';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  tokenBuffet,
})
export default class List1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
    };
    this.getUnpayedFactors = this.getUnpayedFactors.bind(this);
  }


  async componentWillMount() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.getUnpayedFactors();
  }

  async getUnpayedFactors() {
    try {
      this.setState({ refreshing: true });
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const unpayedFactors = await getFactorBuffet(
        3, 6,
        tokenmember, tokenapi,
        20, 0, null
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
          onRefresh={this.getUnpayedFactors}
        />
      </Content>
    );
  }
}
