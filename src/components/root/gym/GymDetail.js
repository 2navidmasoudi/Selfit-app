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
import {putVisit, getAllPicGym} from '../../../services/gym';
import {form, header} from '../../../assets/styles/index';

moment.loadPersian({dialect: 'persian-modern'});
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    wrapper: {flex:1},
    slide1: {
        flex: 1,
        width: 300,
        height: 200,
        // backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

class GymDetail extends Component {
    constructor() {
        super();
        this.state = {
            ImgSrc: null,
            slideready: false,
            position: 1,
            interval: null,
            dataSource: [],
        }
    }

    componentWillMount() {
        this._putVisit();
        this._getAllPicGym();
        Linking.getInitialURL().then((url) => {
            if (url) {
                console.log('Initial url is: ' + url);
            }
        }).catch(err => console.error('An error occurred', err));

    }

    componentWillUnmount() {
        // clearInterval(this.state.interval);
    }

    async _putVisit() {
        let {gymid, tokenapi} = await this.props;
        let {tokenmember} = await this.props.user;
        let json = await putVisit(gymid, tokenmember, tokenapi);
        console.log('put visit? ', json);
    }

    async _getAllPicGym() {
        try {
            let {gymid, tokenapi} = await this.props;
            let {tokenmember} = await this.props.user;
            let allPicGym = await getAllPicGym(gymid, tokenmember, tokenapi, 20, 0, true);
            let PicArray = await allPicGym.PicGymList.$values;
            console.log('pics', PicArray);
            for (i = 0; i < PicArray.length; i++) {
                const m = moment(`${PicArray[i].datesave}`, 'YYYY/MM/DDTHH:mm:ss');
                const ImgYear = m.jYear();
                const ImgMonth = m.jMonth() + 1;
                const ImgSrc = `${PicArray[i].httpserver}${PicArray[i].pathserver}${ImgYear}/${ImgMonth}/${PicArray[i].picgym}`;
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
            // this.setState({
            //     interval: setInterval(() => {
            //         this.setState({
            //             position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
            //         });
            //     }, 3000)
            // });


        } catch (err) {
            console.log(err);
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
            <Swiper style={styles.wrapper} showsButtons={true} loop={true}>
                {this.state.dataSource.map((pic,index)=>(
                    <View style={styles.slide1}
                    key={index}>
                        <Image style={{height:200,width:300}} source={{uri:pic.url}}/>
                    </View>
                ))}

            </Swiper>
            // <Slideshow
            // dataSource={this.state.dataSource}
            // position={this.state.position}
            // onPositionChanged={position => this.setState({ position })}
            // onPress={(image) => Actions.showImage({images:this.state.dataSource})}
            // />
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
                                <Button transparent textStyle={{color: '#87838B'}}>
                                    <Icon name="md-star"/>
                                    <Text>امتیاز: 5/{RateNumber}</Text>
                                </Button>
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