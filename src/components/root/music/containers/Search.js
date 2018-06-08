import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Hideo } from 'react-native-textinput-effects';
import ActionCreators from '../actions';
import Styles from '../styles';
import SearchResults from './SearchResults';

class Search extends Component {
  state = { searchQuery: '', page: 'search' };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={[Styles.homeContainer, { paddingBottom: !this.props.songs.length ? 50 : 100 }]}>
          <View style={Styles.searchInputContainer}>
            {/* <Hideo */}
            {/* iconClass={Icon} */}
            {/* iconName="search" */}
            {/* iconColor="white" */}
            {/* iconBackgroundColor="#c8c3c3" */}
            {/* inputStyle={{ color: '#464949' }} */}
            {/* placeholder="Song name" */}
            {/* value={this.state.searchQuery} */}
            {/* onChangeText={searchQuery => this.setState({ searchQuery })} */}
            {/* onSubmitEditing={() => this.props.searchSong(this.state.searchQuery)} */}
            {/* /> */}
          </View>
          <SearchResults />
        </View>

      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(store) {
  return {
    songs: store.playlist
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
