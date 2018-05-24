import { GET, headers, Payment, Selfit } from './type';
import { Linking } from 'react-native';

export const getPayment = async (type, token, tokenapi) => {
  try {
    const results = await fetch(`${Selfit}${Payment}Get?type=${type}&token=${token}&tokenapi=${tokenapi}`, {
      method: GET,
      headers,
    });
    const json = await results.json();
    console.log('Get Payment:', json);
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const getRequestPayment = async (type, token, tokenapi = 'selfit.member') => {
  try {
    fetch(`${Selfit}${Payment}GetRequest?type=${type}&token=${token}&tokenapi=${tokenapi}`, {
      method: GET,
      // headers,
      redirect: 'follow'
    }).then(response => response.url)
      .then(url => Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err)));
  } catch (e) {
    console.log(e);
  }
};
