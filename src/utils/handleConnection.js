import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

export const handleRootConnection = (isConnected) => {
  if (!isConnected) {
    Alert.alert(
      'خطا',
      'لطفا اتصال خود را به اینترنت بررسی کنید.',
      [{ text: 'تلاش مجدد', onPress: () => Actions.reset('root') }],
      { cancelable: false }
    );
  }
};

export const handleNetworkCheck = (isConnected) => {
  if (!isConnected) {
    Actions.reset('networkCheck');
  } else {
    Actions.reset('splash');
  }
};
