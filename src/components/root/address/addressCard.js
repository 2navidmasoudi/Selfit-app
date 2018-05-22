import React, { Component } from 'react';
import { Image , View , TouchableHighlight } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body , Right } from 'native-base';
import moment from 'moment-jalaali';
import { Actions } from 'react-native-router-flux';
import { activeAddress } from '../../../services';
import { connect } from 'react-redux';

class AddressCard extends Component {
  render() {
    const { address } = this.props;

    return (
          <TouchableHighlight onPress={()=>this.onPressHandle(address)}>
          <Card style={{flex: 0}}>
            <CardItem>
                <Left style={{flex:1}} >
                    <Icon name="pin"/>
                </Left>
                <Body  style={{flex:1}}>
                    
                </Body>
                <Right style={{flex:1}}>
                    {/* <Thumbnail square large source={{uri: ImgSrc }} /> */}
                    <Text style={{marginRight:10 ,textAlign:'right',fontFamily:'IRANSansMobile'}}>{address.titleaddressmember?Base64.decode(address.titleaddressmember):'نام وارد نشده.'}</Text>
                </Right>
            </CardItem>
          </Card>
          </TouchableHighlight>
        );
    }
    async onPressHandle(address){
        // Actions.gymDetail(address);

        let {tokenmember,tokenapi} = await this.props.user;
        let result = await activeAddress(address.idaddressmember,tokenmember,tokenapi);
        await console.log('result: ', result);
        if (result===1) {
            if(this.props.roadTo=='Store'){
                Actions.factorProduct({address})
            } else {
                Actions.factorBuffet({address});
            }
        }
        console.log(address);
        
        
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        roadTo: state.basket.roadTo,
    }
};

export default connect(mapStateToProps)(AddressCard);