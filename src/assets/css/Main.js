import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',

  },
  LogoStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 200,
    marginLeft: 50,
    marginRight: 50,
    resizeMode: 'cover',
    // tintColor:'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  appinfo: {
    textAlign: 'right',
    fontSize: 50
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  imageStyle: {
    width: '100%',
    height: 140,
    backgroundColor: '#F5FCFF'
  },
  fitnessGirl: {
    width: '100%',
    height: 140
  },
  normalText: {
    fontSize: 20
  }
});
export default styles;
