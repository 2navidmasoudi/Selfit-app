import React, { Component } from 'react';
import { Dimensions, Linking, Platform, NetInfo, Alert } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Drawer, Lightbox, Router, Scene, Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Root, Spinner } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect, Provider } from 'react-redux';
import { setEnabled } from './utils/analytics';
import configureStore from './redux/store/configureStore';
import Splash from './components/Splash';
import Login from './components/Login';
import Register from './components/Register';
import Sign from './components/Sign';
import Gym from './components/root/gym';
import Buffet from './components/root/buffet';
import BuffetKeeper from './components/root/buffetKeepr';
import Couch from './components/root/couch';
import CouchDetail from './components/root/couch/CoachDetail';
import Blog from './components/root/blog';
import Store from './components/root/store';
import CategoryChildren from './components/root/store/categoryChildren';
import MyGym from './components/root/mygym';
import EditGym from './components/root/mygym/editGym';
import FullMap from './components/root/gym/fullMap';
import FoodList from './components/root/buffetMenu';
import AuthLightBox from './components/lightbox/AuthLightBox';
import Music from './components/root/Music';
import Profile from './components/root/Profile';
import Support from './components/root/Support';
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
import BlogWeb from './components/root/blog/blogWeb';
import Main from './components/root/Main';
import DrawerLayout from './components/DrawerLayout';
import BuffetBasket from './components/root/basket/BuffetBasket';
import ProductBasket from './components/root/basket/ProductBasket';
import TimeStore from './components/root/basket/timeStore';
import finalOrderBuffet from './components/root/basket/finalOrderBuffet';
import finalOrderProduct from './components/root/basket/finalOrderProduct';
import OrderDetail from './components/root/buffetKeepr/OrderDetail';
import Complaints from './components/root/Complaints';
import WebViewComponent from './components/root/WebViewComponent';
import Follow from './components/root/follow';
import FactorProductDetail from './components/root/follow/FactorProductDetail';
import PaymentWeb from './components/root/payment';
import FactorBuffetDetail from './components/root/follow/FactorBuffetDetail';
import HtmlEditor from './components/root/htmlEditor';
import { darkColor, mainColor } from './assets/variables/colors';
import Federation from './components/root/federation';
import FederationDetail from './components/root/federation/FederationDetail';
import Waiting from './components/Waiting';
import FullMapBuffet from './components/root/buffet/fullMapBuffet';
import ListFood from './components/root/buffetMenu/listFood';
import ListMaterial from './components/root/buffetMenu/listMaterial';

// Geocoder.setApiKey('AIzaSyBlgHjeMbqK3xEZfh6HK2o8RdjhhgTOh0s');
const RouterWithRedux = connect()(Router);
const window = Dimensions.get('window');
const { persistor, store } = configureStore();
EStyleSheet.build({
  $statusBarColor: mainColor,
  $headerColor: darkColor,
  $signBoxColor: mainColor,
  $IS: 'IRANSansMobile'
});
const activeBackGesture = (Platform.OS === 'android') ? null : undefined;

export default class App extends Component {
  componentWillMount() {
    function handleFirstConnectivityChange(isConnected) {
      console.log(`Then, is ${isConnected ? 'online' : 'offline'}`);
      if (!isConnected) {
        Alert.alert(
          'خطا',
          'لطفا اتصال خود را به اینترنت بررسی کنید.',
          [
            { text: 'بازگشت', onPress: () => Actions.reset('splash') },
          ], {
            cancelable: false,
          }
        );
      }
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        handleFirstConnectivityChange
      );
    }
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }
  componentDidMount() {
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log(`Initial url is: ${url}`);
      }
    }).catch(err => console.error('An error occurred', err));
    Linking.addEventListener('url', this.handleOpenURL);
    if (__DEV__) {
      console.disableYellowBox = true;
      setEnabled(false);
    } else {
      setEnabled(true);
    }
    this.firebaseToken();
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  async firebaseToken() {
    firebase.messaging().hasPermission()
      .then((enabled) => {
        console.log('hasPermission');
        console.log(enabled);
        if (enabled) {
          firebase.messaging().getToken()
            .then((fcmToken) => {
              if (fcmToken) {
                console.log('getToken');
                console.log(fcmToken);
              } else {
                // @TODO: user doesn't have a device token yet
              }
            });
          // user has permissions
          this.notificationListener = firebase.notifications().onNotification((notification) => {
            console.log('notification');
            console.log(notification);
          });
        } else {
          firebase.messaging().requestPermission()
            .then(() => {
              firebase.messaging().getToken()
                .then((fcmToken) => {
                  if (fcmToken) {
                    console.log('requestPermission getToken');
                    console.log(fcmToken);
                  } else {
                    // @TODO: user doesn't have a device token yet
                  }
                });
              this.notificationListener = firebase.notifications().onNotification((notification) => {
                console.log('notification');
                console.log(notification);
              });
            })
            .catch((error) => {
              // @TODO: User has rejected permissions
            });
        }
      });
  }
  handleOpenURL(event) {
    console.log('Incoming url');
    console.log(event.url);
  }
  render() {
    return (
      <Root>
        <Provider store={store}>
          <PersistGate
            loading={<Spinner color={mainColor} />}
            persistor={persistor}
          >
            <RouterWithRedux hideNavBar>
              <Scene key="rootMain" hideNavbar>
                <Scene key="splash" component={Splash} hideNavBar />
                <Scene key="sign" component={Sign} hideNavBar />
                <Scene key="waiting" component={Waiting} hideNavBar />
                <Scene key="Music" hideNavBar component={Music} panHandlers={activeBackGesture} />
                <Scene key="root" initial hideNavBar>
                  <Drawer
                    key="drawer"
                    drawerPosition="right"
                    contentComponent={DrawerLayout}
                    drawerWidth={window.width / 1.7}
                  >
                    <Scene key="componentMain" hideNavbar>
                      <Scene key="Home" hideNavBar initial component={Main} />
                      <Scene key="support" component={Support} hideNavBar />
                      <Scene key="gym" component={Gym} hideNavBar />
                      <Scene key="fullMap" component={FullMap} hideNavBar />
                      <Scene key="fullMapBuffet" component={FullMapBuffet} hideNavBar />
                      <Scene key="gymDetail" component={GymDetail} hideNavBar />
                      <Scene key="buffet" component={Buffet} hideNavBar />
                      <Scene key="buffetMenu" component={BuffetMenu} hideNavBar />
                      <Scene key="buffetBasket" component={BuffetBasket} hideNavBar />
                      <Scene key="productBasket" component={ProductBasket} hideNavBar />
                      <Scene key="timeStore" component={TimeStore} hideNavBar />
                      <Scene key="factorBuffet" component={finalOrderBuffet} hideNavBar />
                      <Scene key="factorProduct" component={finalOrderProduct} hideNavBar />
                      <Scene key="addressRoot" hideNavBar>
                        <Scene key="address" component={Address} initial hideNavBar />
                        <Scene key="mapAddress" component={MapAddress} hideNavBar />
                        <Scene key="addAddress" component={AddAddress} hideNavBar />
                        <Scene key="editAddress" component={EditAddress} hideNavBar />
                      </Scene>
                      <Scene key="buffetKeeperRoot" hideNavBar>
                        <Scene key="buffetKeeper" component={BuffetKeeper} initial hideNavBar />
                        <Scene key="orderDetail" component={OrderDetail} hideNavBar />
                      </Scene>
                      <Scene key="buffetMenuRoot" hideNavBar>
                        <Scene key="buffetMenu" component={FoodList} initial hideNavBar />
                        <Scene key="addFood" component={AddFood} hideNavBar />
                        <Scene key="addMaterial" component={AddMaterial} hideNavBar />
                        <Scene key="listFood" component={ListFood} hideNavBar />
                        <Scene key="listMaterial" component={ListMaterial} hideNavBar />
                      </Scene>
                      <Scene key="couchRoot" hideNavBar>
                        <Scene key="couch" component={Couch} initial hideNavBar />
                        <Scene key="coachDetail" component={CouchDetail} hideNavBar />
                      </Scene>
                      <Scene key="federationRoot" hideNavBar>
                        <Scene key="federation" component={Federation} initial hideNavBar />
                        <Scene key="federationDetail" component={FederationDetail} hideNavBar />
                      </Scene>
                      <Scene key="storeRoot" hideNavBar>
                        <Scene key="store" component={Store} initial hideNavBar />
                        <Scene key="categoryChildren" component={CategoryChildren} hideNavBar />
                      </Scene>
                      <Scene key="blogRoot" hideNavBar>
                        <Scene key="blog" component={Blog} initial hideNavBar />
                        <Scene key="blogWeb" component={BlogWeb} hideNavBar />
                      </Scene>
                      <Scene key="mygymRoot" hideNavBar>
                        <Scene key="mygym" component={MyGym} initial hideNavBar />
                        <Scene key="editGym" component={EditGym} hideNavBar />
                        <Scene key="htmlEditor" component={HtmlEditor} hideNavBar />
                      </Scene>
                      <Scene key="buffetOrder" component={BuffetOrder} hideNavBar />
                      <Scene key="showImage" component={ShowImage} hideNavBar />
                      <Scene key="profile" hideNavBar component={Profile} />
                      <Scene key="editProfile" component={EditProfile} hideNavBar />
                      <Scene key="complaints" component={Complaints} hideNavBar />
                      <Scene key="webView" component={WebViewComponent} hideNavBar />
                      <Scene key="follow" component={Follow} hideNavBar />
                      <Scene key="followProduct" component={FactorProductDetail} hideNavBar />
                      <Scene key="followBuffet" component={FactorBuffetDetail} hideNavBar />
                      <Scene key="paymentWebView" component={PaymentWeb} hideNavBar />
                    </Scene>
                  </Drawer>
                </Scene>
                <Lightbox key="signUp" hideNavBar>
                  <Scene hideNavBar>
                    <Scene key="login" component={Login} panHandlers={activeBackGesture} />
                    <Scene key="register" component={Register} panHandlers={activeBackGesture} />
                  </Scene>
                  <Scene key="authLightBox" component={AuthLightBox} panHandlers={activeBackGesture} />
                </Lightbox>
              </Scene>
            </RouterWithRedux>
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}
