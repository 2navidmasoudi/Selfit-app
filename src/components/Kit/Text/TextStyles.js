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
    fontFamily: isIOS ? 'IRANSansMobile' : 'IRANSans'
  },
  light: {
    fontFamily: isIOS ? 'IRANSansMobile-Light' : 'IRANSansLight'
  },
  bold: {
    fontFamily: isIOS ? 'IRANSansMobile-Bold' : 'IRANSansBold'
  },
  medium: {
    fontFamily: isIOS ? 'IRANSansMobile-Medium' : 'IRANSansMedium'
  },
  ultraLight: {
    fontFamily: isIOS ? 'IRANSansMobile-UltraLight' : 'IRANSansLight'
  }
});
