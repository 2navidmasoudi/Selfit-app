import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const drawer = EStyleSheet.create({
  container: {
    flex: 1
  },
  imageHeader: {
    height: 180,
    width: '100%',
    justifyContent: 'flex-end'
  },
  info: { justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  infoText: { color: 'white' },
  item: {
    justifyContent: 'flex-end',
    padding: 10
  },
  itemTitle: {
    fontFamily: '$IS'
  },
  itemIcon: {
    marginLeft: 10
  }
});
export const main = EStyleSheet.create({
  pannelContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  pannelWrapper: { flex: 1, margin: 2 },
  pannelBtn: {
    borderRadius: 5,
    backgroundColor: '$statusBarColor',
  },
  pannelTextBtn: {
    fontFamily: '$IS',
    color: 'white',
  },

});
export const form = EStyleSheet.create({
  StyleForm: {
    padding: 20
  },
  item: {
    borderRadius: 5,
    marginBottom: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
  input: {
    fontFamily: '$IS',
    fontSize: 14
  },
  submitButton: {
    // borderRadius: 5,
    backgroundColor: '$statusBarColor',
  },
  submitText: {
    fontSize: 16,
  },
  error: {
    fontFamily: '$IS',
    fontSize: 12,
    color: '#ed2f2f',
    marginBottom: 10
  }
});

export const header = EStyleSheet.create({
  headerColor: {
    backgroundColor: '$headerColor',
    width: window.width
  },
  statusBarColor: '$statusBarColor',
  headerTextStyle: {
    color: 'white',
    fontSize: 18,
    fontFamily: '$IS',
    paddingRight: 4
  },
  bodySubtitle: {
    color: '#FFF',
  },
  iconStyle: {
    color: '#FFF'
  },
  bodyTitle: {
    color: 'white',
    fontSize: 18,
  },
  titleStyle: {
    fontSize: 16,
    fontFamily: '$IS',
    marginBottom: 3,
  }

});

export const Grid = EStyleSheet.create({
  VerticalStyle: {
    flex: 1,
  },
  HorizentalStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  MainViewContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderWidth: 2,
    borderRadius: 7,
    backgroundColor: '#5cb85c'
  },
  ImageStyle: {
    borderRadius: 5,
    opacity: 0.6,
  },
  IconView: {
    flex: 1, justifyContent: 'flex-end'
  },
  IconStyle: { textAlign: 'center', color: 'white' },
  TextView: { flex: 1, justifyContent: 'flex-start' },
  TextStyle: { color: 'white', fontSize: 16, fontFamily: '$IS' },
});

export const index = EStyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e'
  },
  splashText: {
    color: 'white',
    fontSize: 18,
    fontFamily: '$IS'
  }
});

export const EditProfileStyle = EStyleSheet.create({
  imageStyle: { width: 150, height: 150, borderRadius: 10 },
  textStyle: { fontFamily: '$IS' },
  uploadView: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  uploadViewButton: { flexDirection: 'row', marginTop: 10, marginBottom: 10 },
  uploadButton: { marginRight: 10 },
  btnText: { fontFamily: '$IS', paddingRight: 10, paddingLeft: 10, paddingTop: 5 },
  formInputText: {
    fontFamily: '$IS',
    fontSize: 14,
    marginRight: 5,
    marginLeft: 5
  },
  selectViewStyle: { flex: 1, flexDirection: 'row', marginBottom: 10 },

});

export default styles = {
  index
};
