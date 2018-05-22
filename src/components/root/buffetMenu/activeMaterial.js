import React, { Component } from 'react';
import { Image , WebView, View , TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body , Right, Grid, Row, Switch } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logError } from '../../../services/log';
import { postBuffetMaterial, deleteBuffetMaterial, putActiveBuffetMaterial } from '../../../services/orderMaterial';
class ActiveMaterial extends Component {
    constructor(props){
        super(props);
        this.state={
            Active:this.props.food.active_material_buffet,
        }
    }
    async handleSwitch(value){
        let result = await this._activeBuffetMaterial(value);
        console.log('handleSwitch:',result);
        if (result == 1)
        this.setState({Active:value})
    }
    async _activeBuffetMaterial(active){
        try {
            let {tokenapi,buffetid,tokenmember} = await this.props;
            let {idmaterial_buffet} = await this.props.food;
            let result = await putActiveBuffetMaterial(buffetid,idmaterial_buffet,active,tokenmember,tokenapi);
            console.log('putActiveBuffetMaterial:',result);
            
            if (result == 1) return 1;
        } catch (error) {
            console.log(error);
            logError(error,'putActiveBuffetMaterial','BuffetMenu/activeMaterial','_activeBuffetMaterial');
        }
    }
    render() {
        const { food } = this.props;
        const ImgSrc = `http://selfit.ir/Resource/Material/${food.picmaterial}`;
        const YesOrNo = this.state.Active ? 'فعال در منو' : 'غیر فعال در منو';
        return (
            <TouchableWithoutFeedback onPress={()=>this.onPressHandle(food)}>
            <Card style={{flex: 0}}>
                <CardItem>
                <Left style={{flex:1}} >
                    <TouchableWithoutFeedback onPress={()=>Actions.showImage({uri:ImgSrc})}>
                        <Thumbnail square small source={{uri: ImgSrc }} onPress={()=>Actions.showImage({uri:ImgSrc})}/>
                    </TouchableWithoutFeedback>
                    <Switch 
                        value={this.state.Active}
                        onValueChange={(value)=>this.handleSwitch(value)}
                        />
                    <Text>{YesOrNo}</Text>
                </Left>
                <Right style={{flex:1}}>
                    <Text style={{marginRight:10 ,textAlign:'right',fontFamily:'IRANSansMobile'}} >{food.namematerial}</Text>
                    <Text style={{marginRight:10,textAlign:'right',fontFamily:'IRANSansMobile'}} numberOfLines={1} ellipsizeMode="tail" note>{food.pricematerial.toLocaleString('fa')} تومان</Text> 
                </Right>
                </CardItem>
                {/* <CardItem>
                <Grid>
                    <Row>
                    <Button danger style={{flex:1,marginRight:5}} onPress={this.RemoveButton.bind(this)}>
                        <Text style={{flex:1,textAlign:'center'}}>حذف از لیست</Text>
                    </Button>
                    <Button success style={{flex:1,marginLeft:5}} onPress={this.AddButton.bind(this)}>
                        <Text style={{flex:1,textAlign:'center'}}>اضافه به لیست!</Text>
                    </Button>
                    </Row>
                </Grid>
                </CardItem> */}
            </Card>
            </TouchableWithoutFeedback>
        );
    }
    onPressHandle(food){
        console.log(food);
        
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
export default connect(mapStateToProps,mapDispatchToProps)(ActiveMaterial);