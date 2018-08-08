import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions, Alert,
} from 'react-native';
import { Body, Button, Card, CardItem, Container, Content, Left, Right, Thumbnail } from 'native-base';
import moment from 'moment-jalaali';
import { Rating } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import Carousel from 'react-native-snap-carousel';
import { openMap } from 'react-native-open-map';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import call from 'react-native-phone-call';
import AppHeader from '../../header';
import { getAllPicGym, postRateGym, putVisit } from '../../../services/gym';
import { form } from '../../../assets/styles/index';
import { mainColor, white } from '../../../assets/variables/colors';
import { Text } from '../../Kit';
import { persianNumber } from '../../../utils/persian';
import { htmlStyle } from '../../../assets/styles/html';
import { selectGym } from '../../../redux/actions';

moment.loadPersian({ dialect: 'persian-modern' });
const horizontalMargin = 30;
const slideWidth = 280;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + (horizontalMargin * 2);
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
}), {
  selectGym,
})
export default class GymDetail extends Component {
  state = {
    ImgSrc: null,
    slideready: false,
    position: 1,
    interval: null,
    dataSource: [],
    isVisible: false,
    rate: null,
    disableRate: false,
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
      const { gymid, tokenapi, user } = await this.props;
      const { tokenmember } = await this.props.user;
      if (user.typememberid !== 4) {
        this.props.selectGym(gymid);
      }
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
      const allPicGym = await getAllPicGym(gymid, tokenmember, tokenapi, 50, 0, true);
      const PicArray = await allPicGym.PicGymList.$values;
      let dataSource = [];
      console.log('pics', PicArray);
      for (let i = 0; i < PicArray.length; i++) {
        const m = moment(`${PicArray[i].datesave}`, 'YYYY/MM/DDTHH:mm:ss');
        const ImgYear = m.jYear();
        const ImgMonth = m.jMonth() + 1;
        const ImgSrc = `${PicArray[i].httpserver}${PicArray[i].pathserver}${ImgYear}/${ImgMonth}/${PicArray[i].picgym}`;
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
  ratingCompleted(rate) {
    console.log(`Rating is: ${rate}`);
    this.setState({ rate });
  }
  async submitRate() {
    try {
      const { tokenmember } = await this.props.user;
      const { tokenapi, gymid } = await this.props;
      let { rate } = await this.state;
      rate = await Number(rate);
      const result = await postRateGym(gymid, rate, tokenmember, tokenapi);
      console.log(result, 'postRateGym');
      if (result) {
        this.setState({ disableRate: true });
        Alert.alert(
          'ثبت امتیاز',
          'امتیاز شما ثبت شد. با تشکر!',
          [
            { text: 'بازگشت' },
          ]
        );
      }
      this.setState({ disableRate: true });
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
  renderItem = ({ item, index }) => (
    <View key={index} style={styles.slide}>
      <Image style={{ flex: 1, width: null }} resizeMode="cover" source={{ uri: item.url }} />
    </View>
  );
  renderDay = (day) => {
    switch (day) {
      case 1: return 'یک شنبه';
      case 2: return 'دو شنبه';
      case 3: return 'سه شنبه';
      case 4: return 'چهار شنبه';
      case 5: return 'پنج شنبه';
      case 6: return 'جمعه';
      default: return 'شنبه';
    }
  };
  renderSex = (sex) => {
    switch (sex) {
      case 1: return '(مردانه)';
      case 2: return '(زنانه)';
      default: return '(مردانه و زنانه)';
    }
  };
  render() {
    console.log('props of this gym');
    console.log(this.props);
    const {
      datesave, httpserver, pathserver, picgym,
      descgym, namegym, addressgym, activegym, numbertuitiongym,
      RateNumber, visitgym, telgym, tuitiongym, TimeWorkList,
    } = this.props;
    const TimeWork = TimeWorkList ? TimeWorkList.$values : [];
    const Times = TimeWork.length > 0 ? TimeWork : undefined;
    const m = datesave ? moment(`${datesave}`, 'YYYY/MM/DDTHH:mm:ss') : moment();
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${httpserver}${pathserver}${ImgYear}/${ImgMonth}/${picgym}`;
    const htmlContent = descgym ? persianNumber(descgym.replace(/(\r\n|\n|\r)/gm, '')) : '<p>فاقد توضیحات.</p>';
    const tuitionGym = tuitiongym ? tuitiongym.toLocaleString() : '؟';
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
      (<Image
        style={{ flex: 1, height: itemHeight, width: null }}
        resizeMode="contain"
        source={{ uri: ImgSrc }}
      />);
    const gallery =
      (
        <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button
            style={{ backgroundColor: mainColor }}
            onPress={() => Actions.showImage({ images: this.state.dataSource })}
          >
            <Text style={{ color: '#FFF', paddingHorizontal: 5 }}>
              مشاهده گالری تصویر
            </Text>
          </Button>
        </CardItem>
      );
    return (
      <Container>
        <AppHeader rightTitle="باشگاه یاب" />
        <Content padder>
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
                {telgym &&
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Text>{persianNumber(telgym)}</Text>
                  <Text>تلفن: </Text>
                </View>}
                <CardItem>
                  <Left style={{ flex: 1 }} />
                  <Right style={{ flex: 1 }}>
                    {telgym &&
                    <Button
                      style={{ backgroundColor: mainColor, marginHorizontal: 5 }}
                      onPress={() => call({ number: telgym }).catch(console.error)}
                    >
                      <Text style={{ color: '#FFF', paddingHorizontal: 5 }}>
                        تماس با باشگاه
                      </Text>
                    </Button>}
                  </Right>
                </CardItem>
                <Text>شهریه باشگاه: {persianNumber(tuitionGym)} تومان</Text>
                {/* <Text>فعالیت باشگاه: {activegym ? 'فعال' : 'غیر فعال'}</Text> */}
                <Text>ظرفیت باشگاه: {numbertuitiongym ? persianNumber(numbertuitiongym) : 'نامشخص'}</Text>
              </ScrollView>
            </CardItem>
            {Times &&
            <CardItem>
              <Right style={{ flex: 1 }}>
                <Text>ساعت کاری باشگاه: </Text>
                {Times.map(t =>
                  (
                    <Text key={t.idtimeworkgym}>
                      {this.renderDay(t.dateday)}{' ها ساعت '}
                      {persianNumber(t.fromdatehourtimeworkgym)}
                      {' '}الی{' '}
                      {persianNumber(t.todatehourtimeworkgym)}{' '}
                      {this.renderSex(t.sexgymid)}
                    </Text>
                  ))}
              </Right>
            </CardItem>}
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
                <Button
                  block
                  disabled={this.state.disableRate}
                  style={{ backgroundColor: mainColor }}
                  onPress={this.submitRate.bind(this)}
                >
                  <Text style={{ color: white }}>
                    ثبت امتیاز
                  </Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
        <Button
          block
          style={[form.submitButton, { margin: 10, marginBottom: 20 }]}
          onPress={this.handleMapClick.bind(this)}
        >
          <Text style={{ color: '#FFF' }}>نمایش در نقشه</Text>
        </Button>
      </Container>
    );
  }
}

