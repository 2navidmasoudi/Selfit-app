import { Linking, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GET, headers, Payment, Selfit } from './type';

const isIOS = Platform.OS === 'ios';
export const getPayment = async (type, token, delivery = 0, tokenapi = 'selfit.member') => {
  try {
    const results = await fetch(`${Selfit}${Payment}Get?type=${type}&delivery=${delivery}&token=${token}&tokenapi=${tokenapi}`, {
      method: GET,
      headers,
    });
    const json = await results.json();
    console.log('Payment/Get');
    console.log(json);
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const getRequestPayment = async (type, token, delivery = 0, tokenapi = 'selfit.member') => {
  try {
    fetch(`${Selfit}${Payment}GetRequest?type=${type}&delivery=${delivery}&token=${token}&tokenapi=${tokenapi}`, {
      method: GET,
      // headers,
      redirect: 'follow'
    }).then(response => response.url)
      .then(url => Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else if (isIOS) {
          return Actions.paymentWebView({ url });
        } else {
          Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err)));
  } catch (e) {
    console.log(e);
  }
};
