import React, { Component } from 'react';
import { StyleSheet, Modal, View, Platform, Linking } from 'react-native';
import { Container, Button, Icon, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Video from 'react-native-video';
import PropTypes from 'prop-types';
import { putCheckToken } from '../services';
import Status from './status';
import SplashVideo from '../assets/1.mp4';
import { darkColor, mainColor, white } from '../assets/variables/colors';
import { Text } from './Kit';
import AppVersion from '../services/AppVersion';

const urlAndroid = 'https://cafebazaar.ir/app/com.selfit.universal/';
const urlIOS = 'https://sibapp.com/applications/selfit';
const isIOS = Platform.OS === 'ios';
let tokenChecked = false;
let UpdateRequired = false;
@connect(state => ({ user: state.user }))
export default class Splash extends Component {
  static propTypes = {
    user: PropTypes.objectOf(PropTypes.node).isRequired,
  };
  constructor() {
    super();
    this.state = {
      dots: '...',
      videoVisible: true,
      modalVisible: false,
    };
    this.dots = () => {
      const { dots } = this.state;
      switch (dots) {
        case '......':
          this.setState({ dots: '.' });
          break;
        default:
          this.setState({ dots: `${dots}.` });
          break;
      }
    };
    this.onEnd = () => {
      this.setState({
        videoVisible: false,
      });
      if (!UpdateRequired) {
        if (tokenChecked === true) {
          Actions.reset('root');
        } else {
          Actions.reset('sign');
        }
      }
    };
  }
  componentDidMount() {
    this.checkToken();
    this.checkUpdate();
    this.interval = setInterval(() => this.dots(), 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  async checkUpdate() {
    const update = await AppVersion();
    if (!update) return;
    const version = await DeviceInfo.getVersion();
    if (version <= update) {
      this.setState({ modalVisible: true });
      UpdateRequired = true;
    }
  }
  CancelButton() {
    this.setState({ modalVisible: false });
    UpdateRequired = false;
    this.onEnd();
  }
  async checkToken() {
    const { tokenmember, tokenapi } = await this.props.user;
    const json = await putCheckToken(tokenmember, tokenapi);
    if (json === 1) {
      tokenChecked = true;
      if (!this.state.videoVisible) {
        this.onEnd();
      }
    }
  }
  UpdateButton() {
    this.setState({ modalVisible: false });
    UpdateRequired = false;
    if (isIOS) {
      Linking.openURL(urlIOS);
    } else {
      Linking.openURL(urlAndroid);
    }
    this.onEnd();
  }
  render() {
    return (
      <Container style={styles.MainContainer}>
        <Status />
        <Modal
          animationType="fade"
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
              <View style={styles.modalView}>
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
        <View style={styles.main}>
          <Spinner color={mainColor} />
          <Text style={styles.txt}>
            درحال برقراری ارتباط با سرور
          </Text>
          <Text style={styles.txt}>
            لطفا چند لحظه صبر کنید{this.state.dots}
          </Text>
        </View>
        <Video
          resizeMode="cover"
          playInBackground
          playWhenInactive
          source={SplashVideo}
          onEnd={this.onEnd}
          style={[styles.backgroundVideo, { display: this.state.videoVisible ? 'flex' : 'none' }]}
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: darkColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: { color: white },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColor,
  },
  modalView: { flexDirection: 'row' },
  backgroundVideo: {
    flex: 1,
    position: 'absolute',
    top: -50,
    left: -50,
    bottom: -50,
    right: -50,
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
    color: white,
    padding: 2,
    textAlign: 'center'
  },
  TextStyle2: {
    fontSize: 14,
    marginBottom: 0,
    color: white,
    padding: 2,
    marginHorizontal: 20,
    textAlign: 'center'
  }
});
