import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Separator, Spinner } from 'native-base';
import { connect } from 'react-redux';

// PARDAKHT NASHODE!!!!
@connect(state => ({
  tokenapi: state.buffet.tokenapi,
}))
export default
class List1 extends Component {
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
        <Separator>
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 24 }}>تایید شده توسط بوفه دار</Text>
        </Separator>
        <FlatList
          data={this.props.order}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.idcoach}
          ListEmptyComponent={() => <Spinner />}
          scrollEnabled={false}
          onEndReachedThreshold={0.5}
        />
        <Separator>
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 24 }}>تایید نشده توسط بوفه دار</Text>
        </Separator>
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
