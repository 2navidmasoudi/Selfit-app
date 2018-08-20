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
    MarkerReady: false,
  };
  componentWillMount() {
    this.setInfo();
  }
  async setInfo() {
    await this.props.tokenBuffet('selfit.buffet');
    this.getBuffet();
  }
  async getBuffet() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = this.props;
      const BuffetList = await getAllBuffets(tokenmember, tokenapi, 1000, 0, null);
      this.props.receiveBuffet(BuffetList, 0);
      this.setState({ MarkerReady: true });
    } catch (error) {
      console.log(error);
      this.setState({ MarkerReady: true });
    }
  }
  buffetMenu = (buffet) => {
    Actions.buffetMenu(buffet);
    console.log(buffet);
  };
  renderPin = (sex) => {
    switch (sex) {
      case true: return (<ImageBackground
        source={Pin2}
        style={{ width: 40, height: 45 }}
        resizeMode="cover"
      />);
      default: return (<ImageBackground
        source={Pin1}
        style={{ width: 40, height: 45 }}
        resizeMode="cover"
      />);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
          loadingEnabled
          customMapStyle={mapStyle}
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
