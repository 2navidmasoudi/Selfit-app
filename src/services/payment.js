import { Linking } from 'react-native';
import { GET, headers, Payment, SAPI } from './type';

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
    fetch(`${SAPI}${Payment}GetRequest?type=${type}&delivery=${delivery}&t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: GET,
      // headers,
      redirect: 'follow'
    }).then(response => response.url)
      .then(url => Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err)));
  } catch (e) {
    console.log(e);
  }
};
