import { Platform, StyleSheet } from 'react-native';

const isIOS = Platform.OS === 'ios';

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
    fontFamily: isIOS ? 'IRANSansMobile-Light' : 'IRANSansMobile_Light'
  },
  bold: {
    fontFamily: isIOS ? 'IRANSansMobile-Bold' : 'IRANSansMobile_Bold'
  },
  medium: {
    fontFamily: isIOS ? 'IRANSansMobile-Medium' : 'IRANSansMobile_Medium'
  },
  ultraLight: {
    fontFamily: isIOS ? 'IRANSansMobile-UltraLight' : 'IRANSansMobile_UltraLight'
  }
});
