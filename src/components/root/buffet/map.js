import React, { Component } from 'react';
import { StyleSheet, View, Alert, ImageBackground } from 'react-native';
import { Fab, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { mapStyle } from '../../../assets/styles/map';
import { receiveBuffet, tokenBuffet } from '../../../redux/actions/index';
import { getAllBuffet } from '../../../services/buffet';
import { Text } from '../../Kit';
import {mainColor, white} from '../../../assets/variables/colors';
import Pin1 from '../../../assets/pinPics/Buffet1.png';
import Pin2 from '../../../assets/pinPics/Buffet2.png';
import PinStyle from '../../../assets/styles/PinStyle';
import {mainFont} from "../../../assets/variables/font";

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
  constructor() {
    super();
    this.state = {
      region: {
        // latitude: 35.7247434,
        // longitude: 51.3338664,
        // latitudeDelta: 0.5,
        // longitudeDelta: 0.5,
      },
      map: null,
      MarkerReady: false,
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
  }
  async componentWillMount() {
    await this.props.tokenBuffet('selfit.buffet');
    this.getCurrentPosition();
    this.getBuffet();
  }
  componentDidMount() {
    this.getCurrentPosition();
  }
  async onRegionChangeComplete(region) {
    await this.setState({
      region
    });
  }
  setRegion(region) {
    try {
      this.state.map.animateToRegion(region, 1000);
    } catch (e) {
      this.setState({ region });
    }
  }

  async getBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { latitude, longitude } = await this.state.region;
      const { tokenapi } = this.props;
      const BuffetList =
        await getAllBuffet(latitude, longitude, tokenmember, tokenapi, 120, 0, null);
      console.log('buffetList:', BuffetList);
      this.props.receiveBuffet(BuffetList, 0);
      this.setState({ MarkerReady: true });
    } catch (error) {
      this.setState({ MarkerReady: true });
      console.log(error);
    }
  }
  async getNewBuffet() {
    await this.setState({
      MarkerReady: false
    });
    this.getBuffet();
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
        () => Alert.alert(
          'خطا', 'لطفا مکان یاب گوشی خود را بررسی کنید',
          [{ text: 'باشه' }]
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
  buffetMenu(buffet) {
    Actions.buffetMenu(buffet);
    console.log(buffet);
  }
  renderPin = (sex) => {
    switch (sex) {
      case true: return (<ImageBackground
        source={Pin2}
        style={PinStyle.size}
        resizeMode="cover"
      />);
      default: return (<ImageBackground
        source={Pin1}
        style={PinStyle.size}
        resizeMode="cover"
      />);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={(map) => { this.state.map = map; }}
          initialRegion={initialRegion}
          showsUserLocation
          loadingEnabled
          onRegionChangeComplete={this.onRegionChangeComplete}
          customMapStyle={mapStyle}
          onMapReady={() => this.getCurrentPosition()}
        >
          {this.props.buffet.map(buffet => (
            <MapView.Marker
              key={buffet.buffetid}
              coordinate={{ latitude: buffet.latgym, longitude: buffet.longgym }}
              onCalloutPress={() => this.buffetMenu(buffet)}
              style={{ zIndex: 5 }}
            >
              {this.renderPin(buffet.activebuffet)}
              <MapView.Callout
                style={{
                  width: 220,
                  position: 'absolute',
                }}
              >
                <Text style={{ textAlign: 'center' }} type="bold">{buffet.namebuffet}</Text>
                <Text style={{ fontSize: 12 }} ellipsizeMode="tail">{buffet.addressgym}</Text>
                <Text style={{ textAlign: 'center', fontSize: 10 }} type="light">
                  برای مشاهده جزئیات کلیک کنید!
                </Text>
              </MapView.Callout>
            </MapView.Marker>
          ))}

        </MapView>
        <Fab
          style={{ backgroundColor: '#0F9D7A' }}
          position="bottomRight"
          onPress={this.getCurrentPosition}
        >
          <Icon name="md-locate" />
        </Fab>
        <Button
          title="جستجو در این محل"
          titleStyle={{ fontFamily: mainFont, fontSize: 16, color: white }}
          loading={!this.state.MarkerReady}
          backgroundColor="rgba(0,0,0,0.6)"
          borderRadius={10}
          buttonStyle={{ marginBottom: 20, marginLeft: 70 }}
          onPress={() => this.getNewBuffet()}
        />
      </View>
    );
  }
}
