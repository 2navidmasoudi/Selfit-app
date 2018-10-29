import { Linking } from 'react-native';
import { SAPI, Wallet } from './type';

export default async (price, token, tokenapi = 'selfit.member') => {
  try {
    const response = await fetch(`${SAPI}${Wallet}GetAddressRequest?price=${price}&t.token=${token}&t.tokenapi=${tokenapi}`);
    const json = await response.json();
    console.log('Payment/GetAddressRequest');
    console.log(json);
    const url = await json.Data;
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      } else {
        Linking.openURL(url);
      }
    });
    return 1;
  } catch (e) {
    console.log(e);
    return 0;
  }
};
