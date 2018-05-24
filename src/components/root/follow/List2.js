import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';

@connect(state => ({
  tokenapi: state.buffet.tokenapi,
}))
export default class List2 extends Component {
  state = {
    max: 70,
    ssort: true,
    fsort: 0,
  };
  renderItem({ item }) {
    // return <CoachCard coach={item}/>
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.props.order}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idcoach}
          ListEmptyComponent={() => <Spinner />}
          scrollEnabled={false}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}
