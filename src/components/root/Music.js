import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Icon } from 'native-base';
import Slider from 'react-native-slider';
import Video from 'react-native-video';
import AppHeader from '../header';

const window = Dimensions.get('window');

export default class Music extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      muted: false,
      shuffle: false,
      sliding: false,
      currentTime: 0,
      // songIndex: props.songIndex,
      songIndex: 0,

      songs: [{
        title: 'Selfit',
        album: 'Start Up!',
        albumImage: require('../../assets/Logo.jpg'),
        url: 'https://hw6.asset.aparat.com/aparat-video/a6c54d51d5e38b409bd9318f9830695a8042277-360p__56626.apt/chunk.m3u8',
      }]
    };
  }
  onLoad(params) {
    this.setState({ songDuration: params.duration });
  }
  onSlidingStart() {
    this.setState({ sliding: true });
  }
  onSlidingChange(value) {
    const newPosition = value * this.state.songDuration;
    this.setState({ currentTime: newPosition });
  }
  onSlidingComplete() {
    this.refs.audio.seek(this.state.currentTime);
    this.setState({ sliding: false });
  }
  onEnd() {
    this.setState({ playing: false });
  }
  setTime(params) {
    if (!this.state.sliding) {
      this.setState({ currentTime: params.currentTime });
    }
  }
  goBackward() {
    if (this.state.currentTime < 3 && this.state.songIndex !== 0) {
      this.setState({
        songIndex: this.state.songIndex - 1,
        currentTime: 0,
      });
    } else {
      this.refs.audio.seek(0);
      this.setState({
        currentTime: 0,
      });
    }
  }
  goForward() {
    this.setState({
      songIndex: this.state.shuffle ? this.randomSongIndex() : this.state.songIndex + 1,
      currentTime: 0,
    });
    this.refs.audio.seek(0);
  }
  randomSongIndex() {
    // let maxIndex = this.props.songs.length - 1;
    const maxIndex = this.state.songs.length - 1;

    return Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
  }
  toggleShuffle() {
    this.setState({ shuffle: !this.state.shuffle });
  }
  toggleVolume() {
    this.setState({ muted: !this.state.muted });
  }
  togglePlay() {
    this.setState({ playing: !this.state.playing });
  }
  render() {
    // let songPlaying = this.props.songs[this.state.songIndex];
    const songPlaying = this.state.songs[this.state.songIndex];
    let songPercentage;
    if (this.state.songDuration !== undefined) {
      songPercentage = this.state.currentTime / this.state.songDuration;
    } else {
      songPercentage = 0;
    }
    let playButton;
    if (this.state.playing) {
      playButton =
        <Icon onPress={this.togglePlay.bind(this)} style={styles.play} name="ios-pause" size={70} color="#fff" />;
    } else {
      playButton = <Icon onPress={this.togglePlay.bind(this)} style={styles.play} name="ios-play" size={70} />;
    }
    let forwardButton;
    // if( !this.state.shuffle && this.state.songIndex + 1 === this.props.songs.length ){
    if (!this.state.shuffle && this.state.songIndex + 1 === this.state.songs.length) {
      forwardButton = <Icon style={styles.forward} name="ios-skip-forward" size={25} color="#333" />;
    } else {
      forwardButton = (<Icon
        onPress={this.goForward.bind(this)}
        style={styles.forward}
        name="ios-skip-forward"
        size={25}
        color="#fff"
      />);
    }
    let volumeButton;
    if (this.state.muted) {
      volumeButton = (<Icon
        onPress={this.toggleVolume.bind(this)}
        style={styles.volume}
        name="md-volume-off"
        size={18}
        color="#fff"
      />);
    } else {
      volumeButton =
        <Icon onPress={this.toggleVolume.bind(this)} style={styles.volume} name="md-volume-up" size={18} color="#fff" />;
    }
    let shuffleButton;
    if (this.state.shuffle) {
      shuffleButton =
        (<Icon
          onPress={this.toggleShuffle.bind(this)}
          style={[styles.shuffle, { color: '#f62976' }]}
          name="md-shuffle"
          size={18}
        />);
    } else {
      shuffleButton =
        (<Icon
          onPress={this.toggleShuffle.bind(this)}
          style={[styles.shuffle, { color: '#fff' }]}
          name="md-shuffle"
          size={18}
        />);
    }
    const image = songPlaying.albumImage ? songPlaying.albumImage : this.props.artist.background;
    // let image = null;
    return (
      <Container style={{ flex: 1, width: window.width }}>
        <AppHeader rightTitle="موزیک" backButton="flex" />
        <Content>
          <View style={styles.container}>
            <Video
              source={{ uri: songPlaying.url }}
              // source={{uri: '../../assets/StartUp.mp3' }}
              ref="audio"
              volume={this.state.muted ? 0 : 1.0}
              muted={false}
              paused={!this.state.playing}
              onLoad={this.onLoad.bind(this)}
              onProgress={this.setTime.bind(this)}
              onEnd={this.onEnd.bind(this)}
              resizeMode="cover"
              repeat={false}
            />
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {/* { this.props.artist.name } */}
              </Text>
            </View>
            <View style={styles.headerClose}>
              <Icon onPress={Actions.pop} name="md-arrow-down" size={15} style={{ color: '#fff' }} />
            </View>
            <Image
              style={styles.songImage}
              source={image}
            />
            <Text style={[styles.songTitle, {}]}>
              {songPlaying.title}
            </Text>
            <Text style={styles.albumTitle}>
              {songPlaying.album}
            </Text>
            <View style={styles.sliderContainer}>
              <Slider
                onSlidingStart={this.onSlidingStart.bind(this)}
                onSlidingComplete={this.onSlidingComplete.bind(this)}
                onValueChange={this.onSlidingChange.bind(this)}
                minimumTrackTintColor="#851c44"
                style={styles.slider}
                trackStyle={styles.sliderTrack}
                thumbStyle={styles.sliderThumb}
                value={songPercentage}
              />
              <View style={styles.timeInfo}>
                <Text style={styles.time}>{formattedTime(this.state.currentTime)}</Text>
                <Text
                  style={styles.timeRight}
                >- {formattedTime(this.state.songDuration - this.state.currentTime)}
                </Text>
              </View>
            </View>
            <View style={styles.controls}>
              {shuffleButton}
              <Icon
                onPress={this.goBackward.bind(this)}
                style={styles.back}
                name="ios-skip-backward"
                size={25}
                color="#fff"
              />
              {playButton}
              {forwardButton}
              {volumeButton}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: '#000',
  },
  header: {
    marginTop: 17,
    marginBottom: 17,
    width: window.width,
  },
  headerClose: {
    position: 'absolute',
    top: 10,
    left: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  songImage: {
    marginBottom: 20,
    height: 190,
    width: window.width - 30,
    resizeMode: 'contain'
  },
  songTitle: {
    color: 'white',
    fontFamily: 'Helvetica Neue',
    marginBottom: 10,
    marginTop: 13,
    fontSize: 19
  },
  albumTitle: {
    color: '#BBB',
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 30,
  },
  back: {
    marginTop: 22,
    marginLeft: 45,
    color: '#fff'
  },
  play: {
    marginTop: 22,
    marginLeft: 50,
    marginRight: 50,
    color: '#fff'
  },
  forward: {
    marginTop: 22,
    marginRight: 45,
    color: '#fff'
  },
  shuffle: {
    marginTop: 22,
  },
  volume: {
    marginTop: 22,
    color: '#fff'
  },
  sliderContainer: {
    width: window.width - 40,
  },
  timeInfo: {
    flexDirection: 'row',
  },
  time: {
    color: '#FFF',
    flex: 1,
    fontSize: 10,
  },
  timeRight: {
    color: '#FFF',
    textAlign: 'right',
    flex: 1,
    fontSize: 10,
  },
  slider: {
    height: 20,
  },
  sliderTrack: {
    height: 2,
    backgroundColor: '#333',
  },
  sliderThumb: {
    width: 10,
    height: 10,
    backgroundColor: '#f62976',
    borderRadius: 10 / 2,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1,
  }
});
// TODO: Move this to a Utils file
function withLeadingZero(amount) {
  if (amount < 10) {
    return `0${amount}`;
  }
  return `${amount}`;
}
function formattedTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  if (isNaN(minutes) || isNaN(seconds)) {
    return '';
  }
  return (`${withLeadingZero(minutes)}:${withLeadingZero(seconds.toFixed(0))}`);
}
