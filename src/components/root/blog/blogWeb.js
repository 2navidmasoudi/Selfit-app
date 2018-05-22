import React, { Component } from 'react';
import { Image , WebView, View , TouchableWithoutFeedback , ScrollView , Linking , Platform, Share} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body , Right } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../header';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import { putVisit, getAllPicGym } from '../../../services/gym';
import { form , header } from '../../../assets/styles/index';
export default class BlogWeb extends Component {
    render(){
        const { blog } = this.props;
        const m = moment(`${blog.datesave}`,'YYYY/MM/DDTHH:mm:ss');
        const datesaveblog = moment(`${blog.datesaveblog}`,'YYYY/MM/DDTHH:mm:ss');
        
        const jM = m.format('jYYYY/jMM');
        const jS = datesaveblog.format('jYYYY/jMM');
    
        const ImgYear = m.jYear();
        const ImgMonth = m.jMonth()+1;
        const ImgSrc = `${blog.httpserver}${blog.pathserver}${ImgYear}/${ImgMonth}/${blog.picblog}`;
        const htmlContent = `<div>${blog.descblog}</div>`;
        return(
            <Container>
            <AppHeader rightTitle="بیشتر بدانید" backButton={"flex"}/>
            <Content>
                
            <Card style={{flex: 0}}>
                <CardItem>
                    <Left style={{flex:1}} >
                            <Body>
                                <Text style={{marginRight:10 ,textAlign:'right',fontFamily:'IRANSansMobile'}} > {blog.titleblog}</Text>
                                {/* <Text style={{marginRight:10,textAlign:'right',fontFamily:'IRANSansMobile'}} note>{jM}</Text> */}
                            </Body>
                            <TouchableWithoutFeedback onPress={()=>Actions.showImage({uri:ImgSrc})}>
                                <Thumbnail  source={{uri: ImgSrc }}  />
                            </TouchableWithoutFeedback>
                    </Left>
                    {/* <Right style={{flex:1}}>
                    </Right> */}
                </CardItem>
                <CardItem>
                    <TouchableWithoutFeedback onPress={()=>Actions.showImage({uri:ImgSrc})}>
                        <Image style={{flex:1,height:220,width:null}} resizeMode='contain' source={{uri: ImgSrc }}/>
                    </TouchableWithoutFeedback>
                </CardItem>
                <CardItem>
                    <ScrollView style={{ flex: 1 }}>
                        <HTMLView 
                        value={htmlContent} 
                        stylesheet={{flex:1,textAlign:'right'}}/>
                    </ScrollView>    
                    
                </CardItem>
                {/* <CardItem>
                    <Left style={{flex:1}}>
                        <Text>تعداد بازدید: {}</Text>
                    </Left>
                    <Right style={{flex:1}}>
                        <Button transparent textStyle={{color: '#87838B'}}>
                            <Icon name="md-star"/>
                            <Text>امتیاز: 5/{}</Text>
                        </Button>
                    </Right>
                    
                </CardItem> */}
            
            </Card>

            </Content>
            <View style={{flexDirection:'column',justifyContent:'flex-end'}}> 
                <Button block style={[form.submitButton , {margin : 10, marginBottom:20}]} onPress={()=>Share.share({message:`http://selfit.ir/#/Home/SingleBlog/${blog.blogid}`,title:`${blog.titleblog}`})}>
                    <Text style={form.submitText}>اشتراک با دوستان</Text>
                </Button>
            </View>
            </Container>
        )
    }
}
