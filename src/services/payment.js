import { Linking, Platform } from 'react-native';
import { GET, headers, Payment, SAPI } from './type';
import { Actions } from 'react-native-router-flux';

const isIOS = Platform.OS === 'ios';
export const getPayment = async (type, token, delivery = 0, tokenapi = 'selfit.member') => {
  try {
    const results = await fetch(`${SAPI}${Payment}Get?type=${type}&delivery=${delivery}&t.token=${token}&t.tokenapi=${tokenapi}`, {
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
    if (isIOS) {
      const url = await `${SAPI}${Payment}GetRequest?type=${type}&delivery=${delivery}&t.token=${token}&t.tokenapi=${tokenapi}`;
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          Linking.openURL(url);
        }
      });
    } else {
      const url = await fetch(`${SAPI}${Payment}GetRequest?type=${type}&delivery=${delivery}&t.token=${token}&t.tokenapi=${tokenapi}`, {
        method: GET,
        redirect: 'follow'
      }).then(response => response.url);
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          Linking.openURL(url);
        }
      });
    }

  } catch (e) {
    console.log(e);
  }
};
