import React, {Component} from 'react';
import {StatusBar} from 'react-native';

export default class Status extends Component {
    render() {
        return (
            <StatusBar backgroundColor="#212121" barStyle='light-content'/>
        )
    }
}