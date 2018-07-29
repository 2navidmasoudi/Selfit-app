import React, { Component } from 'react';
import { StyleSheet, Modal, View, Platform, Linking } from 'react-native';
import { Container, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Video from 'react-native-video';
import { putCheckToken } from '../services';
import Status from './status';
import SplashVideo from '../assets/1.mp4';
import { darkColor, mainColor, white } from '../assets/variables/colors';
import { Text } from './Kit';

const urlAndroid = 'https://cafebazaar.ir/app/com.selfit.universal/';
const urlIOS = 'https://sibapp.com/applications/selfit';
const isIOS = Platform.OS === 'ios';
@connect(state => ({ user: state.user }))
export default class Splash extends Component {
  state = {
    tokenChecked: false,
    modalVisible: false,
    UpdateRequired: false,
  };
  componentDidMount() {
    setTimeout(() => this.checkToken(), 100);
    // TODO: check the latest version from server <3
  }
  async UpdateButton() {
    await this.setState({
      modalVisible: false,
      UpdateRequired: false,
    });
    if (isIOS) {
      Linking.openURL(urlIOS).catch(err => console.error('An error occurred', err));
    } else {
      Linking.openURL(urlAndroid).catch(err => console.error('An error occurred', err));
    }
    this.leadToScreen();
  }
  async CancelButton() {
    await this.setState({
      modalVisible: false,
      UpdateRequired: false,
    });
    this.leadToScreen();
  }
  async checkToken() {
    try {
      const version = await DeviceInfo.getVersion();
      console.log('app_version');
      console.log(version);
      if (version === '1.3') {
        this.setState({
          UpdateRequired: true,
          modalVisible: true
        });
      }
      const { tokenmember, tokenapi } = await this.props.user;
      const json = await putCheckToken(tokenmember, tokenapi);
      console.log('json for login');
      console.log(json);
      if (json === 1) {
        this.setState({ tokenChecked: true });
      } else {
        putCheckToken(tokenmember, tokenapi).then((result) => {
          console.log('json for login');
          console.log(result);
          if (result === 1) {
            this.setState({ tokenChecked: true });
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  async leadToScreen() {
    const { tokenChecked, UpdateRequired } = await this.state;
    if (!UpdateRequired) {
      if (tokenChecked === true) {
        console.log('go to root');
        Actions.reset('root');
      } else {
        console.log('go to sign');
        Actions.reset('sign');
      }
    }
  }
  render() {
    return (
      <Container style={styles.MainContainer}>
        <Status />
        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('requestCloseUpdate')}
        >
          <View style={styles.modalBackground}>
            <View style={styles.ModalInsideView}>
              <Text style={styles.TextStyle}>لطفا برنامه را بروز رسانی کنید!</Text>
              <Text
                type="light"
                style={styles.TextStyle2}
              >
                در صورت بروز رسانی از مزایای بیشتر و
                اشکالات درون برنامه ای کمتری برخوردار خواهید شد.
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  iconRight
                  style={[styles.buttonStyle, { marginRight: 2 }]}
                  onPress={() => {
                  this.CancelButton();
                }}
                >
                  <Text style={styles.ButtonTextStyles}>خیر</Text>
                  <Icon name="close-circle" />
                </Button>
                <Button
                  iconRight
                  style={[styles.buttonStyle, { marginLeft: 2 }]}
                  onPress={() => {
                  this.UpdateButton();
                }}
                >
                  <Text style={styles.ButtonTextStyles}>آپدیت</Text>
                  <Icon name="md-checkmark-circle-outline" />
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        <Video
          resizeMode="cover"
          playInBackground
          playWhenInactive
          source={SplashVideo}
          onEnd={this.leadToScreen.bind(this)}
          style={styles2.backgroundVideo}
        />
      </Container>
    );
  }
}
const styles2 = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
    position: 'absolute',
    top: -50,
    left: -50,
    bottom: -50,
    right: -50,
  },
});

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColor,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  ModalInsideView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainColor,
    // padding: 20,
    width: '85%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: darkColor
  },
  ButtonTextStyles: {
    color: white,
    fontFamily: 'IRANSansMobile',
    textAlign: 'center',
    margin: '20%'
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: darkColor,
    margin: 4,
  },
  TextStyle: {
    fontSize: 18,
    marginBottom: 0,
    color: '#fff',
    padding: 2,
    textAlign: 'center'
  },
  TextStyle2: {
    fontSize: 14,
    marginBottom: 0,
    color: '#fff',
    padding: 2,
    marginHorizontal: 20,
    textAlign: 'center'
  }
});
