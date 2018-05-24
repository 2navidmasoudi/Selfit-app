import React, { Component } from 'react';
import { Modal } from 'react-native';
import { Fab, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class ShowImage extends Component {
  state = {
    images: null
  };
  componentWillMount() {
    console.log('state', this.state, 'props', this.props);
  }
  render() {
    const images = this.props.images ? this.props.images : [{ url: this.props.uri }];
    return (
      <Modal
        animationType="slide"
        onRequestClose={() => Actions.pop()}
        visible
        transparent
      >
        <ImageViewer imageUrls={images} onSwipeDown={() => Actions.pop()} />
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="topLeft"
          onPress={() => Actions.pop()}
        >
          <Icon name="md-arrow-round-back" />
        </Fab>
      </Modal>
    );
  }
}

