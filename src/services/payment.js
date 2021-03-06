import { Linking } from 'react-native';
import { GET, headers, Payment, SAPI } from './type';

export const getPrice = async (type, token, delivery = 0, code = null, tokenapi = 'selfit.member') => {
  try {
    const results = await fetch(`${SAPI}${Payment}GetPrice?type=${type}&delivery=${delivery}&code=${code}&t.token=${token}&t.tokenapi=${tokenapi}`, {
      method: GET,
      headers,
    });
    const json = await results.json();
    console.log('Payment/GetPrice');
    console.log(json);
    return { totalPrice: json.Data, Msg: json.Message };
  } catch (e) {
    console.log(e);
    return -1;
  }
};
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
    return -1;
  }
};
export const getRequestPayment = async (type, token, delivery = 0, tokenapi = 'selfit.member') => {
  try {
    const response = await fetch(`${SAPI}${Payment}GetAddressRequest?type=${type}&delivery=${delivery}&t.token=${token}&t.tokenapi=${tokenapi}`);
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
  } catch (e) {
    console.log(e);
  }
};
