import React, { Component } from 'react';
import { Image , WebView, View , TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body , Right, Grid, Row,Toast } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getMenuFood, postMenuFoodBuffet, deleteMenuFood } from '../../../services/buffet';
import { logError } from '../../../services/log';
class FoodCard extends Component {
  constructor(props){
    super(props);
    this.state={
      disableAddButton:false,
      disableRemoveButton:false,
    }
  }
  render() {
    const { food } = this.props;
    const m = moment(`${food.datesave}`,'YYYY/MM/DDTHH:mm:ss');
    const jM = m.format('jYYYY/jMM');
    const ImgYear = m.jYear();
    const ImgMonth = m.jMonth()+1;
    const ImgSrc = `${food.httpserver}${food.pathserver}${ImgYear}/${ImgMonth}/${food.picmenufood}`;
    return (
          <TouchableWithoutFeedback onPress={()=>this.onPressHandle(food)}>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left style={{flex:1}} >
                <Thumbnail square large source={{uri: ImgSrc }} />
              </Left>
              <Right style={{flex:1}}>
                  <Text style={{marginRight:10 ,textAlign:'right',fontFamily:'IRANSansMobile'}} >{food.namemenufood}</Text>
                  <Text style={{marginRight:10,textAlign:'right',fontFamily:'IRANSansMobile'}} numberOfLines={1} ellipsizeMode="tail" note>{food.pricemenufood.toLocaleString('fa')} تومان</Text> 
              </Right>
            </CardItem>
            <CardItem>
              <Grid>
                <Row>
                <Button danger disabled={this.state.disableRemoveButton} style={{flex:1,marginRight:5}} onPress={this.RemoveButton.bind(this)}>
                    <Text style={{flex:1,textAlign:'center'}}>حذف از لیست</Text>
                </Button>
                <Button success disabled={this.state.disableAddButton} style={{flex:1,marginLeft:5}} onPress={this.AddButton.bind(this)}>
                    <Text style={{flex:1,textAlign:'center'}}>اضافه به لیست!</Text>
                </Button>
                </Row>
              </Grid>
            </CardItem>
          </Card>
          </TouchableWithoutFeedback>
    );
  }
  onPressHandle(food){
    console.log(food);
    
  }
  async RemoveButton(){
    let{food}=this.props;
    let result = await this._deleteMenuFood(food);
    if(result==1){
      this.setState({disableRemoveButton:true,disableAddButton:false});
      Toast.show({text:`${food.namemenufood} از لیست حذف شد.`});
    } else if (result == -6 ) {
      this.setState({disableRemoveButton:true,disableAddButton:false});
      Toast.show({text:`${food.namemenufood} قبلا از لیست حذف شده.`});
    }

  }
  async AddButton(){
    let{food}=this.props;
    let result = await this._postMenuFood(food);
    if(result==1){
      this.setState({disableAddButton:true,disableRemoveButton:false});
      Toast.show({text:`${food.namemenufood} به لیست اضافه شد.`});
    } else if (result == -6 ) {
      this.setState({disableAddButton:true,disableRemoveButton:false});
      Toast.show({text:`${food.namemenufood} قبلا به لیست اضافه شده.`});
    }
    
  }
  async _postMenuFood(food){
    try {
      let {tokenapi,buffetid,tokenmember} = this.props;
      let result = await postMenuFoodBuffet(buffetid,food.idmenufood,true,tokenmember,tokenapi);
      console.log(result);
      
      return result;
    } catch (error) {
      logError(error,'_postMenuFood','BuffetMenu/FoodCard','postMenuFoodBuffet');
    }
  }
  async _deleteMenuFood(food){
    try {
      let {tokenapi,buffetid,tokenmember} = this.props;
      let MenuFoodList = await getMenuFood(buffetid,0,tokenmember,tokenapi,30,0,false,0);
      console.log(MenuFoodList);
      
      for(i=0;i<MenuFoodList.length;i++){
        if(food.idmenufood==MenuFoodList[i].idmenufood){
          console.log('this is it:',MenuFoodList[i]);
          let result = await deleteMenuFood(MenuFoodList[i].idmenufood_buffet,tokenmember,tokenapi);
          console.log(result);
          
          return result;
        }
      }
      return -6;
    } catch (error) {
      console.log(error);
      
      logError(error,'_deleteMenuFood','BuffetMenu/FoodCard','DeleteBuffetMaterial');
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    tokenmember: state.user.tokenmember,
    tokenapi: state.buffet.tokenapi,
    buffetid: state.buffet.buffetid,
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(FoodCard);