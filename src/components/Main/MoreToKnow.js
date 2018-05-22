import React, { Component } from 'react';
import { Icon } from 'native-base';
import {TouchableNativeFeedback,View} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class MoreToKnow extends Component{
    render() {
        return(
            <TouchableNativeFeedback onPress={()=>Actions.blogRoot()}>
                <View style={{justifyContent:'center',alignItems:'center',height:50,width:50,backgroundColor:'black',opacity:0.7,borderBottomRightRadius:10}}>
                    <Icon  name="school" onPress={()=>Actions.blogRoot()} style={{color:'white'}} fontSize={30}
                    />
                </View>
            </TouchableNativeFeedback>

        )
    }
    
} 
    
