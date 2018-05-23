import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './TextStyles';

const PersianText = ({ children, style, type, rtl, ...rest }) => (
  <Text style={[styles.defaultStyles, styles[type], style]} {...rest}>
    {rtl ? <Text style={styles.hiddenTrick}>ا</Text> : null}
    {children}
  </Text>
);

PersianText.propTypes = {
  type: PropTypes.oneOf(['regular', 'light', 'bold', 'medium', 'ultraLight']),
  children: PropTypes.node.isRequired,
  style: Text.propTypes.style,
  rtl: PropTypes.bool
};

PersianText.defaultProps = {
  type: 'regular',
  style: {},
  rtl: true
};

export default PersianText;
