import React, { Component } from 'react';
import { Dimensions, Image, Platform, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../actions';
import Styles from '../styles';
import {
  BackwardButton,
  DownloadButton,
  ForwardButton,
  PlayButton,
  ShuffleButton,
  SongSlider,
  VolumeButton
} from '../components/PlayerButtons';
import * as Progress from 'react-native-progress';

const { height, width } = Dimensions.get('window');

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: false,
      shuffle: false,
      sliding: false,
      currentTime: 0,
      minimized: true
    };
  }

  togglePlay() {
    this.props.togglePlay(!this.props.playing);
  }

  toggleVolume() {
    this.props.setVolume(Math.abs(this.props.volume - 1));
  }

  toggleShuffle() {
    this.props.toggleShuffle(!this.props.shuffle);
  }

  goBackward() {
    this.props.goBackward();
  }

  goForward() {
    this.props.goForward();
  }

  setTime(params) {
    if (!this.state.sliding) {
      this.props.setTime(params);
      this.setState({ currentTime: params.currentTime });
    }
  }

  onSlidingStart() {
    this.setState({ sliding: true });
  }

  onSlidingChange(value) {
    const newPosition = value * this.props.duration;
    this.setState({ currentTime: newPosition });
  }

  onSlidingComplete() {
    this.props.onSlidingComplete(this.state.currentTime);
    this.setState({ sliding: false });
  }

  onEnd() {
    this.props.onEnd();
    this.setState({ playing: false });
  }

  songImage = require('../img/music.jpg');

  renderProgressBar() {
    const song = this.props.songs[this.props.songIndex];
    if (song.downloading) {
      return (<Progress.Bar
        progress={this.props.progreses[song.id]}
        width={width}
        color="#fff"
        borderColor="transparent"
      />);
    }
    return null;
  }

  render() {
    let songPercentage;
    if (this.props.duration) {
      songPercentage = this.props.currentTime / this.props.duration;
    } else {
      songPercentage = 0;
    }
    return (
      <View style={Styles.container}>
        <View style={Styles.header}>
          <Text style={Styles.headerText}>
            {this.props.songs[this.props.songIndex].artist}
          </Text>
        </View>
        <DownloadButton
          download={this.props.searchedSongs}
          downloading={this.props.songs[this.props.songIndex].downloading}
          downloaded={this.props.songs[this.props.songIndex].downloaded}
          downloadMusic={() => this.props.downloadMusic(this.props.songs[this.props.songIndex], this.props.songs[this.props.songIndex].pathChanged)}
        />
        {this.renderProgressBar()}
        <Image
          style={Styles.songImage}
          source={{ uri: (Platform.OS == 'android' ? 'file://' : '') + this.props.songs[this.props.songIndex].thumb }}
        />
        <Text style={Styles.songTitle} numberOfLines={1}>
          {this.props.songs[this.props.songIndex].title}
        </Text>
        <SongSlider
          onSlidingStart={this.onSlidingStart.bind(this)}
          onSlidingComplete={this.onSlidingComplete.bind(this)}
          onValueChange={this.onSlidingChange.bind(this)}
          value={songPercentage}
          songDuration={this.props.duration}
          currentTime={this.props.currentTime}
          disabled
        />
        <View style={Styles.controls}>
          <ShuffleButton
            shuffle={this.props.shuffle}
            toggleShuffle={this.toggleShuffle.bind(this)}
            disabled={this.props.search}
          />
          <BackwardButton
            goBackward={this.goBackward.bind(this)}
          />
          <PlayButton
            togglePlay={this.togglePlay.bind(this)}
            playing={this.props.playing}
          />
          <ForwardButton
            songs={this.props.songs}
            shuffle={this.props.shuffle}
            songIndex={this.props.songIndex}
            goForward={this.goForward.bind(this)}
            disabled={this.props.search}
          />
          <VolumeButton
            volume={this.props.volume}
            toggleVolume={this.toggleVolume.bind(this)}
          />
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
    songs: store.playlist,
    searchResults: store.searchResults,
    progreses: store.progreses,
    duration: store.songDuration,
    playing: store.playing,
    currentTime: store.songProgress,
    songIndex: store.songIndex,
    shuffle: store.shuffle,
    volume: store.volume
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
