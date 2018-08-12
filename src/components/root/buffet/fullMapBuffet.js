import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Fab, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { mapStyle } from '../../../assets/styles/map';
import { receiveBuffet, tokenBuffet } from '../../../redux/actions/index';
import { getAllBuffets } from '../../../services/buffet';
import { mainColor } from '../../../assets/variables/colors';
import Pin1 from '../../../assets/pinPics/Buffet1.png';
import Pin2 from '../../../assets/pinPics/Buffet2.png';
import { Text } from '../../Kit';

const BuffetCallOut = ({ buffet }) => (
  <View>
    <Text style={{ textAlign: 'center' }} type="bold">{buffet.namebuffet}</Text>
    <Text style={{ fontSize: 12 }} ellipsizeMode="tail">{buffet.addressgym}</Text>
    <Text style={{ textAlign: 'center', fontSize: 10 }} type="light">
      برای مشاهده جزئیات کلیک کنید!
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

const initialRegion = {
  latitude: 35.7247434,
  longitude: 51.3338664,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

@connect(state => ({
  buffet: state.buffet.BuffetList,
  min: state.buffet.min,
  user: state.user,
  tokenapi: state.buffet.tokenapi,
}), {
  receiveBuffet,
  tokenBuffet,
})
export default class FullMapBuffet extends Component {
  state = {
    region: {
      // latitude: 35.7247434,
      // longitude: 51.3338664,
      // latitudeDelta: 0.5,
      // longitudeDelta: 0.5,
    },
    map: null,
    MarkerReady: false,
  };
  componentWillMount() {
    this.setInfo();
  }
  async onRegionChangeComplete(region) {
    await this.setState({
      region
    });
    console.log('onRegionChangeComplete', region, 'new region:', this.state.region);
    await this.getBuffet();
  }
  setRegion(region) {
    this.state.map.animateToRegion(region, 1000);
    // this.setState({ region });
  }
  async setInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    this.getCurrentPosition();
    this.getBuffet();
  }
  async getBuffet() {
    try {
      const { tokenmember, latval, longval } = await this.props.user;
      const { latitude, longitude } = await this.state.region;
      const { tokenapi } = this.props;
      // let BuffetList = await getAllBuffet(latval,longval,tokenmember,tokenapi,10,0,true,0);
      const BuffetList = await getAllBuffets(tokenmember, tokenapi, 1000, 0, null);
      console.log('buffetList:', BuffetList);
      this.props.receiveBuffet(BuffetList, 0);
      this.setState({ MarkerReady: true });
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
          this.setRegion(region);
        },
        error => alert(error.message)
      );
    } catch (error) {
      console.log(error);
    }
  }
  _buffetMenu(buffet) {
    Actions.buffetMenu(buffet);
    console.log(buffet);
  }
  renderPin = (sex) => {
    switch (sex) {
      case true: return Pin2;
      default: return Pin1;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={(map) => { this.state.map = map; }}
          initialRegion={initialRegion}
          showsUserLocation
          loadingEnabled
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          customMapStyle={mapStyle}
        >
          {this.props.buffet.map(buffet => (
            <MapView.Marker
              key={buffet.buffetid}
              coordinate={{ latitude: buffet.latgym, longitude: buffet.longgym }}
              title={buffet.namebuffet}
              description={buffet.addressgym}
              onCalloutPress={() => this.buffetMenu(buffet)}
            >
              <ImageBackground
                {...buffet}
                source={this.renderPin(buffet.activebuffet)}
                style={{ width: 40, height: 45 }}
              >
                <MapView.Callout style={{ width: 220 }}>
                  <BuffetCallOut buffet={buffet} />
                </MapView.Callout>
              </ImageBackground>
            </MapView.Marker>
          ))}
        </MapView>
        <Fab
          style={{ backgroundColor: mainColor }}
          position="topLeft"
          onPress={() => Actions.pop()}
        >
          <Icon name="arrow-round-back" />
        </Fab>
        {this.state.MarkerReady === false ? <Spinner /> : null}
      </View>
    );
  }
}
