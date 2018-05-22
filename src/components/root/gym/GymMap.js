import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Fab, Icon, Spinner} from 'native-base';
import {connect} from 'react-redux';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import {mapStyle} from '../../../assets/styles/map';
import {getAllGym} from '../../../services/gym';
import {receiveGym, tokenGym} from '../../../redux/actions/index';
import {Actions} from 'react-native-router-flux';

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

class GymMap extends Component {
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


    componentWillMount() {
        this.props.tokenGym("selfit.gym");
        this.getCurrentPosition();
    }

    componentDidMount() {
        this.getGym();
    }

    async getGym() {
        try {
            let {tokenmember, latval, longval} = await this.props.user;
            let {latitude, longitude} = await this.state.region;
            let {tokenapi, min} = await this.props;
            // let GymList=[];
            let GymMapList;
            await this.setState({min: 0});
            if (this.state.firstTime) {
                GymMapList = await getAllGym(latval, longval, tokenmember, tokenapi, 200, this.state.min, false, 0);
                console.log(GymMapList);
                await this.props.receiveGym(GymMapList, this.state.min);
                this.setState({MarkerReady: true, firstTime: false});
                return;
            } else {
                GymMapList = await getAllGym(latitude, longitude, tokenmember, tokenapi, 200, min, false, 0);
                console.log(GymMapList);
                await this.props.receiveGym(GymMapList, min);
                this.setState({MarkerReady: true});
            }
            //this gonna do a loop in app but it slowers the app! could be fixed.
            // do {

            // await this.props.receiveGym(json.GymList.$values,this.state.min);

            // await this.setState({min: this.state.min + 70});
            // this.getGym();
            // } while ( json != null && json.GymMapList != null  && json.GymMapList.$values != null &&  json.GymMapList.$values.length>0 )

        } catch (error) {
            console.log(error);

        }
    }

    async onRegionChangeComplete(region) {
        await this.setState({region});
        console.log('onRegionChangeComplete', region, "new region:", this.state.region);
    };

    async getNewGym() {
        await this.setState({
            MarkerReady: false
        });
        await this.getGym();
    }

    setRegion(region) {
        // this.setState({ region });        
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
                (error) => console.log(error.message),
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
                <MapView style={styles.map}
                         ref={map => {
                             this.state.map = map
                         }}
                         initialRegion={initialRegion}
                         showsUserLocation={true}
                         loadingEnabled={true}
                         onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                         customMapStyle={mapStyle}
                         onMapReady={() => this.getCurrentPosition()}>
                    {this.state.MarkerReady === false ? null : this.props.gym.map((gym) => (
                        <Marker
                            key={gym.idgym}
                            coordinate={{latitude: gym.latgym, longitude: gym.longgym}}
                            // image={gym.activegym === true ? require('../../../assets/gym_marker_2.png'):null}
                            onPress={(e => console.log(e.nativeEvent.coordinate))}
                            pinColor={gym.activegym === true ? 'blue' : 'red'}
                            title={gym.namegym}
                            description={gym.addressgym}
                            onCalloutPress={() => this._gymDetail(gym)}>
                            {/* <View><Text>{gym.namegym}</Text></View> */}

                        </Marker>
                    ))}
                </MapView>
                <Fab style={{backgroundColor: '#0F9D7A'}}
                    position="bottomRight"
                    onPress={this.getCurrentPosition.bind(this)}>
                    <Icon name="md-locate"/>
                </Fab>
                {this.state.MarkerReady === false ? <Spinner/> :
                    <Button block style={{margin: 25, marginHorizontal: 100, borderWidth: 5}}
                            onPress={() => this.getNewGym()}>
                        <Text style={{color: 'white'}}>گرفتن باشکاه ها در این مکان</Text>
                    </Button>}


            </View>

        )
    }


}

const mapStateToProps = (state) => {
    return {
        gym: state.gym.GymList,
        min: state.gym.min,
        user: state.user,
        tokenapi: state.gym.tokenapi,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        receiveGym: (gym, min) => dispatch(receiveGym(gym, min)),
        tokenGym: (tokenapi) => dispatch(tokenGym(tokenapi)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GymMap);