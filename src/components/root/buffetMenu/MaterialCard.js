import React, { Component } from 'react';
import { Image , WebView, View , TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body , Right, Grid, Row , Toast } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
// import Toast from 'react-native-simple-toast';
import { logError } from '../../../services/log';
import { postBuffetMaterial, deleteBuffetMaterial, getAllBuffetMaterial } from '../../../services/orderMaterial';
class MaterialCard extends Component {
  constructor(props){
    super(props);
    this.state={
      disableAddButton:false,
      disableRemoveButton:false,
    }
  }
  render() {
    const { food } = this.props;
    const ImgSrc = `http://selfit.ir/Resource/Material/${food.picmaterial}`;
    return (
          <TouchableWithoutFeedback onPress={()=>this.onPressHandle(food)}>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left style={{flex:1}} >
                <TouchableWithoutFeedback onPress={()=>Actions.showImage({uri:ImgSrc})}>
                    <Thumbnail square large source={{uri: ImgSrc }} onPress={()=>Actions.showImage({uri:ImgSrc})}/>
                </TouchableWithoutFeedback>
              </Left>
              <Right style={{flex:1}}>
                  <Text style={{marginRight:10 ,textAlign:'right',fontFamily:'IRANSansMobile'}} >{food.namematerial}</Text>
                  <Text style={{marginRight:10,textAlign:'right',fontFamily:'IRANSansMobile'}} numberOfLines={1} ellipsizeMode="tail" note>{food.pricematerial.toLocaleString('fa')} تومان</Text> 
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
    let result = await this._deleteBuffetMaterial(food);
    if(result==1){
      this.setState({disableRemoveButton:true,disableAddButton:false});
      Toast.show({text:`${food.namematerial} از لیست حذف شد.`});
    } else if (result == -6 ) {
      this.setState({disableRemoveButton:true,disableAddButton:false});
      Toast.show({text:`${food.namematerial} قبلا از لیست حذف شده.`});
    }
  }
  async AddButton(){
    let{food}=this.props;
    let result = await this._postBuffetMaterial(food);
    if(result==1){
      this.setState({disableAddButton:true,disableRemoveButton:false});
      Toast.show({text:`${food.namematerial} به لیست اضافه شد.`});
    } else if (result == -6 ) {
      this.setState({disableAddButton:true,disableRemoveButton:false});
      Toast.show({text:`${food.namematerial} قبلا به لیست اضافه شده.`});
    }
  }
  async _postBuffetMaterial(food){
    try {
      let {tokenapi,buffetid,tokenmember} = this.props;
      let result = await postBuffetMaterial(food.idmaterial,buffetid,true,0,tokenmember,tokenapi);
      return result;
        
    } catch (error) {
      logError(error,'_postBuffetMaterial','BuffetMenu/MaterialCard','PostBuffetMaterial');
    }
  }
  async _deleteBuffetMaterial(food){
    try {
      let {tokenapi,buffetid,tokenmember} = this.props;
      let MaterialList = await getAllBuffetMaterial(buffetid,false,tokenmember,tokenapi,30,0,false,0);
      for(i=0;i<MaterialList.length;i++){
        if(food.idmaterial==MaterialList[i].idmaterial){
          console.log('this is it:',MaterialList);
          let result = await deleteBuffetMaterial(MaterialList[i].idmaterial_buffet,tokenmember,tokenapi);
          return result;
        }
      }
      return -6;
    } catch (error) {
      logError(error,'_deleteBuffetMaterial','BuffetMenu/MaterialCard','DeleteBuffetMaterial');
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
export default connect(mapStateToProps,mapDispatchToProps)(MaterialCard);