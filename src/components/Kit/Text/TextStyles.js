import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  defaultStyles: {
    ...Platform.select({
      ios: {
        textAlign: 'right'
      }
    })
  },
  hiddenTrick: {
    color: 'transparent',
    fontSize: 0
  },
  regular: {
    fontFamily: 'IRANSansMobile'
  },
  light: {
    fontFamily: 'IRANSansMobile_Light'
  },
  bold: {
    fontFamily: 'IRANSansMobile_Bold'
  },
  medium: {
    fontFamily: 'IRANSansMobile_Medium'
  },
  ultraLight: {
    fontFamily: 'IRANSansMobile_UltraLight'
  }
});
