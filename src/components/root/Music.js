import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, View, Linking, TouchableOpacity, FlatList } from 'react-native';
import { Body, Card, CardItem, Container, Content, Icon, Left, Right, Spinner } from 'native-base';
import Slider from 'react-native-slider';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppHeader from '../header';
import { darkColor, mainColor, white } from '../../assets/variables/colors';
import { persianNumber } from '../../utils/persian';
import { Text } from '../Kit';
import { tokenBlog } from '../../redux/actions';
import { getAllMusic } from '../../services/music';
import image from '../../assets/SelfitMix.jpg';
import { bounce } from './Main';

const SelfitMusic = 'https://selfit.ir/Resource/music/';
const window = Dimensions.get('window');

@connect(state => ({
  user: state.user,
  tokenapi: state.blog.tokenapi,
}), { tokenBlog })
export default class Music extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
    tokenBlog: PropTypes.func.isRequired,
  };
  constructor() {
    super();
    this.state = {
      playing: false,
      muted: false,
      shuffle: false,
      sliding: false,
      currentTime: 0,
      songIndex: 0,
      songNumbers: null,
      songs: [{
        title: 'Selfit',
        album: 'Start Up!',
        url: 'https://selfit.ir/Resource/music/BazamRaft.mp3',
        idmusic: 0,
      }]
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.goForward = this.goForward.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.toggleShuffle = this.toggleShuffle.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.setTime = this.setTime.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onSlidingStart = this.onSlidingStart.bind(this);
    this.onSlidingComplete = this.onSlidingComplete.bind(this);
    this.onSlidingChange = this.onSlidingChange.bind(this);
    this.goBackward = this.goBackward.bind(this);
  }
  componentWillMount() {
    this.getInfo();
  }
  onLoad(params) {
    this.setState({ songDuration: params.duration, loading: false });
  }
  onBuffer() {
    this.setState({ loading: true });
  }
  onSlidingStart() {
    this.setState({ sliding: true });
  }
  onSlidingChange(value) {
    const newPosition = value * this.state.songDuration;
    this.setState({ currentTime: newPosition });
  }
  onSlidingComplete() {
    this.audio.seek(this.state.currentTime);
    this.setState({ sliding: false });
  }
  onEnd() {
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
    this.audio.seek(0);
  }
  async getSongs() {
    const { tokenmember } = await this.props.user;
    const { tokenapi } = await this.props;
    const songs = await getAllMusic(tokenmember, tokenapi, 50, 0, 'idmusic%20desc');
    this.setState({ songs, songNumbers: songs.length - 1 });
  }
  async getInfo() {
    await this.props.tokenBlog('selfit.public');
    await this.getSongs();
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
    this.audio.seek(0);
  }
  goForward() {
    if (this.state.songNumbers !== this.state.songIndex) {
      if (!this.state.shuffle) {
        this.setState({
          songIndex: this.state.songIndex + 1,
          currentTime: 0,
        });
      } else {
        const random = this.randomSongIndex();
        this.setState({
          songIndex: random,
          currentTime: 0,
        });
      }
    } else {
      this.setState({
        songIndex: 0,
        currentTime: 0,
      });
    }
    this.audio.seek(0);
  }
  randomSongIndex() {
    const maxIndex = this.state.songs.length - 1;
    return Math.floor(Math.random() * ((maxIndex - 0) + 1)) + 0;
  }
  toggleShuffle() {
    this.setState({ shuffle: !this.state.shuffle });
  }
  toggleVolume() {
    this.setState({ muted: !this.state.muted });
  }
  togglePlay() {
    this.setState(
      { playing: !this.state.playing },
      () => { if (this.state.playing) bounce(); }
    );
  }
  selectMusic(index) {
    this.setState({
      songIndex: index,
      currentTime: 0,
    });
    this.audio.seek(0);
  }
  render() {
    const songPlaying = this.state.songs[this.state.songIndex];
    const uri = `${SelfitMusic}${songPlaying.urlmusic}`;
    let songPercentage;
    if (this.state.songDuration !== undefined) {
      songPercentage = this.state.currentTime / this.state.songDuration;
    } else {
      songPercentage = 0;
    }
    const playButton = this.state.playing ?
      <Icon onPress={this.togglePlay} style={styles.play} name="ios-pause" size={70} color="#fff" /> :
      <Icon onPress={this.togglePlay} style={styles.play} name="ios-play" size={70} color="#fff" />;
    const forwardButton = (<Icon
      onPress={this.goForward}
      style={styles.forward}
      name="ios-skip-forward"
      size={25}
      color="#fff"
    />);
    let shuffleButton;
    if (this.state.shuffle) {
      shuffleButton =
        (<Icon
          onPress={this.toggleShuffle}
          style={[styles.shuffle, { color: '#0f9d7a' }]}
          name="shuffle"
          size={18}
        />);
    } else {
      shuffleButton =
        (<Icon
          onPress={this.toggleShuffle}
          style={[styles.shuffle, { color: '#fff' }]}
          name="shuffle"
          size={18}
        />);
    }
    // let image = null;
    const loading = this.state.loading ? <Spinner color={mainColor} /> : null;
    return (
      <Container style={{ flex: 1, width: window.width }}>
        <AppHeader rightTitle="موزیک" noPop />
        <Content style={{ backgroundColor: darkColor }}>
          <View style={styles.container}>
            <Video
              source={{ uri }}
              ref={(c) => { this.audio = c; }}
              audioOnly
              volume={1.0}
              muted={false}
              playInBackground
              playWhenInactive
              ignoreSilentSwitch="ignore"
              paused={!this.state.playing}
              onBuffer={this.onBuffer}
              onLoad={this.onLoad}
              onProgress={this.setTime}
              onEnd={this.onEnd}
              resizeMode="cover"
              repeat={false}
            />
            <Image
              style={styles.songImage}
              source={image}
            />
            <Text style={[styles.songTitle, {}]}>
              {songPlaying.namemusic}
            </Text>
            <View style={styles.sliderContainer}>
              <Slider
                onSlidingStart={this.onSlidingStart}
                onSlidingComplete={this.onSlidingComplete}
                onValueChange={this.onSlidingChange}
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
                onPress={this.goBackward}
                style={styles.back}
                name="ios-skip-backward"
                size={25}
                color="#fff"
              />
              {playButton}
              {forwardButton}
              <Icon
                onPress={() => Linking.openURL(uri)}
                name="download"
                size={18}
                style={styles.volume}
                color="#fff"
              />
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {loading}
          </View>
          <FlatList
            data={this.state.songs}
            keyExtractor={item => item.idmusic}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => this.selectMusic(index)}>
                <Card style={{ flex: 0 }}>
                  <CardItem>
                    <Left>
                      <Icon name="musical-note" />
                    </Left>
                    <Body>
                      <Text style={{ textAlign: 'center' }}>{item.namemusic}</Text>
                    </Body>
                    <Right>
                      <Icon name="md-play" style={{ color: index === this.state.songIndex ? mainColor : darkColor }} />
                    </Right>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            )}
          />
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: darkColor,
  },
  header: {
    marginTop: 17,
    marginBottom: 17,
    width: window.width,
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
  songImage: {
    margin: 20,
    height: 190,
    width: window.width - 30,
    resizeMode: 'contain'
  },
  songTitle: {
    color: white,
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
    marginTop: 15,
  },
  back: {
    paddingTop: 22,
    paddingLeft: 45,
    color: '#fff'
  },
  play: {
    paddingTop: 22,
    paddingLeft: 50,
    paddingRight: 50,
    color: '#fff'
  },
  forward: {
    paddingTop: 22,
    paddingRight: 45,
    color: '#fff'
  },
  shuffle: {
    paddingTop: 22,
  },
  volume: {
    paddingTop: 22,
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
  const seconds = timeInSeconds - (minutes * 60);
  if (Number.isNaN(minutes) || Number.isNaN(seconds)) {
    return '';
  }
  return (`${withLeadingZero(minutes)}:${withLeadingZero(seconds.toFixed(0))}`);
}
