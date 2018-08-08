import EstyleSheet from 'react-native-extended-stylesheet';
import { mainColor } from '../variables/colors';

export const TabsStyle = EstyleSheet.create({
  activeTab: {
    backgroundColor: mainColor,
  },
  notActiveTabs: {
    backgroundColor: '$headerColor',
  },
  underLine: {
    backgroundColor: '#FFF',
  },
  text: {
    color: '#FFF',
  },
  activeText: {
    color: '#FFF',
  }
});
