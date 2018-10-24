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
    // Actions.reset('networkCheck');
    // TODO: Bug in IOS
    Actions.reset('splash');
  } else {
    Actions.reset('splash');
  }
};
