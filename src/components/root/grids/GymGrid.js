import React from 'react';
import {View} from 'react-native';
import {Container, Icon} from 'native-base';
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
                this.setState({icon: 'musical-notes', color: '#B200FF'});
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
            <Container styele={styles.mainContainer}>
                <View style={styles.mainRowWrapper}>
                    <View style={{flex: 1, backgroundColor: '#FFC700'}}>
                        <MyGym/>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#FFD700'}}>
                        <Coach/>
                    </View>
                </View>
                <View style={styles.mainRowWrapper}>
                    <View style={{flex: 1, backgroundColor: '#B200FF'}}>
                        <Music/>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#FF1500'}}>
                        <Store/>
                    </View>
                </View>
            </Container>
        );
    }
}