import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

const Loader = (props) => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent
      animationType="none"
      visible={loading}
      onRequestClose={() => { console.log('close modal'); }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
            animating={loading}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;
