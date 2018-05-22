import React from 'react';
import {View} from 'react-native';
import {Container} from 'native-base';
import {styles} from './style';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import BuffetMenu from '../../Main/BuffetMenu';
import BuffetKeeper from '../../Main/BuffetKeeper';
import Coach from '../../Main/Coach';
// import PushNotification from 'react-native-push-notification';
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
        order: undefined,
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

    render() {

        return (
            <Container styele={styles.mainContainer}>
                <View style={styles.mainRowWrapper}>
                    <View style={{flex: 1, backgroundColor: '#37FF00'}}>
                        <BuffetKeeper/>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#00A1FF'}}>
                        <BuffetMenu/>
                    </View>
                </View>
                <View style={styles.mainRowWrapper}>
                    <View style={{flex: 1, backgroundColor: '#FFD700'}}>
                        <Coach/>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, backgroundColor: '#B200FF'}}>
                            <Store/>
                        </View>
                        <View style={{flex: 1, backgroundColor: '#FF1500'}}>
                            <Music/>
                        </View>
                    </View>
                </View>
            </Container>
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