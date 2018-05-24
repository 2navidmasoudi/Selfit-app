import React, { Component } from 'react';
import { Image, Linking, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Body, Button, Card, CardItem, Container, Content, Left, Right, Text, Thumbnail } from 'native-base';
import moment from 'moment-jalaali';
import { Rating } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { getAllPicGym, postRateGym, putVisit } from '../../../services/gym';
import { form } from '../../../assets/styles/index';

moment.loadPersian({ dialect: 'persian-modern' });

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
    const { latgym, longgym } = this.props;
    // let url = `https://waze.com/ul?ll=${latgym},${longgym}`;
    const url = Platform.OS === 'ios' ? `http://maps.apple.com/?ll=${latgym},${longgym}` : `geo:${latgym},${longgym}`;
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  render() {
    const {
      datesave, httpserver, pathserver, picgym,
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
      (<Swiper
        style={styles.wrapper}
        height={200}
        showsButtons
        loop
        autoplay
        autoplayTimeout={1.5}
      >
        {this.state.dataSource.map((pic, index) => (
          <TouchableWithoutFeedback
            key={index}
            style={styles.slide1}
            onPress={() => Actions.showImage({ images: this.state.dataSource })}
          >
            <Image
              style={{
              height: 200,
              width: null,
              resizeMode: 'cover',
              justifyContent: 'center',
              alignItems: 'center',
            }}
              source={{ uri: pic.url }}
            />
          </TouchableWithoutFeedback>
        ))}
       </Swiper>)
      :
      (<TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
        <Image style={{ flex: 1, height: 220, width: null }} resizeMode="contain" source={{ uri: ImgSrc }} />
       </TouchableWithoutFeedback>);
    return (
      <Container>
        <AppHeader rightTitle="باشگاه یاب" backButton="flex" />
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left style={{ flex: 1 }}>
                <Body>
                  <Text style={{
                  marginRight: 10,
                  textAlign: 'right',
                  fontFamily: 'IRANSansMobile'
                }}
                  >
                    باشگاه {namegym}
                  </Text>
                  <Text
                    style={{ marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile' }}
                    note
                  >{jM}
                  </Text>
                </Body>
                <TouchableWithoutFeedback onPress={() => Actions.showImage({ uri: ImgSrc })}>
                  <Thumbnail source={{ uri: ImgSrc }} />
                </TouchableWithoutFeedback>
              </Left>
            </CardItem>
            <CardItem>
              {slide}
            </CardItem>
            <CardItem>
              <ScrollView style={{ flex: 1 }}>
                <Text
                  style={{ textAlign: 'right', fontFamily: 'IRANSansMobile' }}
                >آدرس: {addressgym}
                </Text>
                <HTMLView
                  value={htmlContent}
                  stylesheet={{ flex: 1, textAlign: 'right' }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text>{telgym}</Text>
                  <Text style={{ fontFamily: 'IRANSansMobile', }}>تلفن: </Text>
                </View>
              </ScrollView>
            </CardItem>
            <CardItem>
              <Left style={{ flex: 1 }}>
                <Text>تعداد بازدید: {visitgym}</Text>
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
            <Text style={form.submitText}>نمایش در نقشه</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
