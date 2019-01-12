import { POST } from './type';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NzQwMDczMywic3ViIjo3NDAwNzMzLCJpc3MiOiJodHRwczovL2FwaS1jcGFuZWwuYWxvcGV5ay5jb20vY3BhbmVsL2N1c3RvbWVycy83NDAwNzMzL2dlbmVyYXRlX2p3dF90b2tlbiIsImlhdCI6MTUyOTIxNjA5OCwiZXhwIjo1MTI5MjE5Njk4LCJuYmYiOjE1MjkyMTYwOTgsImp0aSI6Imo3bmVJMkM2ZEdvUHpUSjcifQ.Odc4ltiXCVAVDkDTSmm7VyM_Dp_S1agVK6y6WzYOefw';

export const sendPrice = async (srcLat, srcLong, destLat, destLong) => {
  try {
    const response = await fetch('https://api.alopeyk.com/api/v2/orders/price/calc', {
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
    return 0;
  }
};

export const getPeyk = async (data) => {
  try {
    const response = await fetch('https://api.alopeyk.com/api/v2/orders', {
      method: POST,
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        city: 'tehran',
        transport_type: 'motorbike',
        addresses: [
          {
            city: 'tehran',
            type: 'origin',
            lat: data.buffet.lat,
            lng: data.buffet.long,
            address: data.buffet.address,
            description: 'دريافت بسته غذايي از بوفه',
            unit: data.buffet.unit.toString(),
            number: data.buffet.floor.toString(),
            person_fullname: data.buffet.name,
            person_phone: data.buffet.phone
          },
          {
            city: 'tehran',
            type: 'destination',
            lat: data.person.lat,
            lng: data.person.long,
            address: data.person.address,
            description: 'تحويل بسته غذايي به مشتري',
            unit: data.person.unit.toString(),
            number: data.person.floor.toString(),
            person_fullname: data.person.name,
            person_phone: data.person.phone
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
    return 0;
  }
};
