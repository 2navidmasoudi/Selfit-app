import { POST } from './type';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE3MzIsImlzcyI6Imh0dHA6XC9cL3NhbmRib3gtcGFuZWwuYWxvcGV5ay5jb21cL2dlbmVyYXRlLXRva2VuXC8xNzMyIiwiaWF0IjoxNTIzNDQ1MjY5LCJleHAiOjUxMjM0NDg4NjksIm5iZiI6MTUyMzQ0NTI2OSwianRpIjoiNDkwNzEyOGU4Mzg4Yjc1ODA5MjcyNmExNGI5NzRkZTUifQ.Z6L1adIcCVQBY6Rq4y3Q_tm5ctsjTwFTlnq5iPm-f3I';

export const sendPrice = async (srcLat, srcLong, destLat, destLong) => {
  try {
    const response = await fetch('https://sandbox-api.alopeyk.com/api/v2/orders/price/calc', {
      method: POST,
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        city: 'tehran',
        transport_type: 'motor_taxi',
        addresses: [
          {
            city: 'tehran',
            type: 'origin',
            lat: srcLat,
            lng: srcLong,
          },
          {
            city: 'tehran',
            type: 'destination',
            lat: destLat,
            lng: destLong,
          },
        ],
        has_return: false,
        cashed: false
      })
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

// const data = JSON.stringify({
//   city: 'tehran',
//   transport_type: 'motor_taxi',
//   addresses: [
//     {
//       city: 'tehran',
//       type: 'origin',
//       lat: srcLat,
//       lng: srcLong,
//     },
//     {
//       city: 'tehran',
//       type: 'destination',
//       lat: destLat,
//       lng: destLong,
//     },
//   ],
//   has_return: false,
//   cashed: false
// });
//
// const xhr = new XMLHttpRequest();
//
// xhr.addEventListener('readystatechange', function () {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//     const JsonResponse = JSON.parse(this.responseText);
//     console.log(JsonResponse);
//     return JsonResponse.object.price;
//     // const json = this.responseText.json();
//     // return json;
//   }
// });
//
// xhr.open('POST', 'https://sandbox-api.alopeyk.com/api/v2/orders/price/calc');
// xhr.setRequestHeader('Authorization', `Bearer ${token}`);
// xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
// xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
//
// xhr.send(data);
