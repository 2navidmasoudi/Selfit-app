import { Platform, StyleSheet } from 'react-native';
import { errorColor, grayLight, white } from '../../../assets/variables/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: white,
    borderRadius: 7,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginVertical: 8
  },
  withIconContainer: {
    paddingRight: 47
  },
  error: {
    color: errorColor
  },
  iconContainer: {
    position: 'absolute',
    right: 8,
    // top: 6,
    height: 24,
    paddingLeft: 8,
    borderLeftColor: grayLight,
    // borderLeftWidth: 1
  },
  inputContainer: {},
  input: {
    ...Platform.select({
      ios: {
        fontFamily: 'IRANSansMobile-Medium'
      },
      android: {
        fontFamily: 'IRANSansMobile',
        padding: 0
      }
    })
  }
});