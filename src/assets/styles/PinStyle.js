import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  size: {
    ...Platform.select({
      ios: {
        width: 20,
        height: 25,
      },
      android: {
        width: 30,
        height: 35,
      }
    })
  },
});
