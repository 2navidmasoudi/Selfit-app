// import React, { Component } from 'react';
// import { ActivityIndicator, Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
// import { Icon } from 'native-base';
// import Swipeout from 'react-native-swipeout';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import Styles from '../styles';
// import ActionCreators from '../actions';
//
// const { height, width } = Dimensions.get('window');
//
// class Song extends Component {
//   state = { songImage: '../img/music.jpg', downloading: false };
//   swipeBtns = [{
//     text: 'Delete',
//     backgroundColor: 'red',
//     onPress: () => {
//       this.props.deleteMusic();
//     }
//   }];
//
//   async downloadMusic(song) {
//     this.setState({ downloading: true });
//     await this.props.downloadMusic(song, song.pathChanged);
//     this.setState({ downloading: false });
//   }
//
//   render() {
//     return this.props.search ? SearchedSong.call(this) : DownloadedSong.call(this);
//   }
// }
//
// function DownloadedSong() {
//   return (<Swipeout
//     right={this.swipeBtns}
//     backgroundColor="transparent"
//     autoClose
//   >
//     <TouchableOpacity style={Styles.downloadSongContainer} onPress={this.props.onPress}>
//       <View style={Styles.songView}>
//         <Image
//           source={{ uri: (Platform.OS == 'android' ? 'file://' : '') + this.props.songImage || this.state.songImage }}
//           style={Styles.songTitleImage}
//         />
//         <View style={Styles.songTitleContainer}>
//           <Text style={Styles.songArtistText} numberOfLines={1}>{this.props.artistName || 'Unknown Artist'}</Text>
//           <Text style={Styles.songTitleText} numberOfLines={1}>{this.props.songName || 'Unknown Song'}</Text>
//         </View>
//         {renderProgressBar.call(this, true)}
//       </View>
//     </TouchableOpacity>
//   </Swipeout>);
// }
//
// function renderProgressBar(downloads) {
//   const song = this.props[downloads ? 'songs' : 'searchResults'][this.props.songIndex];
//   if (song.preparing) {
//     return <ActivityIndicator animating size="small" />;
//   }
//
//   if (song.downloaded && !downloads) {
//     return (
//       <View style={{ width: 60, paddingLeft: 20 }}>
//         <Icon name="md-play" size={40} />
//       </View>);
//   }
//
//   const progress = this.props.progreses[this.props.id];
//   if (song.downloading || this.state.downloading) {
//     return (<AnimatedCircularProgress
//       size={40}
//       width={3}
//       fill={progress ? progress * 100 : 0}
//       tintColor="#00e0ff"
//       backgroundColor="#3d5875"
//     />);
//   }
//
//   if (downloads) return null;
//
//   return (
//     <TouchableOpacity
//       onPress={() => !song.downloading && this.downloadMusic(song)}
//       style={{ width: 60, paddingLeft: 20 }}
//     >
//       <Icon name="md-download" size={40} />
//     </TouchableOpacity>
//   );
// }
//
// function SearchedSong() {
//   const song = this.props.searchResults[this.props.songIndex];
//   return (<TouchableOpacity style={Styles.searchSongContainer} onPress={() => this.props.onPress(song.downloaded)}>
//     <View style={[Styles.songView, { width: width - 60 }]}>
//       <Image
//         source={{ uri: this.props.songImage || this.state.songImage }}
//         style={Styles.songTitleImage}
//       />
//       <View style={Styles.songTitleContainer}>
//         <Text style={Styles.songArtistText} numberOfLines={1}>{this.props.artistName || 'Unknown Artist'}</Text>
//         <Text style={Styles.songTitleText} numberOfLines={1}>{this.props.songName || 'Unknown Song'}</Text>
//       </View>
//     </View>
//     {renderProgressBar.call(this)}
//   </TouchableOpacity>);
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ActionCreators, dispatch);
// }
//
// function mapStateToProps(store) {
//   return {
//     progreses: store.progreses,
//     searchResults: store.searchResults,
//     songs: store.songs
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Song);
