import React from 'react';
import { Animated , Dimensions } from 'react-native';
import { View , Button , Text , Icon } from 'native-base';
import {LightBoxStyle} from '../../assets/styles/sign';
import { Actions } from 'react-native-router-flux';
const {height : deviceHeight , width : deviceWidth} = Dimensions.get('window');

export default class BaseLightBox extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            opacity : new Animated.Value(0), 
        }
    }
    componentWillMount(){
        Animated.timing (this.state.opacity , {
            toValue : 1,
            duration : 200,
        }).start();
    }
    close(){
        Animated.timing(this.state.opacity , {
            toValue : 0 ,
            duration : 200,
        }).start(Actions.pop);
    }

    _renderLightBox(){
        const {children,verticalPercent = 1,horizontalPercent=1} = this.props;
        const width= verticalPercent ? deviceWidth * verticalPercent : deviceWidth;
        const height= horizontalPercent ? deviceHeight * horizontalPercent : deviceHeight;
        return(
            <View style={[LightBoxStyle.viewStyle,{width,height}]}>
                {children}
                <Button transparent style={LightBoxStyle.closeButton} onPress={()=>this.close()}> 
                    <Icon name='md-close-circle' style={LightBoxStyle.closeIcon}/>
                </Button>

            </View>
        )
    }

    render(){
        return(
            <Animated.View style={[LightBoxStyle.container,{opacity:this.state.opacity}]}>
                {this._renderLightBox()}
            </Animated.View>
        )
    }
}