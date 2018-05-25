import React from 'react';
import { Modal } from 'react-native';
import { Fab, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';

export default ({ images, uri }) => {
  const image = images || [{ url: uri }];
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => Actions.pop()}
      visible
      transparent
    >
      <ImageViewer imageUrls={image} onSwipeDown={() => Actions.pop()} />
      <Fab
        style={{ backgroundColor: '#5067FF' }}
        position="topLeft"
        onPress={() => Actions.pop()}
      >
        <Icon name="arrow-round-back" />
      </Fab>
    </Modal>
  );
};

