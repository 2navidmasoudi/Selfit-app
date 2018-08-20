import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Body, Button, Card, CardItem, Container, Content, Left, Right, Thumbnail } from 'native-base';
import HTMLView from 'react-native-htmlview';
import Carousel from 'react-native-snap-carousel';
import { Rating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { openMap } from 'react-native-open-map';
import moment from 'moment-jalaali';
import AppHeader from '../../header';
import { putCheckToken } from '../../../services/index';
import { receiveGym, tokenGym } from '../../../redux/actions';
import { getAllPicGym, getSingleGym } from '../../../services/gym';
import { Modal, Text } from '../../Kit';
import { mainColor } from '../../../assets/variables/colors';
import { persianNumber } from '../../../utils/persian';
import { htmlStyle } from '../../../assets/styles/html';
import { form } from '../../../assets/styles';
import { helpDoneMyGym } from '../../../redux/actions/help';
import Pic1 from '../../../assets/helpPics/MyGym/GymOther.png';
import Pic2 from '../../../assets/helpPics/MyGym/GymWaze.png';
import Pic3 from '../../../assets/helpPics/MyGym/GymEdit.png';


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
  gym: state.gym.GymList,
  gymid: state.gym.gymid,
  help: state.help.myGym,
}), {
  tokenGym,
  receiveGym,
  helpDoneMyGym
})
export default class MyGym extends Component {
  state = {
    ImgSrc: null,
    slideready: false,
    position: 1,
    interval: null,
    dataSource: [],
    isVisible: false,
    rate: null,
    disableRate: false,
    ModalNumber: 0,
  };
  componentWillMount() {
    if (!this.props.help) {
      this.setState({ ModalNumber: 1 });
    }
    const { tokenmember, tokenapi } = this.props.user;
    putCheckToken(tokenmember, tokenapi);
    this.getInfo();
  }
  onPressHandler() {
    Actions.editGym({ gym: this.props.gym });
  }
  async getInfo() {
    await this.props.tokenGym('selfit.gym');
    await this._getSingLeGym();
    await this._getAllPicGym();
  }
  async _getSingLeGym() {
    try {
      const { tokenapi, gymid } = await this.props;
      const { tokenmember } = await this.props.user;
      const gymInfo = await getSingleGym(gymid, tokenmember, tokenapi);
      if (!gymInfo) return;
      console.log(gymInfo, 'gymInfo');
      this.props.receiveGym(gymInfo, 0);
    } catch (e) {
      console.log(e);
    }
  }
  async _getAllPicGym() {
    try {
      await this.setState({ dataSource: [] });
      const { gymid, tokenapi } = await this.props;
      const { tokenmember } = await this.props.user;
      const PicArray = await getAllPicGym(gymid, tokenmember, tokenapi, 50, 0, null);
      if (!PicArray.length) return;
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
  handleMapClick() {
    const { latgym, longgym } = this.props.gym;
    openMap({
      latitude: latgym,
      longitude: longgym,
      title: 'انتخاب مسیر یاب',
      cancelText: 'انصراف',
    });
  }
  helpDone = () => this.props.helpDoneMyGym();
  renderItem = ({ item, index }) => (
    <View key={index} style={styles.slide}>
      <Image style={{ flex: 1, width: null }} resizeMode="cover" source={{ uri: item.url }} />
    </View>
  );
  render() {
    const {
      datesave, httpserver, pathserver, picgym,
      descgym, namegym, addressgym, activegym, numbertuitiongym,
      RateNumber, visitgym, telgym, tuitiongym
    } = this.props.gym;
    const m = datesave ? moment(`${datesave}`, 'YYYY/MM/DDTHH:mm:ss') : moment();
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth() + 1;
    const ImgSrc = `${httpserver}${pathserver}${ImgYear}/${ImgMonth}/${picgym}`;
    console.log(ImgSrc);
    const htmlContent = descgym ? persianNumber(`${descgym.replace(/(\r\n|\n|\r)/gm, '')}`) : '<p>فاقد توضیحات.</p>';
    const tuitionGym = tuitiongym ? persianNumber(`${tuitiongym.toLocaleString()}`) : '؟';
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
    const TELL = telgym ? persianNumber(`${telgym}`) : '؟';
    const numbertuitionGym = numbertuitiongym ? persianNumber(`${numbertuitiongym}`) : '؟';
    const VISIT = visitgym ? persianNumber(`${visitgym}`) : '؟';
    return (
      <Container>
        <Modal
          isVisible={this.state.ModalNumber === 1}
          onModalHide={() => this.setState({ ModalNumber: 2 })}
          exitText="ممنون"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 100,
            }}
            source={Pic1}
            resizeMode="contain"
          />
          <Text>
            با زدن این دکمه میتونی باشگاه های دور اطراف خودت
            رو ببینی و بررسی کنی.
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 2}
          onModalHide={() => this.setState({ ModalNumber: 3 })}
          exitText="خیلی خب"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 100,
            }}
            source={Pic2}
            resizeMode="contain"
          />
          <Text>
            با زدن این دکمه مسیریاب هایی بهت نمایش داده میشه،
            با زدن هر کدوم به باشگاهت برو!
          </Text>
        </Modal>
        <Modal
          isVisible={this.state.ModalNumber === 3}
          onModalHide={this.helpDone}
          exitText="تمام"
          onExit={() => this.setState({ ModalNumber: 0 })}
        >
          <Image
            style={{
              width: 250,
              height: 100,
            }}
            source={Pic3}
            resizeMode="contain"
          />
          <Text>
            با زدن این دکمه میتونی باشگاه خودت رو ویرایش کنی،
            عکس شاخص و جزئیات باشگاه رو عوض کنی و ...
          </Text>
        </Modal>
        <AppHeader rightTitle="باشگاه من" />
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
                  >{persianNumber(`${jM}`)}
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
                  <Text>{TELL}</Text>
                  <Text>تلفن: </Text>
                </View>
                <Text>شهریه باشگاه: {tuitionGym} تومان</Text>
                <Text>فعالیت باشگاه: {activegym ? 'فعال' : 'غیر فعال'}</Text>
                <Text>ظرفیت باشگاه: {numbertuitionGym}</Text>
              </ScrollView>
            </CardItem>
            <CardItem>
              <Left style={{ flex: 1 }}>
                <Text>تعداد بازدید: {VISIT}</Text>
              </Left>
              <Right style={{ flex: 1 }}>
                {RateNumber && <Rating
                  readonly
                  fractions={1}
                  startingValue={RateNumber}
                  imageSize={30}
                  style={{ paddingVertical: 10 }}
                />}
              </Right>
            </CardItem>
            <CardItem style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button
                style={{ backgroundColor: mainColor }}
                onPress={() => Actions.gym()}
              >
                <Text style={{ color: '#FFF', paddingHorizontal: 5 }}>
                  نمایش باشگاه های اطراف
                </Text>
              </Button>
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
        {this.props.gymid &&
        <Button
          full
          style={{ backgroundColor: mainColor }}
          onPress={this.onPressHandler.bind(this)}
        >
          <Text style={{ color: '#FFF' }}>ویرایش باشگاه</Text>
        </Button>}
      </Container>
    );
  }
}
