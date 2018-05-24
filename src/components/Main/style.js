import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: -50,
    left: -50,
    bottom: -50,
    right: -50,
  },
  bgImg: {
    flex: 1,
  },
  animationView: {
    flex: 1,
    margin: 5
  },
  bgView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  animationTitle: {
    flex: 2,
    fontFamily: '$IS',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2
  },
  animationDetail: {
    flex: 5,
    fontFamily: '$IS',
    color: 'white',
    fontSize: 12,
    marginHorizontal: 5,
    textAlign: (Platform.OS === 'ios') ? 'justify' : 'center',
  },
  animationClick: {
    flex: 1,
    fontFamily: '$IS',
    justifyContent: 'flex-end',
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5
  }
});
export { styles };
