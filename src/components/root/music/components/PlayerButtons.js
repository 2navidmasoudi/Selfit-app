// import React, { Component } from 'react';
// import { Text, View } from 'react-native';
// import { Icon } from 'native-base';
// import Slider from 'react-native-slider';
// import Styles from '../styles';
// import * as Utils from '../helpers/utils';
//
// export class PlayButton extends Component {
//   render() {
//     return (<Icon
//       onPress={this.props.togglePlay}
//       style={Styles.play}
//       name={this.props.playing ? 'ios-pause' : 'ios-play'}
//       size={70}
//       color="#fff"
//     />);
//   }
// }
//
// export class ForwardButton extends Component {
//   render() {
//     let forwardButton = null;
//     if (!this.props.shuffle && this.props.songIndex + 1 === this.props.songs.length) {
//       forwardButton = <Icon style={Styles.forward} name="ios-skip-forward" size={25} color="#333" />;
//     } else {
//       forwardButton =
//         <Icon onPress={this.props.goForward} style={Styles.forward} name="ios-skip-forward" size={25} color="#fff" />;
//     }
//
//     return forwardButton;
//   }
// }
//
// export class BackwardButton extends Component {
//   render() {
//     return <Icon onPress={this.props.goBackward} style={Styles.back} name="ios-skip-backward" size={25} color="#fff" />;
//   }
// }
//
// export class VolumeButton extends Component {
//   render() {
//     return (<Icon
//       onPress={this.props.toggleVolume}
//       style={Styles.volume}
//       name={this.props.volume ? 'volume-up' : 'volume-off'}
//       size={18}
//       color="#fff"
//     />);
//   }
// }
//
// export class ShuffleButton extends Component {
//   render() {
//     return (<Icon
//       onPress={this.props.toggleShuffle}
//       style={Styles.shuffle}
//       name="shuffle"
//       size={18}
//       color={this.props.shuffle ? '#f62976' : '#fff'}
//     />);
//   }
// }
//
// export class DownloadButton extends Component {
//   render() {
//     if (this.props.downloading || this.props.downloaded) {
//       return <Icon style={Styles.downloadButton} name="download" size={25} color="#333" />;
//     }
//     return (<Icon
//       onPress={this.props.downloadMusic}
//       style={Styles.downloadButton}
//       name="download"
//       size={25}
//       color="#fff"
//     />);
//   }
// }
//
// export class SongSlider extends Component {
//   render() {
//     return (
//       <View style={Styles.sliderContainer}>
//         <Slider
//           {...this.props}
//           minimumTrackTintColor="#fff"
//           style={Styles.slider}
//           trackStyle={Styles.sliderTrack}
//           thumbStyle={Styles.sliderThumb}
//         />
//
//         <View style={Styles.timeInfo}>
//           <Text style={Styles.time}>{Utils.formattedTime(this.props.currentTime)}</Text>
//           <Text
//             style={Styles.timeRight}
//           >- {Utils.formattedTime(this.props.songDuration - this.props.currentTime)}
//           </Text>
//         </View>
//       </View>
//     );
//   }
// }
