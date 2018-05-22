import React, {Component} from 'react';
import {View} from 'react-native';
import {Container} from 'native-base';
import {styles} from './style';
import Store from '../../Main/Store';
import Music from '../../Main/Music';
import Buffet from '../../Main/Buffet';
import Gym from '../../Main/Gym';
import Coach from '../../Main/Coach';
export default class MemberGrid extends Component {
    render() {
        return (
            <Container styele={styles.mainContainer}>
                <View style={styles.mainRowWrapper}>
                    <View style={{flex:1,backgroundColor:'#37FF00'}}>
                    <Buffet/>
                    </View>
                    <View style={{flex:1,backgroundColor:'#00A1FF'}}>
                    <Gym/>
                    </View>
                </View>
                <View style={styles.mainRowWrapper}>
                    <View style={{flex:1,backgroundColor:'#FFD700'}}>
                    <Coach/>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, backgroundColor: '#FF1500'}}>
                            <Store/>
                        </View>
                        <View style={{flex: 1, backgroundColor: '#B200FF'}}>
                            <Music/>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}