import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  markerImage: { width: 50, height: 50, resizeMode: 'contain' },
  btnMap: { flex: 1, justifyContent: 'flex-end' },
  viewImage: {
    position: 'absolute',
    top: 0,
    bottom: 45,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  titleAddress: { textAlign: 'right', marginBottom: 10, fontFamily: '$IS' },
  itemAddress: { margin: 10, marginTop: 20 },
  labelAddress: { textAlign: 'right', paddingTop: 5 },
  btnAddressText: { fontFamily: '$IS', color: '#FFF' },
  btnAddress: { flexDirection: 'column', justifyContent: 'flex-end' },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
