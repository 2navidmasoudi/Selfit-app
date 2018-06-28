import EStyleSheet from 'react-native-extended-stylesheet';
import { errorColor } from '../variables/colors';

export const SignStyle = EStyleSheet.create({
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 100
  },
  SignBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerColor: {
    backgroundColor: '$headerColor',
  },
  loginBox: {
    backgroundColor: '$signBoxColor',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    padding: 5,
  },
  authBox: {
    flex: 1,
    padding: 20,
  },
  loginTitle: {
    fontFamily: '$IS',
    margin: 2,
    textAlign: 'center',
    fontSize: 18,
    color: '#FAFAFA',
    paddingBottom: 10,
    paddingTop: 10
  },
  authTitle: {
    fontFamily: '$IS',
    textAlign: 'center',
    fontSize: 18,
    color: '#FAFAFA',
    marginBottom: 5
  },
  inputGroup: {
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  labelText: {
    marginBottom: 10,
    color: '#5256c9',
  },
  labelRedText: {
    textAlign: 'center',
    marginVertical: 5,
    color: errorColor,
  },
  inputText: {
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 2,
  },
  authInput: {
    borderColor: 'rgba(0,0,0,0.4)',
    borderWidth: 2,
    borderRadius: 5,
  },
  signButtonImg: {
    width: 150,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signButtonStyle: {
    // flex:1,
    width: 150,
    height: 75,
  },
  LoginButtonText: {
    fontFamily: '$IS',
    textAlign: 'center',
    fontSize: 18,
    padding: 0,
    color: 'white',
    overflow: 'hidden'
  },
  authButtonText: {
    fontFamily: '$IS',
    textAlign: 'center',
    fontSize: 18,
    padding: 0,
    color: 'white',
    // marginBottom:10,
    // marginRight:5,
    // check for IOS
    overflow: 'hidden'
  },
  reAuth: {
    fontFamily: '$IS',
    textAlign: 'center',
    fontSize: 18,
    padding: 0,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 15,
    marginRight: 10,
  },
  formStyle: {
    margin: 0
  },
  item: {
    marginBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
  },
  itemLabelStyle: {
    margin: 5
  },
  submitButton: {

    backgroundColor: '#0F9D7A'
  },
  formInputText: {
    fontFamily: '$IS',
    fontSize: 14,
    marginRight: 5,
    marginLeft: 5
  },
  selectViewStyle: { flex: 1, flexDirection: 'row', margin: 10 },
  formSelectStyle: { flex: 3, flexDirection: 'column' },
  listSelectStyle: { justifyContent: 'flex-end' },
  submitButtonText: {
    fontFamily: '$IS',
    fontSize: 18,
    color: 'white',
    paddingTop: 20
  },
});
export const LightBoxStyle = EStyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '$signBoxColor',
    borderRadius: 10
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  closeIcon: {
    fontSize: 30,
    color: '#1B5E20'
  }
});
