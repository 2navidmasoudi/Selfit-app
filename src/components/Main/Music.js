import React, { Component } from 'react';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Pic from '../../assets/MusicMain.jpg';
import { styles } from './style';
import { Text } from '../Kit';
import { musicUp } from '../root/Main';
import { musicOn } from '../../redux/actions';

@connect(null, { musicOn })
export default class Music extends Component {
  constructor() {
    super();
    this.state = {
      music: false,
    };
    this.TurnMusicOn = this.TurnMusicOn.bind(this);
  }
  TurnMusicOn = () => {
    musicUp();
    if (!this.state.music) {
      this.props.musicOn();
      this.setState({ music: true });
    }
  }
  render() {
    return (
      <ImageBackground
        source={Pic}
        style={styles.mainContainer}
        imageStyle={styles.background}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={this.TurnMusicOn}
        >
          <View style={styles.animationView}>
            <Text type="bold" style={styles.animationTitle}>
              موزیک
            </Text>
            <Text style={styles.animationDetail}>
              بدون موزیک تمرین نکنید
            </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
