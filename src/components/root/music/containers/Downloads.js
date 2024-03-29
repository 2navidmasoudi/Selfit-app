// import React, { Component } from 'react';
// import { FlatList, List, TouchableOpacity, View } from 'react-native';
// import { Icon } from 'native-base';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import Styles from '../styles';
// import Song from '../components/Song';
// import ActionCreators from '../actions';
//
// let self = null;
//
// class Downloads extends Component {
//   constructor(props) {
//     super(props);
//     self = this;
//   }
//   state = { page: 'download' };
//
//   static renderRightButton(props) {
//     return (<TouchableOpacity onPress={Downloads.onRight}>
//       <Icon name="refresh" size={20} />
//     </TouchableOpacity>);
//   }
//
//   static onRight() {
//     self && self.props.recoverDeletedSongs(self.props.songs);
//   }
//
//   onSongPlay(index) {
//     this.props.setPlayingSong(index, this.props.songs);
//   }
//
//   deleteSong(index) {
//     this.props.deleteSong(index, this.props.songs[index]);
//   }
//
//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <View style={Styles.homeContainer}>
//           <FlatList
//             data={this.props.songs}
//             renderItem={({ item, index }) => (<Song
//               onPress={this.onSongPlay.bind(this, index)}
//               songName={item.title}
//               artistName={item.artist}
//               songImage={item.thumb}
//               deleteMusic={this.deleteSong.bind(this, index)}
//               songIndex={index}
//               id={item.id}
//             />)}
//           />
//         </View>
//       </View>);
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ActionCreators, dispatch);
// }
//
// function mapStateToProps(store) {
//   return {
//     songs: store.songs
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Downloads);
