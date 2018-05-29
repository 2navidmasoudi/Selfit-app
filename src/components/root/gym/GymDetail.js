import React, { Component } from 'react';
import { Image, Linking, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import { Body, Button, Card, CardItem, Container, Content, Left, Right, Thumbnail } from 'native-base';
import moment from 'moment-jalaali';
import { Rating } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { showLocation, Popup } from 'react-native-map-link';
import AppHeader from '../../header';
import { getAllPicGym, postRateGym, putVisit } from '../../../services/gym';
import { form } from '../../../assets/styles/index';
import { mainColor } from '../../../assets/variables/colors';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';

moment.loadPersian({ dialect: 'persian-modern' });
const isIOS = Platform.OS === 'ios';
const horizontalMargin = 30;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin
    // other styles for the item container
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1
    // other styles for the inner container
  }
});

@connect(state => ({
  user: state.user,
  tokenapi: state.gym.tokenapi,
}))
export default class GymDetail extends Component {
  state = {
    ImgSrc: null,
    slideready: false,
    position: 1,
    interval: null,
    dataSource: [],
    isVisible: false,
  };
  componentWillMount() {
    this.getInfo();
  }
  async getInfo() {
    await this._getAllPicGym();
    await this._putVisit();
  }
  async _putVisit() {
    try {
      const { gymid, tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const json = await putVisit(gymid, tokenmember, tokenapi);
      console.log('put visit? ', json);
    } catch (e) {
      console.log(e);
    }
  }
  async _getAllPicGym() {
    try {
      await this.setState({ dataSource: [] });
      const { gymid, tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const allPicGym = await getAllPicGym(gymid, tokenmember, tokenapi, 20, 0, true);
      const PicArray = await allPicGym.PicGymList.$values;
      console.log('pics', PicArray);
      for (i = 0; i < PicArray.length; i++) {
        const m = await moment(`${PicArray[i].datesave}`, 'YYYY/MM/DDTHH:mm:ss');
        const ImgYear = await m.jYear();
        const ImgMonth = await m.jMonth() + 1;
        const ImgSrc = await `${PicArray[i].httpserver}${PicArray[i].pathserver}${ImgYear}/${ImgMonth}/${PicArray[i].picgym}`;
        await this.setState(prevState => ({
          dataSource: [...prevState.dataSource,
            {
              url: ImgSrc
            }
          ]
        }));
      }
      this.setState({
        slideready: true
      });
      console.log(this.state.dataSource);
    } catch (err) {
      console.log(err);
    }
  }
  async ratingCompleted(rate) {
    try {
      console.log(`Rating is: ${rate}`);
      const { tokenmember } = await this.props.user;
      const { tokenapi, idgym } = await this.props;
      const result = await postRateGym(idgym, rate, tokenmember, tokenapi);
      console.log(result, 'postRateGym');
    } catch (e) {
      console.log(e);
    }
  }
  handleMapClick() {
    if (isIOS) {
      this.setState({isVisible: true});
    } else {
      const { latgym, longgym } = this.props;
      const url = `geo:${latgym},${longgym}`;
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    }
  }
  _renderItem({ item, index }) {
    return (
      <View key={index} style={styles.slide}>
        <Image style={{ flex: 1, width: null }} resizeMode="cover" source={{ uri: item.url }} />
      </View>
    );
  }
  render() {
    const {
      datesave, httpserver, pathserver, picgym, latgym, longgym,
      descgym, namegym, addressgym,
      RateNumber, visitgym, telgym
    } = this.props;
    const m = moment(`${datesave}`, 'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${httpserver}${pathserver}${ImgYear}/${ImgMonth}/${picgym}`;
    const htmlContent = `<div>${descgym}</div>`;
    const slide = this.state.slideready ?
      (<Carousel
        data={this.state.dataSource}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={1}
        layout="stack"
        layoutCardOffset={18}
        loop
      />)
      :
      (<Image style={{ flex: 1, height: itemHeight, width: null }} resizeMode="contain" source={{ uri: ImgSrc }} />);
    const gallery =
      (<CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Button
          style={{ backgroundColor: mainColor }}
          onPress={() => Actions.showImage({ images: this.state.dataSource })}
        >
          <Text style={{ color: '#FFF', paddingHorizontal: 5 }}>
            مشاهده گالری تصویر
          </Text>
        </Button>
       </CardItem>);
    return (
      <Container>
        <AppHeader rightTitle="باشگاه یاب" />
        {isIOS && <Popup
          isVisible={this.state.isVisible}
          onCancelPressed={() => this.setState({ isVisible: false })}
          onAppPressed={() => this.setState({ isVisible: false })}
          onBackButtonPressed={() => this.setState({ isVisible: false })}
          modalProps={{ // you can put all react-native-modal props inside.
            animationIn: 'slideInUp'
          }}
          options={{
            latitude: latgym,
            longitude: longgym,
            dialogTitle: 'نمایش باشگاه در نقشه', // optional (default: 'Open in Maps')
            dialogMessage: 'کدام اپلیکیشن؟', // optional (default: 'What app would you like to use?')
            cancelText: 'انصراف', // optional (default: 'Cancel')
          }}
        />}
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left style={{ flex: 1 }}>
                <Body>
                  <Text style={{
                  marginRight: 10,
                }}
                  >
                    باشگاه {namegym}
                  </Text>
                  <Text
                    style={{ marginRight: 10 }}
                    type="light"
                  >{persianNumber(jM)}
                  </Text>
                </Body>
                <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                  <Thumbnail source={{ uri: ImgSrc }} />
                </TouchableWithoutFeedback>
              </Left>
            </CardItem>
            <CardItem cardBody>
              {slide}
            </CardItem>
            {this.state.slideready && gallery}
            <CardItem>
              <ScrollView style={{ flex: 1 }}>
                <Text>
                  آدرس: {addressgym}
                </Text>
                <HTMLView
                  value={htmlContent}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text>{persianNumber(telgym)}</Text>
                  <Text>تلفن: </Text>
                </View>
              </ScrollView>
            </CardItem>
            <CardItem>
              <Left style={{ flex: 1 }}>
                <Text>تعداد بازدید: {persianNumber(visitgym)}</Text>
              </Left>
              <Right style={{ flex: 1 }}>
                <Rating
                  ratingCount={5}
                  fractions={2}
                  startingValue={RateNumber}
                  imageSize={30}
                  onFinishRating={this.ratingCompleted.bind(this)}
                  style={{ paddingVertical: 10 }}
                />
              </Right>
            </CardItem>
          </Card>
        </Content>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Button
            block
            style={[form.submitButton, { margin: 10, marginBottom: 20 }]}
            onPress={this.handleMapClick.bind(this)}
          >
            <Text style={{ color: '#FFF' }}>نمایش در نقشه</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
