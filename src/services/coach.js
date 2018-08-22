import { Coach, GET, headers, POST, SAPI, Selfit } from './type';

export const getAllCoach = async (sex, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Coach}GetAll?sex=${sex}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('Coach/GetAll');
  console.log(json);
  return json.Data.$values;
};
export const getSearchCoach = async (search, token, tokenapi, max, min, sort) => {
  const response = await fetch(`${SAPI}${Coach}GetSearchAll?search=${search}&t.token=${token}&t.tokenapi=${tokenapi}&p.max=${max}&p.min=${min}&p.sort=${sort}`, {
    method: GET,
    headers
  });
  const json = await response.json();
  console.log('Coach/GetSearchAll');
  console.log(json);
  return json.Data.$values;
};
export const postRateCoach = async (idcoach, numberrate, token, tokenapi) => {
  try {
    const response = await fetch(`${SAPI}${Coach}PostRate`, {
      method: POST,
      headers,
      body: JSON.stringify({
        idcoach,
        numberrate,
        token,
        tokenapi,
      })
    });
    const json = await response.json();
    console.log('Coach/PostRate');
    console.log(json);
    return json.ResponseCode;
  } catch (e) {
    console.log(e);
  }
};
