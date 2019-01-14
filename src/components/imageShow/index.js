import React from 'react';
import { Modal } from 'react-native';
import { Fab, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';
import { mainColor } from '../../assets/variables/colors';

export default function imageShow({ images, uri }) {
  const image = images || [{ url: uri }];
  return (
    <Modal
      animationType="fade"
      onRequestClose={() => Actions.pop()}
      visible
      transparent
    >
      <ImageViewer imageUrls={image} onSwipeDown={() => Actions.pop()} />
      <Fab
        style={{ backgroundColor: mainColor }}
        position="topLeft"
        onPress={() => Actions.pop()}
      >
        <Icon name="arrow-round-back" />
      </Fab>
    </Modal>
  );
}
imageShow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  uri: PropTypes.string,
};
imageShow.defaultProps = {
  images: null,
  uri: null,
};
