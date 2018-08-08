import React, { Component } from 'react';
import { Button, Container, Fab, Icon, View } from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import AppHeader from '../../header';
import { mapStyle } from '../../../assets/styles/map';
import markerImage from '../../../assets/markerImage.png';
import { form } from '../../../assets/styles';
import { styles } from './style';
import { Text } from '../../Kit';
import { logError } from '../../../services/log';
import { mainColor, white } from '../../../assets/variables/colors';

const initialRegion = {
  latitude: 35.7247434,
  longitude: 51.3338664,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

@connect(state => ({
  user: state.user,
  tokenapi: state.buffet.tokenapi,
  MenuFood: state.buffet.MenuFood,
  Count: state.buffet.Count,
}))
export default class MapAddress extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      region: {
        // latitude: 35.7247434,
        // longitude: 51.3338664,
        // latitudeDelta: 0.5,
        // longitudeDelta: 0.5,
      },
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
  }
  onRegionChangeComplete(region) {
    this.setState({
      region,
    });
  }
  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      this.setRegion(region);
    });
  }
  setRegion(region) {
    try {
      this.state.map.animateToRegion(region, 1000);
    } catch (e) {
      logError(e, 'mapAddress', 'setRegion', 'root/address');
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
            onRegionChangeComplete={this.onRegionChangeComplete}
            customMapStyle={mapStyle}
            onMapReady={this.onMapReady}
          />
          <View pointerEvents="none" style={styles.viewImage}>
            <Image
              pointerEvents="none"
              style={styles.markerImage}
              source={markerImage}
            />
          </View>
          <Button
            full
            style={form.submitButton}
            onPress={() => Actions.addAddress({ region: this.state.region })}
          >
            <Text style={{ color: white }}>ثبت در نقشه</Text>
          </Button>
          <Fab
            style={{ backgroundColor: mainColor, bottom: 20 }}
            position="bottomRight"
            onPress={this.getCurrentPosition}
          >
            <Icon name="md-locate" />
          </Fab>
        </View>
      </Container>
    );
  }
}
