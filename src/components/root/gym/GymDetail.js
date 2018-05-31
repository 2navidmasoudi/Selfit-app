import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';
import { Body, Button, Card, CardItem, Container, Content, Left, Right, Thumbnail } from 'native-base';
import moment from 'moment-jalaali';
import { Rating } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import Carousel from 'react-native-snap-carousel';
import { openMap } from 'react-native-open-map';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import { getAllPicGym, postRateGym, putVisit } from '../../../services/gym';
import { form } from '../../../assets/styles/index';
import { mainColor } from '../../../assets/variables/colors';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { htmlStyle } from '../../../assets/styles/html';

moment.loadPersian({ dialect: 'persian-modern' });
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
      let dataSource = [];
      console.log('pics', PicArray);
      for (let i = 0; i < PicArray.length; i++) {
        const m = moment(`${PicArray[i].datesave}`, 'YYYY/MM/DDTHH:mm:ss');
        const ImgYear = m.jYear();
        const ImgMonth = m.jMonth() + 1;
        const ImgSrc = `${PicArray[i].httpserver}${PicArray[i].pathserver}${ImgYear}/${ImgMonth}/${PicArray[i].picgym}`;
        // await this.setState(prevState => ({
        //   dataSource: [...prevState.dataSource,
        //     {
        //       url: ImgSrc
        //     }
        //   ]
        // }));
        dataSource = [...dataSource, { url: ImgSrc }];
      }
      this.setState({
        dataSource,
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
    openMap({
      latitude: latgym,
      longitude: longgym,
      title: 'انتخاب مسیر یاب',
      cancelText: 'انصراف',
    });
  }

  renderItem({ item, index }) {
    return (
      <View key={index} style={styles.slide}>
        <Image style={{ flex: 1, width: null }} resizeMode="cover" source={{ uri: item.url }} />
      </View>
    );
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
    const htmlContent = descgym ? persianNumber(descgym.replace(/(\r\n|\n|\r)/gm, '')) : '<p>فاقد توضیحات.</p>';
    const slide = this.state.slideready ?
      (<Carousel
        data={this.state.dataSource}
        renderItem={this.renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        enableMomentum={false}
        layout="stack"
        layoutCardOffset={25}
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
                  stylesheet={htmlStyle}
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

