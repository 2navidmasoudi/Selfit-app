import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import ModalStyle from './ModalStyle';
import { darkColor, white } from '../../../assets/variables/colors';
import { Text } from '../../Kit';

export default function SelfitModal(props) {
  const {
    children,
    isVisible,
    onModalHide,
    exitText,
    onExit,
    backdropColor,
    backdropOpacity,
    animationIn,
    animationOut,
    animationInTiming,
    animationOutTiming,
    backdropTransitionInTiming,
    backdropTransitionOutTiming,
    hideModalContentWhileAnimating,
    style,
  } = props;
  return (
    <Modal
      isVisible={isVisible}
      onModalHide={onModalHide}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      animationIn={animationIn}
      animationOut={animationOut}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      backdropTransitionInTiming={backdropTransitionInTiming}
      backdropTransitionOutTiming={backdropTransitionOutTiming}
      hideModalContentWhileAnimating={hideModalContentWhileAnimating}
      style={style}
    >
      <View style={ModalStyle.modalContent}>
        {children}
        <TouchableOpacity onPress={onExit}>
          <View style={ModalStyle.button}>
            <Text style={{ color: white }}>{exitText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
SelfitModal.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onModalHide: PropTypes.func.isRequired,
  exitText: PropTypes.string.isRequired,
  onExit: PropTypes.func.isRequired,
  backdropColor: PropTypes.node,
  backdropOpacity: PropTypes.number,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  animationInTiming: PropTypes.number,
  animationOutTiming: PropTypes.number,
  backdropTransitionInTiming: PropTypes.number,
  backdropTransitionOutTiming: PropTypes.number,
  hideModalContentWhileAnimating: PropTypes.bool,
};
SelfitModal.defaultProps = {
  backdropColor: darkColor,
  backdropOpacity: 0.7,
  animationIn: 'zoomInDown',
  animationOut: 'zoomOutUp',
  animationInTiming: 1000,
  animationOutTiming: 1000,
  backdropTransitionInTiming: 1000,
  backdropTransitionOutTiming: 1000,
  hideModalContentWhileAnimating: true,
  style: {}
};
