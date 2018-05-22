import React, {Component} from 'react';
import {Drawer, Lightbox, Router, Scene} from 'react-native-router-flux';
import {Dimensions, NetInfo , DeviceEventEmitter } from 'react-native';
import {Root} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect, Provider} from 'react-redux';
import Splash from './components/Splash';
import Login from './components/Login';
import Register from './components/Register';
import Sign from './components/Sign';
import Gym from './components/root/gym';
import Buffet from './components/root/buffet';
import BuffetKeeper from './components/root/buffetKeepr';
import Couch from './components/root/couch';
import Doctor from './components/root/doctor';
import Blog from './components/root/blog';
import Store from './components/root/store';
import CategoryChildren from './components/root/store/categoryChildren';
import HealthDevice from './components/root/healthdevice';
import MyGym from './components/root/mygym';
import EditGym from './components/root/mygym/editGym';
import FullMap from './components/root/gym/fullMap';
import FoodList from './components/root/buffetMenu';
import AuthLightBox from './components/lightbox/AuthLightBox';
import Music from './components/root/Music';
import Profile from './components/root/Profile';
import Support from './components/root/Support';
import configureStore from './redux/store/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import GymDetail from './components/root/gym/GymDetail';
import BuffetMenu from './components/root/buffet/BuffetMenu';
import EditProfile from './components/root/profile/EditProfile';
import ShowImage from './components/imageShow';
import MapAddress from './components/root/address/mapAddress';
import Address from './components/root/address';
import AddAddress from './components/root/address/addAddress';
import EditAddress from './components/root/address/editAddress';
import BuffetOrder from './components/root/buffet/BuffetOrder';
import AddFood from './components/root/buffetMenu/addFood';
import AddMaterial from './components/root/buffetMenu/addMaterial';
import MenuList from './components/root/buffetMenu/list';
import Geocoder from 'react-native-geocoding';
import BlogWeb from './components/root/blog/blogWeb';
import Main from './components/root/Main';
import DrawerLayout from './components/DrawerLayout';
import codePush, {codePushDownloadDidProgress, codePushStatusDidChange} from "react-native-code-push";
import BuffetBasket from "./components/root/basket/BuffetBasket";
import ProductBasket from "./components/root/basket/ProductBasket";
import TimeStore from "./components/root/basket/timeStore";
import finalOrderBuffet from "./components/root/basket/finalOrderBuffet";
import finalOrderProduct from "./components/root/basket/finalOrderProduct";
import OrderDetail from "./components/root/buffetKeepr/OrderDetail";

// import io from 'socket.io-client';
// import Sockets from 'react-native-sockets';

Geocoder.setApiKey('AIzaSyBlgHjeMbqK3xEZfh6HK2o8RdjhhgTOh0s');
let window = Dimensions.get('window');
const {persistor, store} = configureStore();

EStyleSheet.build({
    $statusBarColor: '#0f9d7a',
    $headerColor: '#313131',
    $signBoxColor: '#0F9D7A',
    $IS: 'IRANSansMobile'
});

//     code-push release-react Selfit-Android android
//      adb shell input keyevent 82
// debug {
//     // Note: CodePush updates should not be tested in Debug mode as they are overriden by the RN packager. However, because CodePush checks for updates in all modes, we must supply a key.
//     buildConfigField "String", "CODEPUSH_KEY", '""'
// }

//new CodePush("9PjteJbz4ITT6_TB0p8ZQiQiCdlw9a15624f-c322-4826-b2b4-273e2c1cd5eb", MainApplication.this, BuildConfig.DEBUG),

const onBeforeLift = async () => {
    // let port = 8081;
    // Sockets.startServer(port);
    // let clientAddr = 'http://localhost';
    // Sockets.emit("message to client", clientAddr);
    // const socket = io('https://selfitapi.ir/api', {
    // path: '/Log/GetAll'
    // });
    // let config={
    //     address: "hhtps://selfitapi.ir/", //ip address of server
    //     port: 80, //port of socket server
    //     reconnect:true, //OPTIONAL (default false): auto-reconnect on lost server
    //     reconnectDelay:500, //OPTIONAL (default 500ms): how often to try to auto-reconnect
    //     maxReconnectAttempts:10, //OPTIONAL (default infinity): how many time to attemp to auto-reconnect
    //
    // };
    // Sockets.startClient(config);
    //
    // Sockets.write("message to server");

    function handleFirstConnectivityChange(connectionInfo) {
        console.log('Network change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveTypes);
        console.log(connectionInfo);
        NetInfo.removeEventListener(
            'connectionChange',
            handleFirstConnectivityChange
        );
    }

    NetInfo.addEventListener(
        'connectionChange',
        handleFirstConnectivityChange
    );
    //on started
    // DeviceEventEmitter.addListener('socketServer_connected', () => {
    //     console.log('socketServer_connected');
    // });
    // //on error
    // DeviceEventEmitter.addListener('socketServer_error', (data) => {
    //     console.log('socketServer_error',data.error);
    // });
    // //on client connected
    // DeviceEventEmitter.addListener('socketServer_clientConnected', (client) => {
    //     console.log('socketServer_clientConnected', client.id);
    // });
    // //on new message
    // DeviceEventEmitter.addListener('socketServer_data', (payload) => {
    //     console.log('socketServer_data message:', payload.data);
    //     console.log('socketServer_data client id:', payload.client);
    // });
    // //on server closed
    // DeviceEventEmitter.addListener('socketServer_closed', (data) => {
    //     console.log('socketServer_closed',data.error);
    // });
    // //on client disconnected
    // DeviceEventEmitter.addListener('socketServer_clientDisconnected', (data) => {
    //     console.log('socketServer_clientDisconnected client id:', data.client);
    // });
};

class App extends Component {
    componentDidMount() {
        // Linking.addEventListener('url', this._handleOpenURL);

    }
    //
    componentWillUnmount() {
        // Linking.removeEventListener('url', this._handleOpenURL);

    }

    _handleOpenURL(event) {
        console.log(event.url);
    }

    codePushStatusDidChange(status) {
        switch (status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for updates.");
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update.");
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                console.log("Up-to-date.");
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Update installed.");
                break;
        }
    }

    codePushDownloadDidProgress(progress) {
        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
    }

    render() {
        const RouterWithRedux = connect()(Router);
        return (
            <Root>
                <Provider store={store}>
                    <PersistGate
                        // loading={<Splash/>}
                        onBeforeLift={onBeforeLift}
                        persistor={persistor}>
                        <RouterWithRedux hideNavBar>
                            <Scene>
                                <Scene key="splash"
                                       
                                       component={Splash}
                                       hideNavBar/>
                                <Scene key="sign" component={Sign} hideNavBar/>
                                <Scene key="root"
                                        initial
                                       hideNavBar>
                                    <Drawer key="drawer" drawerPosition="right" contentComponent={DrawerLayout}
                                            drawerWidth={window.width / 2}>
                                        <Scene>
                                            <Scene key="Home" hideNavBar={true}
                                                   component={Main}/>
                                            <Scene key="Music" hideNavBar={true} component={Music}/>
                                            <Scene key="support" component={Support} hideNavBar/>
                                            <Scene key="gym"
                                                   
                                                   component={Gym} hideNavBar/>
                                            <Scene key="fullMap" component={FullMap} hideNavBar/>
                                            <Scene key="gymDetail" component={GymDetail} hideNavBar/>
                                            <Scene key="buffet"  component={Buffet}
                                                   hideNavBar/>
                                            <Scene key="buffetMenu" component={BuffetMenu} hideNavBar/>
                                            <Scene key="buffetBasket" component={BuffetBasket} hideNavBar/>
                                            <Scene key="productBasket"  component={ProductBasket} hideNavBar/>
                                            <Scene key="timeStore"   component={TimeStore} hideNavBar/>
                                            <Scene key="factorBuffet" component={finalOrderBuffet} hideNavBar/>
                                            <Scene key="factorProduct" component={finalOrderProduct} hideNavBar/>
                                            <Scene key="addressRoot" hideNavBar>
                                                <Scene key="address" component={Address} initial hideNavBar/>
                                                <Scene key="mapAddress" component={MapAddress} hideNavBar/>
                                                <Scene key="addAddress" component={AddAddress} hideNavBar/>
                                                <Scene key="editAddress" component={EditAddress} hideNavBar/>
                                            </Scene>
                                            <Scene key="buffetKeeperRoot"  hideNavBar>
                                                <Scene key="buffetKeeper" component={BuffetKeeper} initial hideNavBar/>
                                                <Scene key="orderDetail" component={OrderDetail}  hideNavBar/>

                                            </Scene>
                                            <Scene key="buffetMenuRoot" hideNavBar>
                                                <Scene key="buffetMenu" component={FoodList} initial hideNavBar/>
                                                <Scene key="addFood" component={AddFood} hideNavBar/>
                                                <Scene key="addMaterial" component={AddMaterial} hideNavBar/>
                                                <Scene key="menuList" component={MenuList} hideNavBar/>
                                            </Scene>
                                            <Scene key="couchRoot" hideNavBar>
                                                <Scene key="couch" component={Couch} initial hideNavBar/>
                                            </Scene>
                                            <Scene key="doctorRoot" hideNavBar>
                                                <Scene key="doctor" component={Doctor} initial hideNavBar/>
                                            </Scene>
                                            <Scene key="storeRoot"   hideNavBar>
                                                <Scene key="store" component={Store} initial hideNavBar/>
                                                <Scene key="categoryChildren" component={CategoryChildren} hideNavBar/>
                                            </Scene>
                                            <Scene key="blogRoot"  hideNavBar>
                                                <Scene key="blog" component={Blog} initial hideNavBar/>
                                                <Scene key="blogWeb" component={BlogWeb} hideNavBar/>
                                            </Scene>
                                            <Scene key="healthdeviceRoot" hideNavBar>
                                                <Scene key="healthdevice" component={HealthDevice} initial hideNavBar/>
                                            </Scene>
                                            <Scene key="mygymRoot" hideNavBar>
                                                <Scene key="mygym" component={MyGym} initial hideNavBar/>
                                                <Scene key="editGym" component={EditGym}  hideNavBar/>
                                            </Scene>
                                            <Scene key='buffetOrder' component={BuffetOrder} hideNavBar/>
                                            <Scene key="showImage" component={ShowImage} hideNavBar/>
                                            <Scene key="profile" hideNavBar={true} component={Profile}/>
                                            <Scene key="editProfile" component={EditProfile} hideNavBar/>
                                        </Scene>
                                    </Drawer>
                                </Scene>
                                <Lightbox key="signUp"  hideNavBar>
                                    <Scene hideNavBar>
                                        <Scene key="login" component={Login}/>
                                        <Scene key="register"  component={Register}/>
                                    </Scene>
                                    <Scene key="authLightBox"  component={AuthLightBox}/>
                                </Lightbox>
                            </Scene>
                        </RouterWithRedux>
                    </PersistGate>
                </Provider>
            </Root>
        );
    }
}

App = codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
})(App);
export default App;


//distributionUrl=https\://services.gradle.org/distributions/gradle-2.14.1-all.zip