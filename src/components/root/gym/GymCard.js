import React, { Component } from 'react';
import { Image , WebView, View , TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body , Right } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';

export default class GymCard extends Component {
  render() {
    const { gym } = this.props;
    const m = moment(`${gym.datesave}`,'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth()+1;
    const ImgSrc = `${gym.httpserver}${gym.pathserver}${ImgYear}/${ImgMonth}/${gym.picgym}`;
    return (
          <TouchableWithoutFeedback onPress={()=>this.onPressHandle(gym)}>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left style={{flex:1}} >
                <Thumbnail square large source={{uri: ImgSrc }} />
              </Left>
            
              <Right style={{flex:1}}>
                
                
                  <Text style={{marginRight:10 ,textAlign:'right',fontFamily:'IRANSansMobile'}} >باشگاه {gym.namegym}</Text>
                  <Text style={{marginRight:10,textAlign:'right',fontFamily:'IRANSansMobile'}} numberOfLines={1} ellipsizeMode="tail" note>{gym.addressgym}</Text>
                  <View style={{justifyContent:'flex-end'}}>
                  {/*<Button transparent textStyle={{color: '#87838B'}}>*/}
                    {/*<Icon name="md-star"/>*/}
                    {/*<Text>امتیاز: 5/{gym.RateNumber}</Text>*/}
                  {/*</Button>*/}
                  </View>
                
                
              </Right>
              
            </CardItem>
          </Card>
          </TouchableWithoutFeedback>
    );
  }
  onPressHandle(gym){
    Actions.gymDetail(gym);
    // console.log(gym);
    
  }
}