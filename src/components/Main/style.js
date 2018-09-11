import EStyleSheet from 'react-native-extended-stylesheet';
import { darkColor } from '../../assets/variables/colors';

export const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: darkColor
  },
  background: {
    width: '100%',
    resizeMode: 'stretch'
  },
  animationView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  animationTitle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 25
  },
  animationDetail: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    marginHorizontal: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 30,
  },
});
