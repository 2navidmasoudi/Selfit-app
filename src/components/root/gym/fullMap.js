import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Platform } from 'react-native';
import { Fab, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { mapStyle } from '../../../assets/styles/map';
import { getAllGyms } from '../../../services/gym';
import { receiveGym, tokenGym } from '../../../redux/actions/index';
import { mainColor } from '../../../assets/variables/colors';
import Pin1 from '../../../assets/pinPics/Gym1.png';
import Pin2 from '../../../assets/pinPics/Gym2.png';
import Pin3 from '../../../assets/pinPics/Gym3.png';
import PinStyle from '../../../assets/styles/PinStyle';
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
    MarkerReady: false,
  };
  async componentWillMount() {
    await this.props.tokenGym('selfit.gym');
    this.getGym();
  }
  async getGym() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi } = await this.props;
      await this.setState({ min: 0 });
      const json = await getAllGyms(tokenmember, tokenapi, 1000, 0, null);
      await this.props.receiveGym(json, 0);
      this.setState({ MarkerReady: true });
    } catch (error) {
      console.log(error);
      this.setState({ MarkerReady: true });
    }
  }
  gymDetail = (gym) => {
    Actions.gymDetail(gym);
  };
  renderPin = (sex) => {
    switch (sex) {
      case true: return (<ImageBackground
        source={Pin2}
        style={PinStyle.size}
        resizeMode="cover"
      />);
      case false: return (<ImageBackground
        source={Pin1}
        style={PinStyle.size}
        resizeMode="cover"
      />);
      default: return (<ImageBackground
        source={Pin3}
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
          initialRegion={initialRegion}
          showsUserLocation
          loadingEnabled
          customMapStyle={mapStyle}
        >
          {this.state.MarkerReady === false ? null : this.props.gym.map((gym, index) => (
            <MapView.Marker
              key={gym.idgym}
              coordinate={{ latitude: gym.latgym, longitude: gym.longgym }}
              onCalloutPress={() => this.gymDetail(gym)}
              style={{ zIndex: 5 }}
            >
              {Platform.OS === 'ios' ? this.renderPin(gym.activegym) : null}
              <MapView.Callout
                style={{
                  width: 220,
                  position: 'absolute',
                }}
              >
                <Text style={{ textAlign: 'center' }} type="bold">{gym.namegym}</Text>
                <Text style={{ fontSize: 12 }} ellipsizeMode="tail">{gym.addressgym}</Text>
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
