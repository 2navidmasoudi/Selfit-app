import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  animationView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: 5,
    justifyContent: 'center'
  },
  animationTitle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  animationDetail: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    marginHorizontal: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
});
export { styles };
