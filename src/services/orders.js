import { GET, headers, Orders, PUT, Selfit } from './type';

export const getOrderBuffet = async (id, active, token, tokenapi, max, min, ssort) => {
  try {
    const response = await fetch(`${Selfit}${Orders}GetOrderBuffet/${id}?active=${active}&token=${token}&tokenapi=${tokenapi}&max=${max}&min=${min}&ssort=${ssort}`, {
      method: GET,
      headers
    });
    if (response.status === 204) return null;
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
export const putAcceptBuffet = async (memberid, factorid, active, token, tokenapi) => {
  const response = await fetch(`${Selfit}${Orders}PutAccept`, {
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
  return json;
};
