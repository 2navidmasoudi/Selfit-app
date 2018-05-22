import React, {Component} from 'react';
import {Container, Tab, Tabs,Fab,Text} from 'native-base';
import AppHeader from '../../header';
import List from './list';
import {TabsStyle} from '../../../assets/styles/gym';
import {connect} from 'react-redux';
import {locateUser} from '../../../redux/actions/index';
import {putCheckToken} from '../../../services/index';
import GymMap from "./GymMap";

const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

class Gym extends Component {
    state = {
        viewComponent:<List/>,
        tabTitle:'لیست',
        region: {
            // latitude: 35.7247434,
            // longitude: 51.3338664,
            // latitudeDelta: 0.5,
            // longitudeDelta: 0.5,
        },
    };


    componentWillMount() {
        let {tokenmember, tokenapi} = this.props.user;
        putCheckToken(tokenmember, tokenapi);
        this.getCurrentPosition();
    }

    async getCurrentPosition() {
        try {
            await navigator.geolocation.getCurrentPosition(
                (position) => {
                    const region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    };
                    this.setState({region});
                    this.props.locateUser(this.state.region.latitude, this.state.region.longitude);
                },
                (error) => alert(error.message),
                // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 , distanceFilter: 2000}
            );

        } catch (error) {
            console.log(error);
        }

    }

    toggleComponent() {
        if (this.state.tabTitle=='لیست') {
            this.setState({
                viewComponent:<GymMap/>,
                tabTitle:'نقشه',
            });
        } else {
            this.setState({
                viewComponent:<List/>,
                tabTitle:'لیست',
            });
        }
    }

    render() {
        return (
            <Container>
                <AppHeader rightTitle="باشگاه یاب" backButton={"flex"}/>
                <Tabs locked tabBarPosition="top">
                    <Tab heading={this.state.tabTitle}
                         textStyle={TabsStyle.text}
                         activeTabStyle={TabsStyle.activeTab}
                         tabStyle={TabsStyle.notActiveTabs}
                    >
                        {this.state.viewComponent}
                    </Tab>
                </Tabs>
                <Fab style={{backgroundColor: '#0F9D7A'}}
                     position="bottomLeft"
                     onPress={this.toggleComponent.bind(this)}>
                    {/*<Icon name="md-locate"/>*/}
                    <Text style={{fontSize:18}}>{this.state.tabTitle=='لیست' ? 'نقشه' : 'لیست'}</Text>
                </Fab>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        locateUser: (latval, longval) => dispatch(locateUser(latval, longval)),
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gym);