import React from 'react';
import {View} from 'react-native';
import {Icon} from 'native-base';
import {styles} from './style';
import Swiper from 'react-native-swiper';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import MyGym from '../../Main/MyGym';
import Coach from '../../Main/Coach';
import {anim0, anim1} from "./anim";
import * as Animatable from 'react-native-animatable';

export default class MemberGrid extends React.Component {
    state = {
        icon: 'star',
        color: '#FFC700'
    };

    changeIcon(i) {
        switch (i) {
            case 0:
                this.setState({icon: 'musical-notes', color: '#B200FF'})
                break;
            case 1:
                this.setState({icon: 'cart', color: '#FF1500'});
                break;
            case 2:
                this.setState({icon: 'star', color: '#FFC700'});
                break;
            case 3:
                this.setState({icon: 'medal', color: '#FFD700'});
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={true} loop={false} index={2}
                    onIndexChanged={(i) => this.changeIcon(i)}
                    dot={<View style={styles.nonActive}/>}
                    activeDot={<Animatable.View animation={anim0}
                                                easing="ease-out"
                                                iterationCount="infinite"
                                                useNativeDriver
                                                direction="alternate"
                                                style={styles.activeDot}>
                        <Icon name={this.state.icon} style={{color: this.state.color}}/>
                    </Animatable.View>}
                    nextButton={<Animatable.Text style={styles.btn}
                                                 animation={anim1}
                                                 iterationCount="infinite"
                                                 useNativeDriver
                                                 duration={2000}
                                                 direction="reverse">›</Animatable.Text>}
                    prevButton={<Animatable.Text style={styles.btn}
                                                 animation={anim1}
                                                 useNativeDriver
                                                 iterationCount="infinite"
                                                 duration={2000}>‹</Animatable.Text>}>
                <View style={styles.slide1}>
                    <Music/>
                </View>
                <View style={styles.slide1}>
                    <Store/>
                </View>
                <View style={styles.slide1}>
                    <MyGym/>
                </View>
                <View style={styles.slide1}>
                    <Coach/>
                </View>
            </Swiper>
        );
    }
}