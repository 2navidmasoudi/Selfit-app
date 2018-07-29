import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Fab, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { mapStyle } from '../../../assets/styles/map';
import { getAllGym } from '../../../services/gym';
import { receiveGym, tokenGym } from '../../../redux/actions/index';
import { mainColor } from '../../../assets/variables/colors';
import { Text } from '../../Kit';

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

const GymCallOut = ({ gym }) => (
  <View>
    <Text style={{ textAlign: 'center' }} type="bold">{gym.namegym}</Text>
    <Text style={{ fontSize: 12 }} ellipsizeMode="tail">{gym.addressgym}</Text>
    <Text style={{ textAlign: 'center', fontSize: 10 }} type="light">
      برای مشاهده جزئیات کلیک کنید!
    </Text>
  </View>
);

GymCallOut.propTypes = {
  gym: PropTypes.node.isRequired,
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
export default class GymMap extends Component {
  state = {
    region: {
      // latitude: 35.7247434,
      // longitude: 51.3338664,
      // latitudeDelta: 0.5,
      // longitudeDelta: 0.5,
    },
    map: null,
    Markers: [],
    MarkerReady: false,
    LoadNew: false,
    min: 0,
    firstTime: true,
  };
  async componentWillMount() {
    await this.props.tokenGym('selfit.gym');
    await this.getCurrentPosition();
    await this.getGym();
  }
  async onRegionChangeComplete(region) {
    await this.setState({ region });
    console.log('onRegionChangeComplete', region, 'new region:', this.state.region);
  }
  async getGym() {
    try {
      const { tokenmember, latval, longval } = await this.props.user;
      const { latitude, longitude } = await this.state.region;
      const { tokenapi, min } = await this.props;
      // let GymList=[];
      let GymMapList;
      await this.setState({ min: 0 });
      if (this.state.firstTime) {
        GymMapList =
          await getAllGym(latval, longval, tokenmember, tokenapi, 200, this.state.min, 'addressgym%20asc');
        console.log(GymMapList);
        await this.props.receiveGym(GymMapList, this.state.min);
        this.setState({ MarkerReady: true, firstTime: false });
        return;
      }
      GymMapList = await getAllGym(latitude, longitude, tokenmember, tokenapi, 200, min, 'addressgym%20asc');
      console.log(GymMapList);
      await this.props.receiveGym(GymMapList, min);
      this.setState({ MarkerReady: true });
    } catch (error) {
      console.log(error);
    }
  }
  async getNewGym() {
    await this.setState({
      MarkerReady: false
    });
    await this.getGym();
  }
  setRegion(region) {
    // this.state.map.animateToRegion(region, 1000);
    this.setState(region);
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
        // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 , distanceFilter: 2000}
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
          ref={(map) => { this.state.map = map; }}
          initialRegion={initialRegion}
          showsUserLocation
          loadingEnabled
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          customMapStyle={mapStyle}
          onMapReady={() => this.getCurrentPosition()}
        >
          {this.state.MarkerReady === false ? null : this.props.gym.map(gym => (
            <MapView.Marker
              key={gym.idgym}
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              coordinate={{ latitude: gym.latgym, longitude: gym.longgym }}
              // image={gym.activegym === true ? require('../../../assets/gym_marker_2.png'):null}
              onPress={(e => console.log(e.nativeEvent.coordinate))}
              pinColor={gym.activegym === true ? 'blue' : 'red'}
              description={gym.addressgym}
              onCalloutPress={() => this._gymDetail(gym)}
            >
              <MapView.Callout style={{ width: 220 }}>
                <GymCallOut
                  gym={gym}
                />
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <Fab
          style={{ backgroundColor: mainColor }}
          position="bottomRight"
          onPress={this.getCurrentPosition.bind(this)}
        >
          <Icon name="md-locate" />
        </Fab>
        {this.state.MarkerReady === false ? <Spinner /> :
        <Button
          block
          style={{
            margin: 25,
            marginHorizontal: 100,
            borderRadius: 5,
            backgroundColor: mainColor,
          }}
          onPress={() => this.getNewGym()}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>اینجا باشگاه بگیر</Text>
        </Button>}
      </View>

    );
  }
}

