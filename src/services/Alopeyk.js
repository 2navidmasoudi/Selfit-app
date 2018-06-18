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
  }
};
