import EstyleSheet from 'react-native-extended-stylesheet';

export const TabsStyle = EstyleSheet.create({
  activeTab: {
    backgroundColor: '$statusBarColor',
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
