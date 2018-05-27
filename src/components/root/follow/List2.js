import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Separator, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { getFactorBuffet } from '../../../services/orderBuffet';
import { tokenBuffet } from '../../../redux/actions';
import { Text } from '../../Kit';

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  tokenBuffet,
})
export default class List2 extends Component {
  state = {
    max: 30,
    min: 0,
    ssort: false,
    fsort: 0,
    payedFactor: null,
    refreshing: true,
  };
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    await this.getPayedFactors();
  }
  async getPayedFactors() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const { max, min, ssort, fsort } = await this.state;
      const payedFactor = await getFactorBuffet(
        1, 1,
        tokenmember, tokenapi,
        max, min, ssort, fsort
      );
      this.setState({ payedFactor });
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
          <Text type="bold" style={{ flex: 1, textAlign: 'center', padding: 5 }}>بوفه</Text>
        </Separator>
        <FlatList
          data={this.state.payedFactor}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idfactorbuffet}
          ListEmptyComponent={<Text style={{ marginRight: 20 }}>هیچ فاکتوری دریافت نشد...</Text>}
          refreshing={this.state.refreshing}
          // onRefresh={() => <Spinner />}
          scrollEnabled={false}
          onEndReachedThreshold={0.5}
        />
        <Separator>
          <Text type="bold" style={{ flex: 1, textAlign: 'center', padding: 5 }}>فروشگاه</Text>
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
