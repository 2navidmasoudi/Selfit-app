import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './TextStyles';

export default function PersianText({ children, style, type, rtl, ...rest }) {
  return (
    <Text style={[styles.defaultStyles, styles[type], style]} {...rest}>
      {rtl ? <Text style={styles.hiddenTrick}>ا</Text> : null}
      {children}
    </Text>
  );
}

PersianText.propTypes = {
  type: PropTypes.oneOf(['regular', 'light', 'bold', 'medium', 'ultraLight']),
  children: PropTypes.node,
  style: Text.propTypes.style,
  rtl: PropTypes.bool
};

PersianText.defaultProps = {
  type: 'regular',
  children: '',
  style: {},
  rtl: true
};
