import React, { Component } from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import { Button, Fab, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { mapStyle } from '../../../assets/styles/map';
import { getAllGym } from '../../../services/gym';
import { receiveGym, tokenGym, refreshGym } from '../../../redux/actions';
import { mainColor } from '../../../assets/variables/colors';
import { Text, Modal } from '../../Kit';
import Pic1 from '../../../assets/helpPics/GymMap/PinMapGym.png';
import Pic2 from '../../../assets/helpPics/GymMap/DetailMapGym.png';
import Pic3 from '../../../assets/helpPics/GymMap/BtnMapGym.png';
import { helpDoneGymMap } from '../../../redux/actions/help';

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

@connect(state => ({
  gym: state.gym.GymList,
  min: state.gym.min,
  user: state.user,
  tokenapi: state.gym.tokenapi,
  help: state.help.gymMap,
}), {
  receiveGym,
  tokenGym,
  refreshGym,
  helpDoneGymMap,
})
export default class GymMap extends Component {
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
      min: 0,
      firstTime: true,
      ModalNumber: 0,
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.gymDetail = (gym) => {
      Actions.gymDetail(gym);
      console.log(gym);
    };
  }
  async componentWillMount() {
    if (!this.props.help) {
      this.setState({ ModalNumber: 1 });
    }
    await this.props.tokenGym('selfit.gym');
    await this.getCurrentPosition();
    await this.getGym();
  }
  componentWillUnmount() {
    this.props.refreshGym();
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
    try {
      this.state.map.animateToRegion(region, 1000);
    } catch (e) {
      console.log(e);
      this.setState(region);
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
        () => Alert.alert(
          'خطا', 'لطفا مکان یاب گوشی خود را بررسی کنید',
          [{ text: 'باشه' }]
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
  helpDone = () => this.props.helpDoneGymMap();
  render() {
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.ModalNumber === 1}
          onModalHide={() => this.setState({ ModalNumber: 2 })}
          exitText="ممنون"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 200,
            }}
            source={Pic1}
            resizeMode="contain"
          />
          <Text>
            یکی از پین هارو انتخاب کن تا اسم و آدرس اون باشگاه رو ببینی
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 2}
          onModalHide={() => this.setState({ ModalNumber: 3 })}
          exitText="خیلی خب"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 200,
            }}
            source={Pic2}
            resizeMode="contain"
          />
          <Text>
            با زدن این باکس می تونی جزئیات باشگاه رو ببینی.
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 3}
          onModalHide={this.helpDone}
          exitText="تمام"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 100,
            }}
            source={Pic3}
            resizeMode="contain"
          />
          <Text>
            با زدن دکمه لیست بر میگردی به لیست باشگاه های دور اطرافت،
             با زدن دکمه وسط باشگاه ها رو تو محله مورد نظرت ببین،
            با زدن دکمه آخر برگرد به محلی که هستی.
          </Text>
        </Modal>
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
          {this.state.MarkerReady === false ? null : this.props.gym.map(gym => (
            <MapView.Marker
              key={gym.idgym}
              coordinate={{ latitude: gym.latgym, longitude: gym.longgym }}
              // image={gym.activegym === true ? require('../../../assets/gym_marker_2.png'):null}
              pinColor={gym.activegym === true ? 'blue' : 'red'}
              description={gym.addressgym}
              onCalloutPress={() => this.gymDetail(gym)}
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
          onPress={this.getCurrentPosition}
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

