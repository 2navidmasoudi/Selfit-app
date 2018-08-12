import {GET, headers, Orders, PUT, SAPI, Selfit} from './type';

export const getOrderBuffet = async (id, active, token, tokenapi, max, min, sort = null) => {
  try {
    const response = await fetch(`${SAPI}${Orders}GetOrderBuffet/${id}?active=${active}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Orders/GetOrderBuffet');
    console.log(json);
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const putAcceptBuffet = async (memberid, factorid, active, token, tokenapi) => {
  const response = await fetch(`${SAPI}${Orders}PutAccept`, {
    method: PUT,
    headers,
    body: JSON.stringify({
      memberid,
      factorid,
      active,
      token,
      tokenapi
    })
  });
  const json = await response.json();
  console.log('Orders/PutAccept');
  console.log(json);
  return json.ResponseCode;
};
