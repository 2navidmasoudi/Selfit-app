import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Fab, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { mapStyle } from '../../../assets/styles/map';
import { getAllGyms } from '../../../services/gym';
import { receiveGym, tokenGym } from '../../../redux/actions/index';
import { mainColor } from '../../../assets/variables/colors';

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

const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;

const initialRegion = {
  latitude: 35.7247434,
  longitude: 51.3338664,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

@connect(state => ({
  gym: state.gym.GymList,
  min: state.gym.min,
  user: state.user,
  tokenapi: state.gym.tokenapi,
}), {
  receiveGym,
  tokenGym,
})
export default class FullMap extends Component {
  state = {
    region: {
      latitude: 35.7247434,
      longitude: 51.3338664,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    },
    map: null,
    Markers: [],
    MarkerReady: false,
    LoadNew: false,
    min: 0,
  };

  componentWillMount() {
    this.props.tokenGym('selfit.gym');
    // this.getCurrentPosition();
    this.getGym();
  }

  async onRegionChangeComplete(region) {
    await this.setState({ region });
    console.log('onRegionChangeComplete', region, 'new region:', this.state.region);
  }

  async getGym() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      await this.setState({ min: 0 });
      const json = await getAllGyms(tokenmember, tokenapi, 1000, this.state.min, null);
      console.log(json);
      await this.props.receiveGym(json.GymList.$values, this.state.min);
      this.setState({ MarkerReady: true });
    } catch (error) {
      console.log(error);
    }
  }

  setRegion(region) {
    this.state.map.animateToRegion(region, 1000);
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
        error => console.log(error.message),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000, distanceFilter: 2000 }
      );
    } catch (error) {
      console.log(error);
    }
  }

  _gymDetail(gym) {
    Actions.gymDetail(gym);
    console.log(gym);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={(map) => {
            this.state.map = map;
          }}
          initialRegion={initialRegion}
          showsUserLocation
          loadingEnabled
          // region={this.state.region}
          // onRegionChange={this.onRegionChange.bind(this)}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          customMapStyle={mapStyle}
          onMapReady={() => this.getCurrentPosition()}
        >
          {this.state.MarkerReady === false ? null : this.props.gym.map((gym, index) => (
            <Marker
              key={gym.gymid || index}
              coordinate={{ latitude: gym.latgym, longitude: gym.longgym }}
              // image={require('../../../assets/gym_marker_2.png')}
              onPress={(e => console.log(e.nativeEvent.coordinate))}
              pinColor={gym.activegym === true ? 'blue' : 'red'}
              title={gym.namegym}
              description={gym.addressgym}
              onCalloutPress={() => this._gymDetail(gym)}
            />
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
