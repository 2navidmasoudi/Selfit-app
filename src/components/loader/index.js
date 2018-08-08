import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { Text } from '../Kit';
import { mainColor } from '../../assets/variables/colors';

export default function Loader({ loading }) {
  return (
    loading
      ?
        <View style={styles.view}>
          <Spinner color={mainColor} />
          <Text>درحال دریافت اطلاعات</Text>
          <Text>لطفا چند لحظه صبر کنید...</Text>
        </View>
      :
        <View style={styles.view}>
          <Text>اطلاعاتی دریافت نشد.</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};
