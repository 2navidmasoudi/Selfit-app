import { StyleSheet } from 'react-native';
import { darkColor, mainColor, white } from '../../../assets/variables/colors';

export default StyleSheet.create({
  button: {
    backgroundColor: mainColor,
    padding: 12,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalContent: {
    backgroundColor: white,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: darkColor
  },
});
