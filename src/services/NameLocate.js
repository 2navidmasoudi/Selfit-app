// import Geocoder from 'react-native-geocoding';
// // Geocoder.setApiKey('AIzaSyBlgHjeMbqK3xEZfh6HK2o8RdjhhgTOh0s');
// export const nameLocate = async (lat,long,plaque,floor) => {
//     let json = await Geocoder.getFromLatLng(lat,long);
//     let addressDesc = await json.results[0].address_components[2].long_name + "، " +
//         json.results[0].address_components[1].long_name + "، "+
//         json.results[0].address_components[0].long_name
//         // + "، پلاک " + plaque + "، طبقه " + floor
//         ;
//     if (plaque) {
//         addressDesc+=await "، پلاک " + plaque;
//     }
//     if (floor) {
//         addressDesc+=await "، طبقه " + floor;
//     }
//     return addressDesc;
// }

// import Geocoder from 'react-native-geocoding';
import { GET, headers } from './type';
// Geocoder.setApiKey('AIzaSyBlgHjeMbqK3xEZfh6HK2o8RdjhhgTOh0s');
export const nameLocate = async (lat, long, plaque, floor) => {
  const results = await fetch(`https://api.cedarmaps.com/v1/geocode/cedarmaps.streets/${lat},${long}.json?access_token=1e275b422f430895ef3c8d609594cf06bca59037`, {
    method: GET,
    headers,
  });
  const json = await results.json();
  console.log(json);

  let addressDesc = `${json.result.city}، ${
    json.result.locality}، ${
    json.result.address}`
    // + "، پلاک " + plaque + "، طبقه " + floor
  ;
  if (plaque) {
    addressDesc += `، پلاک ${plaque}`;
  }
  if (floor) {
    addressDesc += `، طبقه ${floor}`;
  }
  return addressDesc;
};
