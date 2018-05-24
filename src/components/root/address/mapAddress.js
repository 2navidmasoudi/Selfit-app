import React, { Component } from 'react';
import { Button, Container, Fab, Icon, Text, View } from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { mapStyle } from '../../../assets/styles/map';
import markerImage from '../../../assets/markerImage.png';
import { form } from '../../../assets/styles';
import { styles } from './style';

const initialRegion = {
  latitude: 35.7247434,
  longitude: 51.3338664,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

// TODO: Map Scroll do not work on IOS

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  MenuFood: state.buffet.MenuFood,
  Count: state.buffet.Count,
}))
export default class MapAddress extends Component {
    state = {
      map: null,
      region: {
        // latitude: 35.7247434,
        // longitude: 51.3338664,
        // latitudeDelta: 0.5,
        // longitudeDelta: 0.5,
      },
    };
    onRegionChangeComplete(region) {
      this.setState({
        region,
      });
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
        // {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 , distanceFilter: 2000}
        );
      } catch (error) {
        console.log(error);
      }
    }
    render() {
      return (
        <Container>
          <AppHeader rightTitle="آدرس" backButton="flex" />
          <View style={styles.container}>
            <MapView
              style={styles.map}
              ref={(map) => { this.state.map = map; }}
              initialRegion={initialRegion}
              showsUserLocation
              loadingEnabled
              onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
              customMapStyle={mapStyle}
              onMapReady={this.getCurrentPosition.bind(this)}
            />
            <Fab
              style={{ backgroundColor: '#0F9D7A' }}
              position="bottomRight"
              onPress={this.getCurrentPosition.bind(this)}
            >
              <Icon name="md-locate" />
            </Fab>
          </View>
          <View pointerEvents="none" style={styles.viewImage}>
            <Image
              pointerEvents="none"
              style={styles.markerImage}
              source={markerImage}
            />
          </View>
          <View style={styles.btnMap}>
            <Button
              block
              style={form.submitButton}
              onPress={() => Actions.addAddress({ region: this.state.region })}
            >
              <Text>ثبت در تقشه</Text>
            </Button>
          </View>
        </Container>
      );
    }
}
