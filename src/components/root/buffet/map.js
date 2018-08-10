import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Fab, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { mapStyle } from '../../../assets/styles/map';
import { receiveBuffet, tokenBuffet } from '../../../redux/actions/index';
import { getAllBuffet, getAllBuffets } from '../../../services/buffet';
import { Text } from '../../Kit';
import { mainColor, white } from '../../../assets/variables/colors';

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

const BuffetCallOut = ({ buffet }) => (
  <View>
    <Text style={{ textAlign: 'center' }} type="bold">{buffet.namebuffet}</Text>
    <Text style={{ fontSize: 12 }} ellipsizeMode="tail">{buffet.addressgym}</Text>
    <Text style={{ textAlign: 'center', fontSize: 10 }} type="light">
      برای مشاهده جزئیات کلیک کنید!
    </Text>
  </View>
);

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
        await getAllBuffet(latitude, longitude, tokenmember, tokenapi, 120, 0, true, 0);
      // const BuffetList = await getAllBuffets(tokenmember, tokenapi, 120, 0, true, 0);
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
              // image={BuffetPin}
              // centerOffset={(-100,-100)}
              // pinColor="blue"
              // style={{maxWidth:20,maxHeight:20}}
              title={buffet.namebuffet}
              description={buffet.addressgym}
              onCalloutPress={() => this.buffetMenu(buffet)}
            >
              <MapView.Callout style={{ width: 220 }}>
                <BuffetCallOut
                  buffet={buffet}
                />
                {/* <View><Text>{gym.namegym}</Text></View> */}
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
        {this.state.MarkerReady === false ? <Spinner /> :
        <Button
          block
          style={{
            margin: 25,
            marginHorizontal: 150,
            borderRadius: 5,
            backgroundColor: mainColor,
          }}
          onPress={() => this.getNewBuffet()}
        >
          <Icon name="pin" color={white} style={{ alignItems: 'center' }} />
        </Button>}
      </View>
    );
  }
}
