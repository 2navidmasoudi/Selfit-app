import { GET, headers, Orders, PUT, SAPI } from './type';

export const getOrderBuffet = async (id, active, token, tokenapi, max, min, sort = null) => {
  try {
    const url = `${SAPI}${Orders}GetOrderBuffet/${id}?active=${active}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`;
    console.log('Orders/GetOrderBuffet');
    console.log(url);
    const response = await fetch(url, {
      method: GET,
      headers
    });
    const json = await response.json();
    console.log('Orders/GetOrderBuffet');
    console.log(json);
    return json.Data;
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
export const putFactorWallet = async (token, tokenapi, code = null) => {
  const response = await fetch(`${SAPI}${Orders}PutFactorWallet`, {
    method: PUT,
    headers,
    body: JSON.stringify({
      token,
      tokenapi,
      code
    })
  });
  const json = await response.json();
  console.log('Orders/PutFactorWallet');
  console.log(json);
  return json.ResponseCode;
};
export const putCheckout = async (factorid, token, tokenapi) => {
  const response = await fetch(`${SAPI}${Orders}PutCheckout`, {
    method: PUT,
    headers,
    body: JSON.stringify({
      factorid,
      token,
      tokenapi
    })
  });
  const json = await response.json();
  console.log('Orders/PutCheckout');
  console.log(json);
  return json.ResponseCode;
};
export const putCheckoutAll = async (token, tokenapi) => {
  const response = await fetch(`${SAPI}${Orders}PutCheckoutAll`, {
    method: PUT,
    headers,
    body: JSON.stringify({
      token,
      tokenapi
    })
  });
  const json = await response.json();
  console.log('Orders/PutCheckoutAll');
  console.log(json);
  return json.ResponseCode;
};
