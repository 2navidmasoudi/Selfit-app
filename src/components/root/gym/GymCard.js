import React, {Component} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
    Card,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Right
} from 'native-base';
import moment from 'moment-jalaali';
import {Actions} from 'react-native-router-flux';
import {Rating} from 'react-native-elements';

export default class GymCard extends Component {
    render() {
        const {gym} = this.props;
        const m = moment(`${gym.datesave}`, 'YYYY/MM/DDTHH:mm:ss');
        const jM = m.format('jYYYY/jMM');
        const ImgYear = m.jYear();
        const ImgMonth = m.jMonth() + 1;
        const ImgSrc = `${gym.httpserver}${gym.pathserver}${ImgYear}/${ImgMonth}/${gym.picgym}`;
        return (
            <TouchableWithoutFeedback onPress={() => this.onPressHandle(gym)}>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Left style={{flex: 1}}>
                            <Thumbnail square large source={{uri: ImgSrc}}/>
                        </Left>
                        <Right style={{flex: 2}}>
                            <Text style={{
                                marginRight: 10,
                                textAlign: 'right',
                                fontFamily: 'IRANSansMobile'
                            }}>باشگاه {gym.namegym}</Text>
                            <Text style={{marginRight: 10, textAlign: 'right', fontFamily: 'IRANSansMobile'}}
                                  numberOfLines={1} ellipsizeMode="tail" note>{gym.addressgym}</Text>
                            <Rating readonly fractions={1} startingValue={gym.RateNumber || 5} imageSize={10}
                                    style={{marginRight: 10}}/>
                        </Right>
                    </CardItem>
                </Card>
            </TouchableWithoutFeedback>
        );
    }

    onPressHandle(gym) {
        Actions.gymDetail(gym);
        // console.log(gym);

    }
}