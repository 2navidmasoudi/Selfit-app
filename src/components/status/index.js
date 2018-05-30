import React from 'react';
import { StatusBar } from 'react-native';
import { darkColor } from '../../assets/variables/colors';

export default () => (
  <StatusBar backgroundColor={darkColor} barStyle="light-content" />
);

