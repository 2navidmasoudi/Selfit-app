import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Fab, Icon } from 'native-base';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { mapStyle } from '../../../assets/styles/map';
import { receiveBuffet, tokenBuffet } from '../../../redux/actions/index';
import { getAllBuffets } from '../../../services/buffet';

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
export default class MapComponent extends Component {
  state = {
    region: {
      // latitude: 35.7247434,
      // longitude: 51.3338664,
      // latitudeDelta: 0.5,
      // longitudeDelta: 0.5,
    },
    map: null,
    Markers: []
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
      // TODO: LAT AND LONG.
      const { tokenmember, latval, longval } = await this.props.user;
      const { latitude, longitude } = await this.state.region;
      const { tokenapi } = this.props;
      // let BuffetList = await getAllBuffet(35.76254800640313,51.38223538175225,tokenmember,tokenapi,10,0,true,0);
      const BuffetList = await getAllBuffets(tokenmember, tokenapi, 10, 0, true, 0);
      console.log('buffetList:', BuffetList);
      this.props.receiveBuffet(BuffetList, 0);
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
          {this.props.buffet.map((buffet, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: buffet.latgym, longitude: buffet.longgym }}
              // image={BuffetPin}
              // centerOffset={(-100,-100)}
              // pinColor="blue"
              // style={{maxWidth:20,maxHeight:20}}
              title={buffet.namebuffet}
              description={buffet.addressgym}
              onCalloutPress={() => this._buffetMenu(buffet)}
            >
              {/* <View><Text>{gym.namegym}</Text></View> */}
            </Marker>
          ))}
        </MapView>
        <Fab
          style={{ backgroundColor: '#0F9D7A' }}
          position="bottomRight"
          onPress={this.getCurrentPosition.bind(this)}
        >
          <Icon name="md-locate" />
        </Fab>
      </View>
    );
  }
}
