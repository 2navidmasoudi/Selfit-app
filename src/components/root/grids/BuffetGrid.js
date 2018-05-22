import React from 'react';
import {View} from 'react-native';
import {Icon} from 'native-base';
import {styles} from './style';
import Swiper from 'react-native-swiper';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import BuffetMenu from '../../Main/BuffetMenu';
import BuffetKeeper from '../../Main/BuffetKeeper';
import Coach from '../../Main/Coach';
import {anim0, anim1} from "./anim";
import * as Animatable from 'react-native-animatable';
// import PushNotification from 'react-native-push-notification';
import {Actions} from "react-native-router-flux";
import {connect} from 'react-redux';
import {reBasketBuffet, reBasketMaterial, selectBuffet, setRoad, tokenBuffet} from "../../../redux/actions";
import {getAllOrderid} from "../../../services/orderBuffet";
import {getSingleIDMember} from "../../../services/buffet";
import {logError} from "../../../services/log";

// PushNotification.configure({
//
//     // (optional) Called when Token is generated (iOS and Android)
//     onRegister: function (token) {
//         console.log('TOKEN:', token);
//     },
//
//     // (required) Called when a remote or local notification is opened or received
//     onNotification: function (notification) {
//         console.log('NOTIFICATION:', notification);
//
//         // process the notification
//         // Actions.buffetKeeperRoot();
//
//     },
// });

class BuffetGrid extends React.Component {
    state = {
        icon: 'restaurant',
        color: '#37FF00',
        order:undefined,
    };

    componentDidMount() {
        this.setInfo();
        //TODO: BACKGROUND TIMER ON IOS
    }

    async setInfo() {
        await this.props.tokenBuffet('selfit.buffet');
        let buffetInfo = await this._getSingleIDMember();
        await this.props.selectBuffet(buffetInfo.idbuffet);
        console.log('buffet for this user:', buffetInfo.namebuffet, 'buffetid from props:', this.props.buffetid);
        // const intervalId = BackgroundTimer.setTimeout(() => {
        //     this._getAllOrderid();
        //
        // }, 3000);
    }

    async _getSingleIDMember() {
        try {
            let {tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let BuffetKeeperInfo = await getSingleIDMember(tokenmember, tokenapi);
            return BuffetKeeperInfo;
            // this.props.selectBuffet(BuffetKeeperInfo.idbuffet);
        } catch (error) {
            console.log(error);
            logError(error, '_getSingleIDMember', 'BuffetMenu/index', 'getSingleIDMember');
        }
    }
//TODO: pushNotification for new order
    // async _getAllOrderid() {
    //     try {
    //         let {order} = await this.state;
    //         let {tokenmember} = await this.props.user;
    //         let {tokenapi,buffetid} = await this.props;
    //         let ssss = await getAllOrderid(buffetid, true, tokenmember, tokenapi, 30, 0, true, 0);
    //         console.log(ssss);
    //         if (ssss !== order) {
    //             this.setState({order:ssss});
    //             PushNotification.localNotification({
    //                     /* iOS and Android properties */
    //                     title: "Selfit | سلفیت", // (optional)
    //                     message: "سفارش جدید دریافت کردید! لطفا کلیک کنید!", // (required)
    //             });
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    changeIcon(i) {
        switch (i) {
            case 0:
                this.setState({icon: 'musical-notes', color: '#B200FF'})
                break;
            case 1:
                this.setState({icon: 'cart', color: '#FF1500'});
                break;
            case 2:
                this.setState({icon: 'restaurant', color: '#37FF00'});
                break;
            case 3:
                this.setState({icon: 'bookmarks', color: '#00A1FF'});
                break;
            case 4:
                this.setState({icon: 'medal', color: '#FFD700'});
                break;
            default:
                break;
        }
    }

    render() {

        return (
            <Swiper style={styles.wrapper} showsButtons={true} loop={false} index={2}
                    onIndexChanged={(i) => this.changeIcon(i)}
                    dot={<View style={styles.nonActive}/>}
                    activeDot={<Animatable.View animation={anim0}
                                                easing="ease-out"
                                                iterationCount="infinite"
                                                // useNativeDriver
                                                direction="alternate"
                                                style={styles.activeDot}>
                        <Icon name={this.state.icon} style={{color: this.state.color}}/>
                    </Animatable.View>}
                    nextButton={<Animatable.Text style={styles.btn}
                                                 animation={anim1}
                                                 iterationCount="infinite"
                                                //  useNativeDriver
                                                 duration={2000}
                                                 direction="reverse">›</Animatable.Text>}
                    prevButton={<Animatable.Text style={styles.btn}
                                                 animation={anim1}
                                                 iterationCount="infinite"
                                                //  useNativeDriver
                                                 duration={2000}>‹</Animatable.Text>}>
                <View style={styles.slide1}>
                    <Music/>
                </View>
                <View style={styles.slide1}>
                    <Store/>
                </View>
                <View style={styles.slide1}>
                    <BuffetKeeper/>
                </View>
                <View style={styles.slide1}>
                    <BuffetMenu/>
                </View>
                <View style={styles.slide1}>
                    <Coach/>
                </View>
            </Swiper>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenBuffet: (tokenapi) => dispatch(tokenBuffet(tokenapi)),
        selectBuffet: (buffetid) => dispatch(selectBuffet(buffetid)),

    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.buffet.tokenapi,
        buffetid: state.buffet.buffetid,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BuffetGrid);