import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, View, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, Container, Content, Icon } from 'native-base';
import Slider from 'react-native-slider';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import AppHeader from '../header';
import { darkColor, mainColor } from '../../assets/variables/colors';
import { persianNumber } from '../../utils/persian';
import { Text } from '../Kit';
import { tokenBlog } from '../../redux/actions';
import { getAllMusic } from '../../services/music';

const SelfitMusic = 'https://selfit.ir/Resource/music/';
const window = Dimensions.get('window');
const image = require('../../assets/music.jpg');

@connect(state => ({
  user: state.user,
  tokenapi: state.blog.tokenapi,
}), {
  tokenBlog,
})
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
      songNumbers: null,
      songs: [{
        title: 'Selfit',
        album: 'Start Up!',
        url: 'https://selfit.ir/Resource/music/BazamRaft.mp3',
      }]
    };
    this._pasEditUnmountFunction = this._pasEditUnmountFunction.bind(this);
  }
  componentWillMount() {
    this.getInfo();
  }
  componentDidMount() {
    console.log(this.props);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._pasEditUnmountFunction);
  }
  async getInfo() {
    await this.props.tokenBlog('selfit.public');
    await this.getSongs();
  }
  async getSongs() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      const songs = await getAllMusic(tokenmember, tokenapi, 30, 0, false, 0);
      console.log('songs');
      console.log(songs);
      this.setState({ songs, songNumbers: songs.length - 1 });
    } catch (e) {
      console.log(e);
    }
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
  _pasEditUnmountFunction() {
    if (this.props.routeName === 'Music') {
      Actions.Home();
      this.backHandler.remove();
      return true;
    }
  }
  goBackward() {
    if (this.state.currentTime < 3 && this.state.songIndex !== 0) {
      this.setState({
        songIndex: this.state.songIndex - 1,
        currentTime: 0,
      });
    } else if (this.state.songIndex === 0) {
      this.setState({
        songIndex: this.state.songNumbers,
        currentTime: 0,
      });
    } else {
      this.setState({
        currentTime: 0,
      });
    }
    this.refs.audio.seek(0);
  }
  goForward() {
    if (this.state.songNumbers !== this.state.songIndex) {
      this.setState({
        songIndex: this.state.songIndex + 1,
        currentTime: 0,
      });
    } else {
      this.setState({
        songIndex: 0,
        currentTime: 0,
      });
    }
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
    const uri = `${SelfitMusic}${songPlaying.urlmusic}`;
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
    // if( !this.state.shuffle && this.state.songIndex + 1 === this.props.songs.length ){
    const forwardButton = (<Icon
      onPress={this.goForward.bind(this)}
      style={styles.forward}
      name="ios-skip-forward"
      size={25}
      color="#fff"
    />);
    let volumeButton;
    if (this.state.muted) {
      volumeButton = (<Icon
        onPress={this.toggleVolume.bind(this)}
        style={styles.volume}
        name="volume-off"
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
          style={[styles.shuffle, { color: '#0f9d7a' }]}
          name="shuffle"
          size={18}
        />);
    } else {
      shuffleButton =
        (<Icon
          onPress={this.toggleShuffle.bind(this)}
          style={[styles.shuffle, { color: '#fff' }]}
          name="shuffle"
          size={18}
        />);
    }
    // let image = null;
    return (
      <Container style={{ flex: 1, width: window.width }}>
        <AppHeader rightTitle="موزیک" noPop />
        <Content>
          <View style={styles.container}>
            <Video
              source={{ uri }}
              // source={{uri: '../../assets/StartUp.mp3' }}
              ref="audio"
              volume={this.state.muted ? 0 : 1.0}
              muted={false}
              playInBackground
              playWhenInactive
              ignoreSilentSwitch="ignore"
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
              <Icon onPress={Actions.pop} name="arrow-down" size={15} style={{ color: '#fff' }} />
            </View>
            <Image
              style={styles.songImage}
              source={image}
            />
            <Text style={[styles.songTitle, {}]}>
              {songPlaying.urlmusic}
            </Text>
            {/* <Text style={styles.albumTitle}> */}
            {/* {songPlaying.descmusic} */}
            {/* </Text> */}
            <View style={styles.sliderContainer}>
              <Slider
                onSlidingStart={this.onSlidingStart.bind(this)}
                onSlidingComplete={this.onSlidingComplete.bind(this)}
                onValueChange={this.onSlidingChange.bind(this)}
                minimumTrackTintColor={mainColor}
                style={styles.slider}
                trackStyle={styles.sliderTrack}
                thumbStyle={styles.sliderThumb}
                value={songPercentage}
              />
              <View style={styles.timeInfo}>
                <Text style={styles.time}>
                  {persianNumber(formattedTime(this.state.currentTime))}
                </Text>
                <Text style={styles.timeRight}>
                  {`${persianNumber(formattedTime(this.state.songDuration - this.state.currentTime))} -`}
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
          {/* <Card style={{ flex: 0, backgroundColor: darkColor }}> */}
          {/* <Text>موزیک</Text> */}
          {/* </Card> */}
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
    backgroundColor: darkColor,
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
    marginBottom: 10,
    marginTop: 13,
    fontSize: 19
  },
  albumTitle: {
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
    textAlign: 'left',
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
    backgroundColor: '#0f9d7a',
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
