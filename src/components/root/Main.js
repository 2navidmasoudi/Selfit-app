import React, {Component} from 'react';
import {Text, View,} from 'react-native';
import {main} from '../../assets/styles/index';
import {Button, Container} from 'native-base';
import AppHeader from '../header';
import {connect} from 'react-redux';
import {putCheckToken} from '../../services';
import MemberGrid from './grids/MemberGrid';
import GymGrid from './grids/GymGrid';
import BuffetGrid from './grids/BuffetGrid';

// import PushNotification from 'react-native-push-notification';
// PushNotification.configure({
//
//     // (optional) Called when Token is generated (iOS and Android)
//     onRegister: function(token) {
//         console.log( 'TOKEN:', token );
//     },
//
//     // (required) Called when a remote or local notification is opened or received
//     onNotification: function(notification) {
//         console.log( 'NOTIFICATION:', notification );
//
//         // process the notification
//         Actions.addressRoot();
//         // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
//         // notification.finish(PushNotificationIOS.FetchResult.NoData);
//     },
//
//     // Should the initial notification be popped automatically
//     // default: true
//     popInitialNotification: true,
//
//     /**
//      * (optional) default: true
//      * - Specified if permissions (ios) and token (android and ios) will requested or not,
//      * - if not, you must call PushNotificationsHandler.requestPermissions() later
//      */
//     requestPermissions: true,
// });

class Main extends Component {
    state = {
        viewComponent: <MemberGrid/>,
    };

    componentWillMount() {
        //     PushNotification.localNotification({
        //         /* iOS and Android properties */
        //
        //         title: "Selfit | سلفیت", // (optional)
        //         message: "بیا اینجا", // (required)
        // });
        let {typememberid} = this.props.user;
        switch (typememberid) {
            case 6: //member
            case 1: //admin
            case 2: //support
            case 3: //author
                this.setState({viewComponent: <MemberGrid/>});
                break;
            case 5: //buffet
                this.setState({viewComponent: <BuffetGrid/>});
                break;
            case 4: //gym
                this.setState({viewComponent: <GymGrid/>});
                break;
            default:
                break;
        }
        this._putCheckToken();
    };

    render() {
        const pannel =
            this.props.user.typememberid ===
            6 ?
                <View>
                    <View style={main.pannelContainer}>
                        <View style={main.pannelWrapper}>
                            <Button full style={main.pannelBtn}
                                    onPress={() => this.setState({viewComponent: <GymGrid/>})}>
                                <Text style={main.pannelTextBtn}>باشگاه دار</Text>
                            </Button>
                        </View>
                        <View style={{flex: 1, margin: 2}}>
                            <Button full style={main.pannelBtn}
                                    onPress={() => this.setState({viewComponent: <BuffetGrid/>})}>
                                <Text style={main.pannelTextBtn}>بوفه دار</Text>
                            </Button>
                        </View>
                        <View style={{flex: 1, margin: 2}}>
                            <Button full style={main.pannelBtn}
                                    onPress={() => this.setState({viewComponent: <MemberGrid/>})}>
                                <Text style={main.pannelTextBtn}>ورزشکار</Text>
                            </Button>
                        </View>
                    </View>
                </View>
                : null;
        return (
            <Container>
                <AppHeader/>
                {this.state.viewComponent}
                {pannel}
            </Container>
        );
    }

    async _putCheckToken() {
        let {tokenmember, tokenapi} = await this.props.user;
        await putCheckToken(tokenmember, tokenapi);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(mapStateToProps, null)(Main);