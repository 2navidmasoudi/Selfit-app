import React, {Component} from 'react';
import {Image, WebView, View, TouchableWithoutFeedback, ScrollView, Linking, Platform} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right
} from 'native-base';
import moment from 'moment-jalaali';
import {Actions} from 'react-native-router-flux';
import AppHeader from '../../header';
import HTMLView from 'react-native-htmlview';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import {putVisit, getAllPicGym, postRateGym} from '../../../services/gym';
import {form, header} from '../../../assets/styles/index';
import {Rating} from 'react-native-elements';
moment.loadPersian({dialect: 'persian-modern'});
import {StyleSheet} from 'react-native';

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

class GymDetail extends Component {
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
        await  this._getAllPicGym();
        await  this._putVisit();

    }

    async _putVisit() {
        try {
            let {gymid, tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let json = await putVisit(gymid, tokenmember, tokenapi);
            console.log('put visit? ', json);
        } catch (e) {
            console.log(e);
        }

    }

    async _getAllPicGym() {
        try {
            await this.setState({dataSource: []});
            let {gymid, tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let allPicGym = await getAllPicGym(gymid, tokenmember, tokenapi, 20, 0, true);
            let PicArray = await allPicGym.PicGymList.$values;
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
                }))
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
            console.log("Rating is: " + rate);
            let {tokenmember} = await this.props.user;
            let {tokenapi,idgym} = await this.props;
            let result = await postRateGym(idgym,rate,tokenmember,tokenapi);
            console.log(result,'postRateGym');
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const {datesave, httpserver, pathserver, picgym, descgym, namegym, addressgym, RateNumber, visitgym, telgym} = this.props;
        const m = moment(`${datesave}`, 'YYYY/MM/DDTHH:mm:ss');
        const jM = m.format('jYYYY/jMM');
        const ImgYear = m.jYear();
        const ImgMonth = m.jMonth() + 1;
        const ImgSrc = `${httpserver}${pathserver}${ImgYear}/${ImgMonth}/${picgym}`;
        const htmlContent = `<div>${descgym}</div>`;
        // const htmlContent = `${descgym}`;

        const slide = this.state.slideready ?
            <Swiper style={styles.wrapper} height={200} showsButtons={true} loop={true} autoplay={true}
                    autoplayTimeout={1.5}
            >
                {this.state.dataSource.map((pic, index) => (
                    <TouchableWithoutFeedback key={index} style={styles.slide1}
                                              onPress={() => Actions.showImage({images: this.state.dataSource})}>
                        <Image style={{
                            height: 200, width: null, resizeMode: 'cover',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} source={{uri: pic.url}}/>
                    </TouchableWithoutFeedback>
                ))}

            </Swiper>
            :
            <TouchableWithoutFeedback onPress={() => Actions.showImage({uri: ImgSrc})}>
                <Image style={{flex: 1, height: 220, width: null}} resizeMode='contain' source={{uri: ImgSrc}}/>
            </TouchableWithoutFeedback>;

        return (
            <Container>
                <AppHeader rightTitle="باشگاه یاب" backButton={"flex"}/>
                <Content>

                    <Card style={{flex: 0}}>
                        <CardItem>
                            <Left style={{flex: 1}}>
                                <Body>
                                <Text style={{
                                    marginRight: 10,
                                    textAlign: 'right',
                                    fontFamily: 'IRANSansMobile'
                                }}>باشگاه {namegym}</Text>
                                <Text style={{marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile'}}
                                      note>{jM}</Text>
                                </Body>
                                <TouchableWithoutFeedback onPress={() => Actions.showImage({uri: ImgSrc})}>
                                    <Thumbnail source={{uri: ImgSrc}}/>
                                </TouchableWithoutFeedback>
                            </Left>
                            {/* <Right style={{flex:1}}>
                    </Right> */}
                        </CardItem>
                        <CardItem>
                            {slide}
                        </CardItem>
                        <CardItem>
                            <ScrollView style={{flex: 1}}>
                                <Text
                                    style={{textAlign: 'right', fontFamily: 'IRANSansMobile'}}>آدرس: {addressgym}</Text>
                                <HTMLView
                                    value={htmlContent}
                                    stylesheet={{flex: 1, textAlign: 'right'}}/>

                                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Text>{telgym}</Text>
                                    <Text style={{fontFamily: 'IRANSansMobile',}}>تلفن: </Text>
                                </View>
                            </ScrollView>

                        </CardItem>
                        <CardItem>
                            <Left style={{flex: 1}}>
                                <Text>تعداد بازدید: {visitgym}</Text>
                            </Left>
                            <Right style={{flex: 1}}>
                                <Rating
                                    ratingCount={5}
                                    fractions={2}
                                    startingValue={RateNumber}
                                    imageSize={30}
                                    onFinishRating={this.ratingCompleted.bind(this)}
                                    style={{ paddingVertical: 10 }}
                                />
                                {/*<AirbnbRating*/}
                                    {/*count={11}*/}
                                    {/*reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}*/}
                                    {/*defaultRating={11}*/}
                                    {/*size={20}*/}
                                {/*/>*/}
                            </Right>

                        </CardItem>

                    </Card>

                </Content>
                <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <Button block style={[form.submitButton, {margin: 10, marginBottom: 20}]}
                            onPress={this.handleMapClick.bind(this)}>
                        <Text style={form.submitText}>نمایش در نقشه</Text>
                    </Button>
                </View>
            </Container>
        );
    }

    handleMapClick() {
        let {latgym, longgym} = this.props;
        // let url = `https://waze.com/ul?ll=${latgym},${longgym}`;
        let url = Platform.OS === 'ios' ? `http://maps.apple.com/?ll=${latgym},${longgym}` : `geo:${latgym},${longgym}`;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        tokenapi: state.gym.tokenapi,
    }
};

export default connect(mapStateToProps, null)(GymDetail);