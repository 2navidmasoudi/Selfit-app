import React, { Component } from 'react';
import { Image , WebView, View , TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body , Right, Grid, Row, Switch } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logError } from '../../../services/log';
import { putActiveMenuFood } from '../../../services/buffet';
class ActiveFood extends Component {

    constructor(props){
        super(props);
        this.state={
            Active:this.props.food.active,
        }
    }
    async handleSwitch(value){
        let result = await this._activeMenuFood(value);
        console.log('handleSwitch:',result);
        if (result == 1)
        this.setState({Active:value})
    }
    async _activeMenuFood(active){
        try {
            let {tokenapi,buffetid,tokenmember} = await this.props;
            let {idmenufood_buffet} = await this.props.food;
            let result = await putActiveMenuFood(buffetid,idmenufood_buffet,active,tokenmember,tokenapi);
            console.log('_activeMenuFood:',result);
            
            if (result == 1) return 1;
        } catch (error) {
            console.log(error);
            logError(error,'putActiveMenuFood','BuffetMenu/activeMenuFood','_activeMenuFood');
        }
    }
    render() {
        const { food } = this.props;
        const m = moment(`${food.datesave}`,'YYYY/MM/DDTHH:mm:ss');
        const jM = m.format('jYYYY/jMM');
        const ImgYear = m.jYear();
        const ImgMonth = m.jMonth()+1;
        const ImgSrc = `${food.httpserver}${food.pathserver}${ImgYear}/${ImgMonth}/${food.picmenufood}`;
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
                    <Text style={{marginRight:10 ,textAlign:'right',fontFamily:'IRANSansMobile'}} >{food.namemenufood}</Text>
                    <Text style={{marginRight:10,textAlign:'right',fontFamily:'IRANSansMobile'}} numberOfLines={1} ellipsizeMode="tail" note>{food.pricemenufood.toLocaleString('fa')} تومان</Text> 
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
export default connect(mapStateToProps,mapDispatchToProps)(ActiveFood);